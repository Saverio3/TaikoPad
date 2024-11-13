


const mongoose = require("mongoose");

const LaunchpadSaleSchema = mongoose.Schema(
  {
    amount: { type: Number },
    presaleId: { type: String },
    service: { type: String },//0-launchpad,1-fairlaunch
    owner_address: { type: String, required: true }, 
    hash: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("LaunchpadSale", LaunchpadSaleSchema);