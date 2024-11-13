const launchpadSale = require("../model/launchpadSale");


/**
 * This method create records
 *
 * @param req
 * @param res
 */
exports.add = function (req, res) {
 
  var params = req.body;
  var sale = new launchpadSale(params);

  sale.save().then(function (data) {
    if (data) {
      res.status(200).json({ sale });
    } else {
      res.status(404).json({ data: "Data Not found" });
    }
  });
};
