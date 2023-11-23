const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");

/**
 * Get all search types
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getAllSearchTypes(req, res) {
  const SearchType = ModelsService.Models.SearchType;
  try {
    const filterQuery = {};

    const response = await SearchType.findMany(
      filterQuery,
      {
        ...req.query,
        sort: { order: 1 }
      }
    );
    let searchTypes = response.map((internalcollection) =>
      internalcollection.toJSON()
    );

    return res.status(200).json({
      data: searchTypes
    });
  } catch (error) {
    console.log(error);
    LogService.ErrorLogger.error(error);
    ExceptionService.handle(error, res);
  }
}

/**
 * Get search type info
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getSearchTypeById(req, res) {
  const SearchType = ModelsService.Models.SearchType;
  const type_id = req.params.type_id;
  try {
    const filterQuery = {
      type_id: type_id
    };

    const response = await SearchType.findOne(filterQuery);
    console.log(response);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    LogService.ErrorLogger.error(error);
    ExceptionService.handle(error, res);
  }
}



module.exports = {
  getAllSearchTypes,
  getSearchTypeById
};