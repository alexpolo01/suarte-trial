const EndpointTests = require("./src/endpoint");
const UnitTests = require("./src/unit");

describe("Post", function () 
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