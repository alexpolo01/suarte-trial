const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");

/**
 * Get my referrals
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getReferrals(req, res)
{
    const User = ModelsService.Models.User;
    try
    {
        const options = {
            offset: req.query.offset ?? 0,
            limit: req.query.limit ?? 10,
            customLabels: {
                docs: "data"
            }
        };

        const referrals = await User.subModel.paginate({
            "user_referral": req.token_decoded.uid,
        }, options);

        referrals.data = referrals.data.map(referral =>
        {
            return {
                user_email: referral.user_email,
                createdAt: referral.createdAt,
            };
        });

        referrals.referral_income = 0;
        referrals.referral_code = req.token_decoded.uid;

        return res.status(200).json(referrals);
    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    getReferrals
};