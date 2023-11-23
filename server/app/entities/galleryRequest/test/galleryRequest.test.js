const EndpointTests = require("./src/endpoint");
const UnitTests = require("./src/unit");

describe("GalleryRequest", function () 
{

    for (let test in UnitTests) 
    {
        UnitTests[test]();
    }

    for (let test in EndpointTests) 
    {
        EndpointTests[test]();
    }

});