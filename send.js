const TronWeb = require('tronweb')

const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");
const privateKey = "3A8EFF28573C1059F509C5ABF60B5C72C08A11FE7610D7BC968D675033D7EDCD";
const tronWeb = new TronWeb(fullNode,solidityNode,eventServer,privateKey);

async function SendFund(_to) {
	
    const trc20ContractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";//contract address
    var address = "TWeqYPcKZ8YWaxN28NbziJbFPjYfninkBF";

    try {
        let contract = await tronWeb.contract().at(trc20ContractAddress);
        //Use send to execute a non-pure or modify smart contract method on a given smart contract that modify or change values on the blockchain.
        // These methods consume resources(bandwidth and energy) to perform as the changes need to be broadcasted out to the network.
      

	  let result =await contract.transfer(
            _to, //address _to
            1000000   //amount
        ).send({
            feeLimit: 1000000
        });
		
		
	  console.log('result: ', result);
		
        console.log('result: ', result);
		
		return result;
		
		
		
    } catch(error) {
        console.error("trigger smart contract error",error)
    }
}




	var _to="TWeqYPcKZ8YWaxN28NbziJbFPjYfninkBF";
	
SendFund(_to).then(() => {
        console.log("ok");
    })
    .catch((err) => {
        console.log("error:", err);
    });
