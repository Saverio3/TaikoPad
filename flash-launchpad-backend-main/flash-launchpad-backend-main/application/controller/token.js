const TokenModel = require("../model/token");

/**
 * This method create records
 *
 * @param req
 * @param res
 */
exports.add = function (req, res) {
 
  var params = req.body;
  var Token = new TokenModel(params);

  Token.save().then(function (data) {
    if (data) {
      res.status(200).json({ Token });
    } else {
      res.status(404).json({ data: "Data Not found" });
    }
  });
};
