var axios = require("axios")

exports.cryptoapi = async function (req, res) {
    const address=req.params.address
    console.log(address,"as");
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://rest.cryptoapis.io/blockchain-data/binance-smart-chain/testnet/addresses/${address}/contract?context=asdfg`,
            headers: {
                'X-API-Key': process.env.CRYPTOAPIS_KEY
            }
        };
        const response = await axios.request(config);
            res.json({status:true,data:response.data.data});
        
    } catch (error) {
     
        if(error.response.status == 404){
            res.status(500).json({status:false, data:  error.response ? error.response.data.error.message : 'Internal server error' });

        }
        else{

            res.status(500).json({ error:  'Internal server error' });
        }
    }
};
