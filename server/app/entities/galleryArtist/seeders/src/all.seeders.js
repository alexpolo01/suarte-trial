const GalleryArtistSeeders = {
    data : [
        {
            artist_name : "Pablo Gil",
            artist_email : "pablo@example.com",
            artist_nationality: "Spain",

        },
        {
            artist_name : "Javi Rizo",
            artist_nationality: "Spain",
            artist_email : "javi@example.com"
        },
        {
            artist_nationality: "Spain",
            artist_name : "Fran Landivar",
            artist_email : "fran@example.com"
        },
        {
            artist_nationality: "Spain",
            artist_name : "Marina Sanchez",
            artist_email : "marinech@example.com"
        }
    ]
};

if (process.env.NODE_ENV === "production") 
{
    GalleryArtistSeeders.data = [];
}

module.exports = GalleryArtistSeeders;