

const mongoose = require("mongoose");

const TokenSchema = mongoose.Schema(
  {
    tokenType: { type: String },
    tokenName: { type: String, required: true }, // presale token
    tokenSymbol: { type: String },
    tokenDecimals: { type: String },
    tokenSupply: { type: String },
    hash: { type: String },
    router: { type: String },
    marketingAddress: { type: String },
    transactionFeeToYield: { type: Number },
    transactionFeeToLiquidity: { type: Number },
    rewardToken: { type: String },
    marketingPercent: { type: Number },
    marketingWallet: { type: String },
    tokenRewardFee: { type: Number },
    autoAddLiquidity: { type: Number },
    marketingFee: { type: Number },
    minimumTokenBalance: { type: Number },
    liquidityFee: { type: Number },
    buyBackFee: { type: Number },
    reflectionFee: { type: Number },
    marketingFee: { type: Number },
  }
);

module.exports = mongoose.model("Token", TokenSchema);