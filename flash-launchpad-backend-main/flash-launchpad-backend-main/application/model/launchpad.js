


const mongoose = require("mongoose");

const LaunchpadSchema = mongoose.Schema(
  {
    tokenType: { type: String },
    tokenName: { type: String, required: true }, // presale token
    tokenSymbol: { type: String },
    tokenDecimals: { type: String },
    tokenSupply: { type: String },
    tokenAddress: { type: String },
    currency: { type: String },
    feeOptions: { type: String, required: true }, //0: 3.5% BNB raised only,2: 1.5$ BNB raised + 1.5% token sold
    listingOptions: { type: String, required: true },
    affiliateProgram: { type: String, required: true },
    presaleRate: { type: Number, required: true },
    whitelist: { type: String, required: true },
    softCap: { type: Number, required: true },
    hardCap: { type: Number, required: true },
    minimumBuy: { type: Number, required: true },
    maximumBuy: { type: Number, required: true },
    refundType: { type: String, required: true },
    router: { type: String, required: true },
    uniswapLiquidity: { type: Number, required: true },
    uniswapListingRate: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    liquidityLockDays: { type: Number, required: true },
    logoUrl: { type: String, required: true },
    websiteUrl: { type: String, required: true },
    facebookUrl: { type: String, required: true },
    twitterUrl: { type: String, required: true },
    githubUrl: { type: String, required: true },
    telegramUrl: { type: String, required: true },
    instagramUrl: { type: String, required: true },
    discordUrl: { type: String, required: true },
    redditUrl: { type: String, required: true },
    yutubeUrl: { type: String, required: true },
    description: { type: String },
    needTokenCnt: { type: Number },
    percent: { type: Number },
    chain: { type: Number }, //0-bscscan,1-etherum,2-opbnb
    service: { type: String, required: true }, // create launchpad, create token, flash audit ...
    owner_address: { type: String }, // presale token
    hash: { type: String },
  }
);

module.exports = mongoose.model("Launchpad", LaunchpadSchema);