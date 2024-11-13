// import Moralis from 'moralis';
import axios from 'axios';
import Moralis from 'moralis';
import getAddress from '@/app/wagmi/getAddress';
import validateAccount from '@/app/wagmi/validateAccount';

const options = {
  method: 'GET', // specify the HTTP method (GET, POST, etc.)
  headers: {
    'Content-Type': 'application/json',
    //'X-API-Key': '01cf1ec3aa5f80b7708c7a427c7ad87ae002c946'
    'X-API-Key': 'cfd7e02c8bf1156a5ad4ffbca315794895494a94'
  }
};

const restAPI = {
  fetchTokenDetailByAddress: async (address, messageApi) => {

    const responseData = { tokenType: '', tokenName: '', tokenSymbol: '', totalSupply: '', error: '' }
    validateAccount(messageApi);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/crypto-api/${address}`, options);
      if (!response.ok) {
        responseData.error = 'Your Token Address is not correct';
        // throw new Error('Network response was not ok');
        return responseData;
      }
      const result = await response.text();
      const parsed_data = JSON.parse(result)
      console.log(parsed_data, "parsed_data");
      const { tokenType, tokenName, tokenSymbol, totalSupply } = parsed_data.data.item;
      responseData.tokenName = tokenName;
      responseData.tokenType = tokenType;
      responseData.tokenSymbol = tokenSymbol;
      responseData.totalSupply = totalSupply;
      responseData.error = '';

      return responseData;

    } catch (error) {
      responseData.error = 'Your Token Address is not correct';
      console.error('Error:', error);
    }
  },

  fetchWalletTokenBalances: async (tokenAddress) => {
    const walletAddress = getAddress();
    try {
      const response = await Moralis.EvmApi.token.getWalletTokenBalances({ "chain": "0x61", 'address': walletAddress, 'tokenAddresses': [tokenAddress] });
      console.log(response.raw);
      return response.raw && response.raw[0];
    } catch (e) {
      console.error(e);
    }

    // try {
    //     // Assuming you have the transaction hash stored in a variable called transactionHash
    //     const transactionReceipt = await Moralis.Web3API.transactionReceipt({ transactionHash });

    //     // Extract the contract address from the transaction receipt
    //     const tokenAddress = transactionReceipt.contractAddress;

    //     console.log("Token address:", tokenAddress);
    //     // Handle or use the token address as needed
    // } catch (error) {
    //     console.error("Error retrieving token address:", error);
    //     // Handle error accordingly
    // }
  }

}

export default restAPI;

