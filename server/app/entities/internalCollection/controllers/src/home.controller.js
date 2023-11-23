const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");

async function getPreviewArtworksFromCollection(collection_id) 
{
    const InternalCollection = ModelsService.Models.InternalCollection;
    const CollectionArtwork = InternalCollection.CollectionArtwork;
    let pipeline = [];

    let collection = await InternalCollection.findOne({
        collection_id: collection_id
    });

    const options = {
        offset: 0,
        limit: 10,
        sort: {
            order: 1,
            createdAt: -1
        },
        customLabels: {
            docs: "data",
        }
    };

    const query = {
        collection_id: collection._id
    };

    if(collection_id === "masterpiece-of-the-day")
    {
        const date = new Date().getTime();
        query["metadata.day"] = {
            $lte: date
        };
        options.sort = {
            "metadata.day": -1
        };
    }
    
    if(query)
        pipeline.push({
            $match: query
        });
    pipeline.push({
        $lookup: {
            from: "artworks",
            localField: "artwork",
            foreignField: "_id",
            as: "artwork",
        },
    }, {
      $lookup: {
        from: "users",
        localField: "artwork.artwork_about.artwork_artist",
        foreignField: "_id",
        as: "artwork_about.artwork_artist",
      },
    }, {
      $lookup: {
        from: "users",
        localField: "artwork.artwork_about.artwork_gallery",
        foreignField: "_id",
        as: "artwork_about.artwork_gallery",
      },
    }, {
      $lookup: {
        from: "galleryartists",
        localField: "artwork.artwork_about.artwork_gallery_artist",
        foreignField: "_id",
        as: "artwork_about.artwork_gallery_artist",
      },
    }, {
        $addFields: {
            "order": { 
                $ifNull: [
                    "$order", Number.MAX_VALUE
                ]
            }
        },
    });

    const aggregatePipeline = CollectionArtwork.subModel.aggregate(pipeline);
    try{
        let response = await CollectionArtwork.subModel.aggregatePaginate(aggregatePipeline, options);
        collection = collection.toJSON();
        collection.collection_artworks = response.data.map(res => {
            const artwork_about = res.artwork_about;
            let temp = {
                ...res, 
                ...res.artwork[0],
            };
            delete temp.artwork;
            temp.artwork_about.artwork_artist = artwork_about.artwork_artist[0];
            temp.artwork_about.artwork_gallery = artwork_about.artwork_gallery[0];
            temp.artwork_about.artwork_gallery_artist = artwork_about.artwork_gallery_artist[0];
            return temp;
        });
        collection.total = response.totalDocs;
        return collection;
    } catch (err) {
        console.error(err);
    }
}

/**
 * Get home sliders
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getHome(req, res) 
{
    const is_mobile = req.params.is_mobile == "true";
    const InternalCollection = ModelsService.Models.InternalCollection;
    const sortQuery = is_mobile ? { order_mobile: 1, createdAt: 1 } : { order: 1, createdAt: 1 };
    try 
    {
        const response = await InternalCollection.findMany( {}, { sort: sortQuery } );
        let carousels = response.map((internalcollection) =>
            internalcollection.toJSON()
        );

        const collections = [];
        for(let i = 0; i < carousels.length; i ++) {
            collections.push(await getPreviewArtworksFromCollection(carousels[i].collection_id));
        }

        return res.status(200).json({
            collections
        });
    }
    catch (error) 
    {
        console.log(error);
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get internalcollection name by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getNameById(req, res) 
{
    const InternalCollection = ModelsService.Models.InternalCollection;
    const collection_id = req.params.internalcollection_id;
    try 
    {
        const response = await InternalCollection.findOne( {
            collection_id
        } );

        console.log(response);

        return res.status(200).json({
            name: response.collection_name
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    getHome,
    getNameById
};