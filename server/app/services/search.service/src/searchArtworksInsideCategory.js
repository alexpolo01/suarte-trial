async function searchArtworksInsideCategory(req, model, collection, query) {
  let pipeline = [];
  const searchQuery = req.query.q ?? "";

  if (searchQuery) {
    pipeline.push({
      $search: {
        index: "searchArtworks",
        compound: {
          should: [
            {
              text: {
                query: searchQuery,
                path: "artwork_about.artwork_title",
                fuzzy: {
                  maxEdits: 2,
                  prefixLength: 2,
                },
              },
            },
            {
              text: {
                query: searchQuery,
                path: "artwork_about.artwork_description",
                fuzzy: {
                  maxEdits: 2,
                  prefixLength: 2,
                },
              },
            },
          ],
        },
      },
    });
  }

  if (query) {
    pipeline.push({
      $match: query,
    });
  }
  
  const date = new Date().getTime();
  const matchQuery = {
    collection_artwork: {
      $ne: [],
    }
  };
  if(collection._id === "masterpiece-of-the-day")
    matchQuery["collection_artwork.metadata.day"] = {
      $lte: date
    };
  pipeline.push(
    {
      $lookup: {
        from: "collectionartworks",
        localField: "_id",
        foreignField: "artwork",
        as: "collection_artwork",
      },
    },
    {
      $addFields: {
        collection_artwork: {
          $filter: {
            input: "$collection_artwork",
            cond: {
              $eq: ["$$this.collection_id", collection._id],
            },
          },
        },
      },
    },
    { $match: matchQuery },
    {
      $lookup: {
        from: "users",
        localField: "artwork_about.artwork_artist",
        foreignField: "_id",
        as: "artwork_about.artwork_artist",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "artwork_about.artwork_gallery",
        foreignField: "_id",
        as: "artwork_about.artwork_gallery",
      },
    },
    {
      $lookup: {
        from: "galleryartists",
        localField: "artwork_about.artwork_gallery_artist",
        foreignField: "_id",
        as: "artwork_about.artwork_gallery_artist",
      },
    },
    {
      $unwind: {
        path: "$artwork_about.artwork_artist",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$artwork_about.artwork_gallery",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$artwork_about.artwork_gallery_artist",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        // Add user_type to artwork_about.artwork_gallery
        "artwork_about.artwork_gallery.user_type": {
          $toLower: "$artwork_about.artwork_gallery.__t",
        },
      },
    },
    {
      $addFields: {
        "collection_artwork.order": { 
          $cond: {
            if: { $or: [ { $eq: [ "$collection_artwork.order", null ] }, { $eq: [ { $size: "$collection_artwork.order" }, 0 ] } ] },
            then: Number.MAX_VALUE,
            else: "$collection_artwork.order"
          }
        }
      }
    }
  );

  const options = {
    offset: req.query.offset ?? 0,
    limit: req.query.limit ?? 10,
    customLabels: {
      docs: "data",
    },
    sort: {
      "collection_artwork.order": 1,
      "collection_artwork.createdAt": -1,
    }
  };

  if (collection.collection_id === "masterpiece-of-the-day") 
  {
      options.sort = { "collection_artwork.metadata.day": -1 };
  }
  let results;
  const aggregatePipeline = model.subModel.aggregate(pipeline);
  try {
    results = await model.subModel.aggregatePaginate(
      aggregatePipeline,
      options
    );
  } catch (e) {
    console.error(e);
  }
  results.q = searchQuery;
    return results;
  
}

module.exports = {
  searchArtworksInsideCategory,
};
