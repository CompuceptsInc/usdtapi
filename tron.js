const TronWeb = require('tronweb')

const bip39 = require('bip39')
var express = require('express');


  const https = require('https');
var HDKey = require("hdkey");



var app = express();
app.get('/info', (req, res) => {
	
info( ).then((result) => {
        console.log("ok");
		
		res.json(result);
		
		
    })
    .catch((err) => {
        console.log("error:", err);
		
		res.json(err);
		
		
    });

});




app.get('/generateBTCAccount/:child', (req, res) => {
	
  
    const mnemonic = "tiger august shove kind true spell shell size leisure lend seven catalog"; 

 
var child=req.params.child;
    
     let seed = bip39.mnemonicToSeedSync(mnemonic);
     
      var hdkey = HDKey.fromMasterSeed(seed)
    
   
var childkey = hdkey.derive("m/0/2147483647/"+child)
 
 
 

 var Wallet = new Object();
 
Wallet["child"] = child;
Wallet["privateExtendedKey"] = childkey.privateExtendedKey
Wallet["publicExtendedKey"] =childkey.publicExtendedKey 


 
res.send(Wallet);



    
    });

    


app.get('/generateAccount', (req, res) => {
	

console.log(TronWeb.utils.accounts.generateAccount());
 var acc=TronWeb.utils.accounts.generateAccount()
 
 
  res.json(acc.address.base58);


});


app.get('/sendnotification/:address', function(req, res){
	
	
var address=req.params.address;
	
	 console.log(address);

 

https.get('https://m21.exchange/sendnotification.php?address='+address, (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
	   
   res.json(JSON.parse(data).balances);
    
  });



   
});


});


app.get('/transactions/:address', function(req, res){
	
	
var address=req.params.address;
	
	 console.log(address);

 

https.get('https://apilist.tronscan.org/api/account?address='+address, (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
	   
   res.json(JSON.parse(data).balances);
    
  });



   
});


});




app.get('/balanceOf/:address/:trc20ContractAddress', function(req, res){
	
	
var address=req.params.address;
var trc20ContractAddress=req.params.trc20ContractAddress;
	
	

balanceOf(address,trc20ContractAddress).then((result) => {
        console.log("ok");
		
		res.json(result);
		
		
    })
    .catch((err) => {
        console.log("error:", err);
		
		res.json(err);
		
		
    });



   
});


app.get('/SendFund/:to/:amount', function(req, res){
	
	//var _to="TWeqYPcKZ8YWaxN28NbziJbFPjYfninkBF";
	
	
	var _to=req.params.to;
	var _amount=req.params.amount;
	
	
	
	
SendFund(_to,_amount).then(( result) => {
        console.log("ok");
		
			res.json(result);
			
			
    })
    .catch((err) => {
        console.log("error:", err);
			res.json(err);
    });
	
	
});

	


app.listen(3000);




const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");
const privateKey = "3A8F939C886B33154C1DCD7AFBF0BA5EDA17050656D0E5278A3619E93B56AFF4";



const tronWeb = new TronWeb(fullNode,solidityNode,eventServer,privateKey);

async function transactions(address) {
   
   
}

async function balanceOf(address,trc20ContractAddress) {
   // const trc20ContractAddress = "TNB6C4uGRbtJwhrrurXCMxbyLcTF6Mcm4y";//contract address
    //var address = "TWeqYPcKZ8YWaxN28NbziJbFPjYfninkBF";

    try {
        let contract = await tronWeb.contract().at(trc20ContractAddress);
        //Use call to execute a pure or view smart contract method.
        // These methods do not modify the blockchain, do not cost anything to execute and are also not broadcasted to the network.
        let result = await contract.balanceOf(address).call();
        console.log('result: ', result);
		
		
		return result;
		
		
    } catch(error) {
        console.error("trigger smart contract error",error)
    }
}

 
 async function SendFund(_to,_amount) {
	
    const trc20ContractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";//contract address
    var address = "TWeqYPcKZ8YWaxN28NbziJbFPjYfninkBF";

    try {
        let contract = await tronWeb.contract().at(trc20ContractAddress);
        //Use send to execute a non-pure or modify smart contract method on a given smart contract that modify or change values on the blockchain.
        // These methods consume resources(bandwidth and energy) to perform as the changes need to be broadcasted out to the network.
      

	  let result =await contract.transfer(
            _to, //address _to
            _amount   //amount
        ).send({
            feeLimit: 5000000
        });
		
	
	
		return result;
		
		
		
    } catch(error) {
        console.error("trigger smart contract error",error)
    }
}


async function info() {
       const trc20ContractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";

    try {
        let contract = await tronWeb.contract().at(trc20ContractAddress);
        //Use call to execute a pure or view smart contract method.
        // These methods do not modify the blockchain, do not cost anything to execute and are also not broadcasted to the network.
        let name = await contract.name().call();
		
		    let symbol = await contract.symbol().call();
			  let decimals = await contract.decimals().call();
			let totalSupply = await contract.totalSupply().call();
			
       return name+symbol+decimals+totalSupply;
	   
    } catch(error) {
        console.error("trigger smart contract error",error);
		
		return error;
    }
}



async function transaction() {
       const Address = "TNDFkUNA2TukukC1Moeqj61pAS53NFchGF";

    try {
        let transaction = await tronWeb.trx.getTransactionsToAddress(Address, 30, 0);;
       
       return transaction;
	   
    } catch(error) {
        console.error("trigger smart contract error",error);
		
		return error;
    }
}