const express = require('express');
const bodyParser = require('body-parser');


const Todo = require('./app/models/todo.model.js');
const Transaction = require('./app/models/transaction.model.js');
 
	 const TronWeb = require('tronweb');
	
	var Request = require("request");













 
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
// const fullNode = new HttpProvider("http://192.168.1.162:8090");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");
const privateKey = "3481E79956D4BD95F358AC96D151C976392FC4E3FC132F78A847906DE588C145";
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);


const CONTRACT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";

const ACCOUNT = "TEQH6py1Pi8YHNgi9cPMHCKLboBTUZrsYT";






// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

 app.get('/generateAccount', (req, res) => {
	

console.log(TronWeb.utils.accounts.generateAccount());
 
  res.json(TronWeb.utils.accounts.generateAccount());


});


app.get('/sendfund', (req, res) => {
	
     const {
        abi
    } = await tronWeb.trx.getContract(CONTRACT);
    // console.log(JSON.stringify(abi));

    const contract = tronWeb.contract(abi.entrys, CONTRACT);

    const balance = await contract.methods.balanceOf(ACCOUNT).call();
    console.log("balance:", balance.toString());
  
});




 app.get('/processNotification', (req, res) => {
	

asyncCall();

});











async function main() {
    const { abi } = await tronWeb.trx.getContract(CONTRACT);
    // console.log(JSON.stringify(abi));

    const contract = tronWeb.contract(abi.entrys, CONTRACT);

    const balance = await contract.methods.balanceOf(ACCOUNT).call();
    console.log("balance:", balance.toString());

   // const resp = await contract.methods.transfer(ACCOUNT, 786).send();
   // console.log("transfer:", resp);
}

main().then(() => {
        console.log("ok");
    })
    .catch((err) => {
        console.log("error:", err);
    });















function resolveAfter2Seconds() {
   console.log('calling');
}

async function asyncCall() {
  console.log('calling');
  const result = await resolveAfter2Seconds();
  console.log(result);
  // expected output: "resolved"
}




// define a simple route
app.get('/getaddress/:address', (req, res) => {
	
	

Request.get({
    "headers": { "content-type": "application/json" },
    "url": "https://api.trongrid.io/v1/accounts/"+req.params.address+"/transactions/trc20?limit=10&contract_address=TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
    "body": JSON.stringify({
        "firstname": "Nic",
        "lastname": "Raboy"
    })
}, (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    //console.dir(JSON.parse(body));
	
	const obj = JSON.parse(body);

console.log(obj.data);

obj.data.forEach(element => { 
 
 ////////////////////////////////////////	
 
Request.get("https://eapi.milionarios.trade/api/process_txn?txn="+element.transaction_id+"&value="+element.value+"&to="+element.to+"&from="+element.from+"", (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    console.dir(body );
});

 ////////////////////////////////////////
 
	
}); 

  res.json("Some error occurred while creating the Todo.");




});

 
    
});

//////////////////////


 
 

// listen for requests
app.listen(4000, () => {
	
	 
	
    console.log("Server is listening on port 4000");
});