/*
 * user module
 */

const Launchpad = require("../model/launchpad");

const token = require("../model/token");
var utils = require("./utils");

/**
 * This method read records
 *
 * @param req
 * @param res
 */
exports.read = async function (req, res) {
  var id = req.params.id;
  var tab = req.params.tab;
var address=req.body.address
  var chain = req.params.chain;
console.log(chain);
  var service;
  if (id == 0) {
    service = "create launchpad";
  } else {
    service = "create fairlaunch";
  }
  // var auth = await utils.auth(req, res);
  // if (auth) {
  //   launchpad.find({}).then(function (err, launchpad) {
  //     res.status(200).json({ launchpad });
  //   });
  // } else {
  //   res.status(403).json({ message: "Not allowed administrator" });
  // }
if(tab == "2"){

  Launchpad.find({service:service,chain:chain}).then(function (launchpad) {
    res.status(200).json({ data: launchpad });
  });
}
else{
  Launchpad.find({service,chain,owner_address:address}).then(function (launchpad) {
    res.status(200).json({ data: launchpad });
  });
}
};
exports.readOne = async function (req, res) {
  var id = req.params.id;
 

  Launchpad.find({_id:id}).then(function (launchpad) {
    res.status(200).json({ data: launchpad.length?launchpad[0]:{}});
  }).catch((err)=>{
    res.status(400).json({ data:"Data Nor found"});

  })
};

/**
 * This method create records
 *
 * @param req
 * @param res
 */
exports.add = function (req, res) {
  var params = req.body;
  var launchpad = new Launchpad(params);

  launchpad.save().then(function (data) {
    if (data) {
      res.status(200).json({ launchpad });
    } else {
      res.status(404).json({ data: "Data Not found" });
    }
  });
};

/**
 * This method update records
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  var params = req.body,
    id = params._id;

  //remove id from values to update
  delete params._id;

  Launchpad.update({ _id: id }, { $set: params }).then(function (
    err,
    launchpad
  ) {
    if (!err) {
      res.status(200).json({ launchpad });
    } else {
      res.status(403).json({ message: "Something went wrong" });
    }
  });
};
