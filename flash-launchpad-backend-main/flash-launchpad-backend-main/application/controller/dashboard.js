/*
 * user module
 */

const launchpad = require("../model/launchpad");
const launchpadSale = require("../model/launchpadSale");
const token = require("../model/token");
var utils = require("./utils");

exports.dashboard = async function (req, res) {
  try {

    const tokenCount = await token.find().count();
    const ProjectCount = await launchpad.find().count();
    const SaleCount = await launchpadSale.find().count();


    res
      .status(200)
      .json({ tokenCount: tokenCount, ProjectCount: ProjectCount,SaleCount:SaleCount });
  } catch (err) {
    res.status(400).json({ data: err.message });
  }
};
