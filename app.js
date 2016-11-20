var accounts;
var account;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function refreshBalance() {
  var meta = FiftyFifty.deployed();
  //console.log("Inside refresh balance" + meta.address);

  var senderBalance_element = document.getElementById("senderBalance");
  senderBalance_element.innerHTML = web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]), "ether");

  var contractBalance_element = document.getElementById("contractBalance");
  contractBalance.innerHTML =  web3.fromWei(web3.eth.getBalance(meta.address), "ether");

  var receiver1 = document.getElementById("receiver1").value;
  var receiver1Balance_element = document.getElementById("receiver1Balance");
  receiver1Balance_element.innerHTML =  web3.fromWei(web3.eth.getBalance(receiver1), "ether");

  var receiver2 = document.getElementById("receiver2").value;
  var receiver2Balance_element = document.getElementById("receiver2Balance");
  receiver2Balance_element.innerHTML =  web3.fromWei(web3.eth.getBalance(receiver2), "ether");

//  Required if we need to get the balance from the contract - not required at the moment
//  meta.getContractBalance.call().then(function(value) {
//     var balance_element = document.getElementById("contractBalance");
//     balance_element.innerHTML = value.valueOf();
//     console.log("refresh contract balance: " + value.valueOf());
//     //console.log("refresh contract balance web3" + web3.fromWei(eth.getBalance(meta.address), "ether");
//  }).catch(function(e) {
//    console.log(e);
//    setStatus("Error getting balance; see log.");
//  });
};


function sendEtherShare() {

  setStatus("Initiating transaction... (please wait)");
  var meta = FiftyFifty.deployed();

  // Set the variables
  var amount = parseInt(document.getElementById("amount").value);
  var receiver1 = document.getElementById("receiver1").value;
  var receiver2 = document.getElementById("receiver2").value;

  // Set the error log on the web page
  var errLog_element = document.getElementById("errLog");
  errLog_element.innerHTML = "";


  //console.log("Account" + web3.eth.accounts[0]);
  //console.log("Coinbase balance: " + web3.eth.getBalance(web3.eth.accounts[0]));
  //console.log("Contract balance: " + web3.eth.getBalance(meta.address));
  //console.log("Contract addr: " + meta.address);

  console.log("Before: Sender     balance (wei): " + web3.eth.getBalance(web3.eth.accounts[0]));
  console.log("Before: Contract   balance (wei): " + web3.eth.getBalance(meta.address));
  console.log("Before: Reciever 1 balance (wei): " + web3.eth.getBalance(receiver1));
  console.log("Before: Reciever 2 balance (wei): " + web3.eth.getBalance(receiver2));

  //Testing use only
  //receiver1 =web3.eth.accounts[1];
  //receiver1 =web3.eth.accounts[2];
  account = accounts[0];

  // Sending ether to contract
  //meta.splitProceeds.sendTransaction(web3.eth.accounts[2], web3.eth.accounts[1], amount, {from: account,  value: web3.toWei(2, "ether"), gas: 350000}).then(function() {
  meta.splitProceeds.sendTransaction(receiver1, receiver2, {from: account,  value: web3.toWei(amount, "ether"), gas: 350000}).then(function() {
     setStatus("Transaction complete!");
     refreshBalance();

  }).catch(function(e) {
    console.log(e);
    setStatus("Error splitting ETH; see below.");
    errLog_element.innerHTML = e;
  });
  //console.log("After Call " );
};


window.onload = function() {
   console.log("on window load");

   // Get the contract's address
   var meta = FiftyFifty.deployed();

   //Set the contract address to the web page
   var contractAddress_element = document.getElementById("contractAddress");
   contractAddress_element.innerHTML = meta.address;

   // Make sure we have access to the coinbase
   web3.eth.getAccounts(function(err, accs) {
   if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

   if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];

    //Set the Coinbase address to the web page
    var senderAddress_element = document.getElementById("senderAddress");
    senderAddress_element.innerHTML = accounts[0];

    // Refresh the balances on the web page
    refreshBalance();
  });
}
