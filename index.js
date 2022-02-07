const TronWeb = require('tronweb');
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
// const fullNode = new HttpProvider("http://192.168.1.162:8090");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");


var Request = require("request");





var express = require('express');
var app = express();

app.get('/', function(req, res){
	
	main().then(() => {
        console.log("ok");
		 res.send("ok");
		 
    })
    .catch((err) => {
        console.log("error:", err);
		 res.send(err);
    });
	
	 
});


app.get('/wallet', function(req, res){
	
	
Request.get({
    "headers": { "content-type": "application/json" },
    "url": "https://api.shasta.trongrid.io/wallet/generateaddress" 
}, (error, response, body) => {
    if(error) {
        res.json(error);
    }
//	console.log(response);
	console.log(body);
   res.json(body);
});

  
  
  	 
});



app.get('/wallet', function(req, res){
	
	
Request.get({
    "headers": { "content-type": "application/json" },
    "url": "https://api.shasta.trongrid.io/wallet/generateaddress",
    "body": JSON.stringify({
        "firstname": "Nic",
        "lastname": "Raboy"
    })
}, (error, response, body) => {
    if(error) {
        res.json(error);
    }
//	console.log(response);
	console.log(body);
   res.json(body);
});

  
  
  	 
});


  
  
  
app.get('/gettransactionsign', function(req, res){
	
	
	var raw="{\"transaction\":{\"raw_data\":\"{\\\"contract\\\":[{\\\"parameter\\\":{\\\"value\\\":{\\\"amount\\\":1000,\\\"owner_address\\\":\\\"41608f8da72479edc7dd921e4c30bb7e7cddbe722e\\\",\\\"to_address\\\":\\\"41e9d79cc47518930bc322d9bf7cddd260a0260a8d\\\"},\\\"type_url\\\":\\\"type.googleapis.com/protocol.TransferContract\\\"},\\\"type\\\":\\\"TransferContract\\\"}],\\\"ref_block_bytes\\\":\\\"5e4b\\\",\\\"ref_block_hash\\\":\\\"47c9dc89341b300d\\\",\\\"expiration\\\":1591089627000,\\\"timestamp\\\":1591089567635}\",\"raw_data_hex\":\"0a025e4b220847c9dc89341b300d40f8fed3a2a72e5a66080112620a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412310a1541608f8da72479edc7dd921e4c30bb7e7cddbe722e121541e9d79cc47518930bc322d9bf7cddd260a0260a8d18e8077093afd0a2a72e\"},\"privateKey\":\"your private key\"}";
	
	
Request.get({
    "headers": { "content-type": "application/json" },
    "url": "https://api.shasta.trongrid.io/wallet/gettransactionsign",
    "body":   raw 
}, (error, response, body) => {
    if(error) {
        res.json(error);
    }
 console.log(response.body);
	console.log(body);
   res.json(response.body);
});

  
  
  	 
});






app.listen(3000);




async function main() {



const privateKey = "3A8EFF28573C1059F509C5ABF60B5C72C08A11FE7610D7BC968D675033D7EDCD";
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);


const CONTRACT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";

const ACCOUNT = "TWeqYPcKZ8YWaxN28NbziJbFPjYfninkBF";



    const {
        abi
    } = await tronWeb.trx.getContract(CONTRACT);
    // console.log(JSON.stringify(abi));



    const contract = tronWeb.contract(abi.entrys, CONTRACT);

    const balance = await contract.methods.balanceOf(ACCOUNT).call();
    console.log("balance:", balance.toString());

 const resp = await contract.methods.transfer(ACCOUNT, 786).send();
    console.log("transfer:", resp);
	
	
	  // tronWeb.trx.getTransaction("0daa9f2507c4e79e39391ea165bb76ed018c4cd69d7da129edf9e95f0dae99e2").then(result => {console.log(result)});
	
	  // tronWeb.trx.getTransactionInfo("0daa9f2507c4e79e39391ea165bb76ed018c4cd69d7da129edf9e95f0dae99e2").then(result => {console.log(result)});
	
	
	tronWeb.trx.sendTransaction("TVDGpn4hCSzJ5nkHPLetk8KQBtwaTppnkr", 1000).then(result => {console.log(result)});



}


