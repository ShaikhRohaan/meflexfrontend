import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./wallet.css";
import Assets from "../assets/Assets";
import ListItem from "../listItem/ListItem";
import { Alchemy, Network } from "alchemy-sdk";
// import bigNumber from "big-number";
import Swal from "sweetalert2"; 
import withReactContent from 'sweetalert2-react-content'
import { utils } from "ethers";
import Logo from "../../sbglogo.png";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Row, Col, Container } from "react-bootstrap";
// var BigNumber = require('big-number');
import { useNavigate } from "react-router-dom";
import PrivacyPolicy from "../PrivacyPolicy/PrivacyPolicy";
import WalletLogo from "../../blue-wallet.png";

const Web3 = require("web3");
const web3 = new Web3(
  "https://eth-goerli.g.alchemy.com/v2/d3XAlD6RgOfYQmBcWd59GVxLYki-b9bQ"
);

const Wallet = (props) => {

  const [atsList, setatsList] = useState([]);
  const navigateTo = useNavigate();

  // const [tockenData, settockenData] = useState([]);
  const [liData, setLiData] = useState([]);
  const dataFetchedRef = useRef(false);
  var [ethValue, setEthValue] = useState("");
  var accountName = localStorage.getItem("accName")
  const [tocknadrs, settocknadrs] = useState('');
  var amounttotal = ethValue.substr(0, 5);
  var ide = localStorage.getItem("wallet_adrs");
  var adrs = localStorage.getItem("wallet_adrs");
  var importToken = localStorage.getItem("importacc")
  var address = adrs;
  var a = adrs.substr(0, 10);
  // var users = JSON.parse(localStorage.getItem("networks") || "[]");
  // setLiData(JSON.stringify(users))
  var addressarray = [];
  var createAccount = localStorage.getItem("CreateAccount");
  var createAccountKey = localStorage.getItem("CreateAccountKey");
  // console.log("account key    " + createAccountKey);
  var TokensData = JSON.parse(localStorage.getItem("Tokens"));
  var tkndata = JSON.stringify(TokensData)
  // console.log(typeof(tkndata));
  var accountsData = JSON.parse(localStorage.getItem("multiAccount"));
  ////////////////////////////////////////
try{
  var networkOftokens = JSON.parse(localStorage.getItem("networks"));
  var arrayOftokens = JSON.parse(localStorage.getItem("OldTokens"));
  // var nt = networkOftokens.rpc = networkOftokens.API_URL;
  // delete networkOftokens[0].rpc;
  var swapArrayToken = networkOftokens.concat(arrayOftokens);
  // console.log(swapArrayToken);
}catch(err){
  console.log(err);
}
  const [Turi, setTuri] = useState("https://bsc-dataseed.binance.org/");
  const [Taddress, setTaddress] = useState("");
  const [Tbls, setTbls] = useState("");
  var tokenB = Tbls.substr(0, 4);
  const [tcnValue, setTcnValue] = useState('MMIT');

  const [Turi1, setTuri1] = useState("");
  const [Taddress1, setTaddress1] = useState("");
  const [Tbls1, setTbls1] = useState("");
  var tokenB1 = Tbls1.substr(0, 4);
  const [tcnValue1, setTcnValue1] = useState('BNB');
  

  
async function rechack(TokensDatas){

  var array = await JSON.parse(localStorage.getItem("Tokens"));
  
  var API_URL = TokensDatas.API_URL;
  const tokenAddress = TokensDatas.tokenAddress;
  const accountAddress = localStorage.getItem('wallet_adrs');

  // https://sbgwallet.io:8081 https://sbgwallet.io:8081
  await fetch("https://sbgwallet.io:8081/imptoken?rpc="+API_URL+"&wallet="+accountAddress+"&token="+tokenAddress)
  .then((res) => res.json())
  .then(async (data) => { 
  const tdata = {balance : data.balance , tokenAddress : data.token_address , accountAddress : data.wallet_address , symbol : data.symbol , API_URL : data.rpc};

    addressarray.push(tdata);


  })
  // await localStorage.removeItem("Tokens");
  await localStorage.setItem("Tokens", JSON.stringify(addressarray))
 
}


  if (createAccount !== "" || createAccountKey !== "") {
  } else {
    // console.log("koi extra account nahi hy");
  }

  const getAts = async () => {
    // console.log("getAts started");
    const config = {
      apiKey:
        "https://eth-goerli.g.alchemy.com/v2/d3XAlD6RgOfYQmBcWd59GVxLYki-b9bQ",
      network: Network.ETH_GOERLI,
    };
    const alchemy = new Alchemy(config);
    //Feel free to switch this wallet address with another address
    const ownerAddress = "0xC9ea92cB3E7636417cD062A7e449cB69045Ab07C";
    //The below token contract address corresponds to USDT
    const tokenContractAddresses = [
      "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    ];
    const data = await alchemy.core.getTokenBalances(
      ownerAddress,
      tokenContractAddresses
    );
    // console.log("Token balance for Address");
    // console.log("Alchamy addd ass " + data);
  };

  //var key = "";
  const location = useLocation();
  const getTheAddressData = async () => {
    var key = location.state;
    // console.log("Current Input key  " + key);

    if (key !== "" || key == undefined || key == null) {
      importAccount(key);
    } else {
      // console.log("OK");
    }
  };

  if (ide == "" || ide == null || ide == undefined) {
    window.location.replace("/new");
  } else {
    // console.log("wallet start");
  }
  ///////import////////

  async function importAccount(key) {
    var accountValue = await localStorage.getItem("accountAddress");
    var acc = web3.eth.accounts.wallet.add(key);
    // console.log(web3.eth.accounts.wallet.add(acc));
    var a = web3.eth.accounts.wallet.add(acc);
    // console.log(a.address);
    await localStorage.setItem("wallet_adrs", a.address);
    var result = accountValue.split(",");
    // console.log("Original result " + result);
    // localStorage.removeItem("accountAddress")
  }


  ///////impkey////
  function imp_account() {

    let timerInterval  
    Swal.fire({  
      title: 'Save Your Privatekey!',  
      html: 'before you Import another account <b></b> Must save first account privatekey.',  
      timer: 7000,  
      timerProgressBar: true,  
      onBeforeOpen: () => {  
        Swal.showLoading()  
        timerInterval = setInterval(() => {  
          const content = Swal.getContent()  
          if (content) {  
            const b = content.querySelector('b')  
            if (b) {  
              b.textContent = Swal.getTimerLeft()  
            }  
          }  
        }, 100)  
      },  
      onClose: () => {  
        clearInterval(timerInterval)  
      }  
    }).then((result) => {  
      if (result.dismiss === Swal.DismissReason.timer) {  
        window.location.replace("/impKey"); 
      }  
    })  
      
  
    
    
  }



  function HandlePrivacyPolicy(e){
    e.preventDefault();
   navigateTo('/privacyPolicy');

  }
  function help() {
    window.location.replace("/help");
  }
  function settinge() {
    window.location.replace("/settings");
  }
  function create_account() {
    let timerInterval  
    Swal.fire({  
      title: 'Save Your Privatekey!',  
      html: 'before you Create another account <b></b> Must save first account privatekey.',  
      timer: 7000,  
      timerProgressBar: true,  
      onBeforeOpen: () => {  
        Swal.showLoading()  
        timerInterval = setInterval(() => {  
          const content = Swal.getContent()  
          if (content) {  
            const b = content.querySelector('b')  
            if (b) {  
              b.textContent = Swal.getTimerLeft()  
            }  
          }  
        }, 100)  
      },  
      onClose: () => {  
        clearInterval(timerInterval)  
      }  
    }).then((result) => {  
      if (result.dismiss === Swal.DismissReason.timer) {  
        window.location.replace("/createaccount");
      }  
    })  
    
  }

  /////////getbalance////////////////////////////////
  const get = async (value) => {
    const web3 = new Web3(value);
    const addressWallet = adrs; // Replace with the address of the account you want to check
    // const tokenContractAddress = "0x30F35fc844a016D1c785Cc45537752850fC7cdc7"; // Replace with the address of the token contract
    const balance = await web3.eth.getBalance(addressWallet);
    // const balance = "await web3.eth.getBalance(address, tokenContractAddress);";
    var wallet = web3.utils.toWei(balance, "ether");
    var weiValue = Number(wallet / 10 ** 18);
    var etherValue = Web3.utils.fromWei(weiValue.toString(), "ether");
    // console.log("weiValue", weiValue);
    return etherValue;
  };


 
  let assets = JSON.parse(localStorage.getItem("assetsArray"));

  if (assets == '' || assets.length == 0 || assets == null || assets == undefined || assets == []) { 
    let arrayEth = [
      // {
      //   network: "BNB Testnet",
      //   rpc: "https://data-seed-prebsc-1-s1.binance.org:8545",
      //   chain:"97",
      //   symbol:'BNB'
      // },
      // {
      //   network: "Goerli test network",
      //   rpc: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      //   chain:"5",
      //   symbol:'Goerli'
      // },
      {
        network: "Ethereum Mainnet",
        rpc: "https://eth.llamarpc.com",
        chain:"1",
        symbol:'ETH'
      },
      {
        network: "BNB Smart Chain",
        rpc: "https://bsc-dataseed.binance.org/",
        chain:"56",
        symbol:'BNB',
        tokenAddress:'0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
      },
      // {
      //   network: "SBG Special Network Powered by Flashbots", 
      //   rpc: "https://rpc.flashbots.net",
      //   chain:"1",
      //   symbol:'ETH'
      // },
      {
        network: "Avalanche",
        rpc: "https://api.avax.network/ext/bc/C/rpc",
        chain:"43114",
        symbol:'AVAX'
      },
      {
        network: "Polygon",
        rpc: "https://polygon-rpc.com",
        chain:"137",
        symbol:'MATIC'
      },
      // {
      //   network: "Flashbots RPC",
      //   rpc: "https://rpc.flashbots.net",
      //   chain:"1",
      //   symbol:'ETH'
      // },
      // {
      //   network: "Ethereum Mainnet",
      //   rpc: "https://eth.llamarpc.com",
      //   chain:"1",
      //   symbol:'ETH'
      // },
      // {
      //   network: "Fantom Opera",
      //   rpc: "https://rpc.ankr.com/fantom/",
      //   chain:"250",
      //   symbol:'FTM'
      // },
      // {
      //   network: "Arbitrum One",
      //   rpc: "https://arb1.arbitrum.io/rpc",
      //   chain:"42161",
      //   symbol:'ETH'
      // },
      // {
      //   network: "Aurora",
      //   rpc: "https://mainnet.aurora.dev",
      //   chain:"1313161554",
      //   symbol:'Aurora'
      // },
      // {
      //   network: "Optimism",
      //   rpc: "https://mainnet.optimism.io",
      //   chain:"10",
      //   symbol:'OP'
      // },
      // {
      //   network: "Huobi CEO",
      //   rpc: "https://http-mainnet.hecochain.com",
      //   chain:"128",
      //   symbol:'HT'
      // },
      // {
      //   network: "Celo (Mainnet)",
      //   rpc: "https://forno.celo.org",
      //   chain:"42220",
      //   symbol:'CELO'
      // },
      // {
      //   network: "Gnosis Chain formerly xDai",
      //   rpc: "https://rpc.gnosischain.com",
      //   chain:"100",
      //   symbol:'xDai'
      // },
      // {
      //   network: "KCC-MAINNET",
      //   rpc: "https://rpc-mainnet.kcc.network",
      //   chain:"321",
      //   symbol:'KCS'
      // },
      // {
      //   network: "Thundercore Mainnet",
      //   rpc: "https://mainnet-rpc.thundercore.com",
      //   chain:"108",
      //   symbol:"TT"
      // },
      // {
      //   network: "Callisto Network",
      //   rpc: "https://rpc.callisto.network​",
      //   chain:"820",
      //   symbol:'CLO'
      // },
      // {
      //   network: "Tomo Chiain",
      //   rpc: "https://rpc.tomochain.com",
      //   chain:"88",
      //   symbol:'TOMO'
      // },
      // {
      //   network: "Ethereum Classic",
      //   rpc: "https://etc.rivet.link",
      //   chain:"61",
      //   symbol:'ETC'
      // },
      // {
      //   network: "GoChain",
      //   rpc: "https://rpc.gochain.io",
      //   chain:"60",
      //   symbol:'GO'
      // },
      // {
      //   network: "POA Network",
      //   rpc: "https://core.poanetwork.dev",
      //   chain:"99",
      //   symbol:'POA'
      // },
    ];
    localStorage.setItem("assetsArray", JSON.stringify(arrayEth));
    localStorage.setItem("networks", JSON.stringify(arrayEth));
  }

  var urli = '';
  const getNetworkBalance = async (value) => {

    localStorage.setItem("rpcUri", value.rpc);
    localStorage.setItem("symbol", value.symbol);
    localStorage.setItem("btnvalue", value.network);
    if (value.network == null){
      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: 'Network Error!',
      });  
      }else{}
    console.log(value.rpc);
    var getUribls = await get(value.rpc);
    urli = value.rpc;
    document.getElementById("minn").innerHTML = value.symbol;
    document.getElementById("dropdownMenuButton1").innerHTML = value.network;
    setEthValue(getUribls);
    console.clear();
  };


  setInterval(async function() {
    var a = localStorage.getItem("rpcUri");
    var b = await get(a);
    var c = await localStorage.getItem("symbol");
    // console.log(c);
    var d = localStorage.getItem("btnvalue");
    document.getElementById("minn").innerHTML = c ;
    document.getElementById("dropdownMenuButton1").innerHTML = d;
    
    setEthValue(b);
   
  }, 2000);

  
  const getatsBls = async (value) => {
    // console.log(value);
    var getbls = await get(value.rpc);
    // console.log(value.network,getbls);
    
    let atsObj = {};
    atsObj["symbol"] = value.network;
    atsObj["balance"] = getbls;
    atsObj["accountAddress"] = address;
    atsObj["API_URL"] = value.rpc;


    atsList.push(atsObj);
    // console.log(atsList[0]);
  };
  const getNetworkats = async (assets) => {
    // console.log(adrs);
    let ntn = JSON.parse(localStorage.getItem("assetsArray") || "[]");
    // console.log(ntn);
    for (let i = 0; i < ntn.length; i++) {
      // console.log(ntn[i].rpc);
      getatsBls(ntn[i]);
    }
  };

  // };
  const send = async () => {
    let to = await document.getElementById("sendToaddress").value;
    let amountto = await document.getElementById("sendToammount").value;
    let pkeys = await localStorage.getItem("pkey");
    let from = await localStorage.getItem("wallet_adrs");
    let rpc = await localStorage.getItem("rpcUri");
    console.log(ethValue);
    console.log(amountto);
     if(amountto === 0  || amountto <= 0) {
      Swal.fire({  
        icon: 'error',  
        // title: 'Insufficient Funds...', 
      });  
     }else if (to.length < 42){
      Swal.fire({  
        icon: 'error',  
        title: 'Wrong Address...', 
      });
     }
    else if(amountto <= ethValue){
      await fetch("https://sbgwallet.io:8081/transfer?key="+pkeys+"&from="+from+"&to="+to+"&val="+amountto+"&rpc="+rpc)
      .then((res) => res.json())
      .then(async (data) => { 
        console.log(data);
        if(data.hash == 1){
          Swal.fire({  
            icon: 'error',  
            title: 'Something Wrong...', 
          });
        }else{
          Swal.fire({  
            position: 'top-end',  
            icon: 'success',  
            title: 'Transaction Successful', 
             text: data.hash,   
            showConfirmButton: false,  
            timer: 7500  
          })
        }
        // .then(
        //   window.location.replace("/wallet")
        // );  
      });
      }else{
        Swal.fire({  
      icon: 'error',  
      title: 'Insufficient Funds...', 
    });  
      }
    
  };

  function se(){
    send()
  }

  ////////////////////////////////////////////////////////////////

  const getNetwork = async (value) => {
    // console.log(value);
  };

  ///////////////////////////////////////////////////////

  // alert(addressto + " " + to);
  function addNetwork() {
    //localStorage.removeItem('networks')
    var users = JSON.parse(localStorage.getItem("networks") || "[]");
    // console.log("The length " + users.length);
    for (var i = 0; i < users.length; i++) {
      setLiData((liData) => [...liData, users[i]]);
    }
    var dataNet = props.getNetworks;
    if (dataNet === null || dataNet === " " || dataNet <= 0) {
      // cons`ole.log("No data")`
    } else {
      setLiData([]);

      users.forEach(function (user, index) {

      });
      var user = {
        network: dataNet[0],
        rpc: dataNet[1],
        chain: dataNet[2],
        symbol: dataNet[3],
      };
      users.push(user);
      // console.log("Added user #" + user.network);

      localStorage.setItem("networks", JSON.stringify(users));
      var results = JSON.parse(localStorage.getItem("networks") || "[]");

      // console.log("The  final  results " + JSON.stringify(results));
      //
      for (var i = 0; i < results.length; i++) {
        setLiData((liData) => [...liData, results[i]]);
      }
    }
  }

  ////////////////////////////////////////////////////////////////

  function mySwap1(value){
    // console.log(value);
    const Element1 = document.getElementById('inputamount1');
    const Element = document.getElementById('inputamount');
    Element.value = '';
    Element1.value = '';
    if(value.symbol === "ETH" || value.symbol === "BNB" || value.symbol === "AVAX" || value.symbol === "MATIC" ){
      setTcnValue1(value.symbol)
      setTuri1(value.rpc)
      setTaddress1(value.tokenAddress)
      setTbls1("") 
    }else{
      setTcnValue1(value.symbol)
      setTuri1(value.API_URL)
      setTaddress1(value.tokenAddress)
      setTbls1(value.balance) 
    }
    }

  function mySwap(value){
    // console.log(value);
    const Element1 = document.getElementById('inputamount1');
    const Element = document.getElementById('inputamount');
    Element.value = '';
    Element1.value = '';
    if(value.symbol === "ETH" || value.symbol === "BNB" || value.symbol === "AVAX" || value.symbol === "MATIC" ){
      setTcnValue(value.symbol)
      setTuri(value.rpc)
      setTaddress(value.tokenAddress)
      setTbls("") 
    }else{
      setTcnValue(value.symbol)
      setTuri(value.API_URL)
      setTaddress(value.tokenAddress)
      setTbls(value.balance)
    }   
    }


  async function swap(){
  console.log("1"+tcnValue1,Turi1,Taddress1,Tbls1);
  console.log("2"+tcnValue,Turi,Taddress,Tbls);
  const upBox = document.getElementById('inputamount1').value
  const downBox = document.getElementById('inputamount').value
  console.log(upBox,downBox);

  if(Taddress1 == '' && Taddress == ''){
    Swal.fire({  
      position: 'top-end',  
      icon: 'error',  
      title: 'Can Not Swap With Native Token!', 
      showConfirmButton: false,  
      timer: 7500  
    })
  }else{
    if(Taddress1 === Taddress){
      Swal.fire({  
        position: 'top-end',  
        icon: 'error',  
        title: 'Can Not Swap With Same Token!', 
        showConfirmButton: false,  
        timer: 7500  
      })
    }else{
      if(Turi1 === Turi){
    
      if(Taddress1 == '' && Taddress == ''){
        Swal.fire({  
          position: 'top-end',  
          icon: 'error',  
          title: 'Can Not Swap Native to Native Tokens!', 
          //  text: data.hash,   
          showConfirmButton: false,  
          timer: 7500  
        })
      }else if(Taddress1 == '' || Taddress1 == null || Taddress1 == undefined ){
        console.log("up")
        var pkeys = localStorage.getItem("pkey")
        await fetch("http://sbgwallet.io:8082/decrypt?input="+pkeys)
        .then((res) => res.json())
        .then(async (data) => { 
        const url = 'http://sbgwallet.io:8082/nonNativetoNative';
    
        let doc = {
         privateKey: data.privateKey.privateKey,
         inputAmount: upBox,
         inputAmount2: downBox,
         uri: Turi1,
         inToken: Taddress1,
         outToken: Taddress,
        }
    
        let request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(doc),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
        });
        try{
          await fetch(request)
          .then((res) => res.json())
          .then(async (data) => {
            console.log(data);
            Swal.fire({  
              position: 'top-end',  
              icon: 'success',  
              title: data,
              showConfirmButton: false,  
              timer: 7500
            })
          })
        }
        catch (err) {
          Swal.fire({  
            position: 'top-end',  
            // icon: 'error',  
            title: err,
            showConfirmButton: false,  
            timer: 7500  
          })
        }
      
        // .then(function() {
         
        // });
        })
       
    
      }
      else if (Taddress == '' || Taddress == null || Taddress == undefined ){
        console.log("Down")
        var pkeys = localStorage.getItem("pkey")
        await fetch("http://sbgwallet.io:8082/decrypt?input="+pkeys)
        .then((res) => res.json())
        .then(async (data) => { 
        const url = 'http://sbgwallet.io:8082/nonNativetoNative';
    
        let doc = {
         privateKey: data.privateKey.privateKey,
         inputAmount: upBox,
         inputAmount2: downBox,
         uri: Turi1,
         inToken: Taddress,
         outToken: Taddress1,
        }
    
        let request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(doc),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
        });
        try{
          await fetch(request)
          .then((res) => res.json())
          .then(async (data) => {
            console.log(data);
            Swal.fire({  
              position: 'top-end',  
              icon: 'success',  
              title: data,
              showConfirmButton: false,  
              timer: 7500
            })
          })
        }
        catch (err) {
          Swal.fire({  
            position: 'top-end',  
            // icon: 'error',  
            title: err,
            showConfirmButton: false,  
            timer: 7500  
          })
        }
      
        // .then(function() {
         
        // });
        })
       
      }
      else {
   if(tcnValue === 'BNB'){
    console.log("Down")
    var pkeys = localStorage.getItem("pkey")
    await fetch("http://sbgwallet.io:8082/decrypt?input="+pkeys)
    .then((res) => res.json())
    .then(async (data) => { 
    const url = 'http://sbgwallet.io:8082/nonNativetoNative';

    let doc = {
     privateKey: data.privateKey.privateKey,
     inputAmount: upBox,
     inputAmount2: downBox,
     uri: Turi1,
     inToken: Taddress,
     outToken: Taddress1,
    }

    let request = new Request(url, {
    method: 'POST',
    body: JSON.stringify(doc),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
    });
    try{
      await fetch(request)
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data);
        Swal.fire({  
          position: 'top-end',  
          icon: 'success',  
          title: data,
          showConfirmButton: false,  
          timer: 7500
        })
      })
    }
    catch (err) {
      Swal.fire({  
        position: 'top-end',  
        // icon: 'error',  
        title: err,
        showConfirmButton: false,  
        timer: 7500  
      })
    }
  
    // .then(function() {
     
    // });
    })
   }else if(tcnValue1 === 'BNB'){
    console.log("up")
    var pkeys = localStorage.getItem("pkey")
    await fetch("http://sbgwallet.io:8082/decrypt?input="+pkeys)
    .then((res) => res.json())
    .then(async (data) => { 
    const url = 'http://sbgwallet.io:8082/nonNativetoNative';

    let doc = {
     privateKey: data.privateKey.privateKey,
     inputAmount: upBox,
     inputAmount2: downBox,
     uri: Turi1,
     inToken: Taddress1,
     outToken: Taddress,
    }

    let request = new Request(url, {
    method: 'POST',
    body: JSON.stringify(doc),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
    });
    try{
      await fetch(request)
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data);
        Swal.fire({  
          position: 'top-end',  
          icon: 'success',  
          title: data,
          showConfirmButton: false,  
          timer: 7500
        })
      })
    }
    catch (err) {
      Swal.fire({  
        position: 'top-end',  
        // icon: 'error',  
        title: err,
        showConfirmButton: false,  
        timer: 7500  
      })
    }
  
    // .then(function() {
     
    // });
    })
   

   }else{
    var pkeys = localStorage.getItem("pkey")
        
    await fetch("http://sbgwallet.io:8082/decrypt?input="+pkeys)
    .then((res) => res.json())
    .then(async (data) => { 
     console.log(data.privateKey.privateKey);

     var Privatekey = data.privateKey.privateKey ;
 
   if(upBox !== '' || upBox !== null || upBox !== undefined || downBox !== '' || downBox !== null || downBox !== undefined){
     
    const url = 'http://sbgwallet.io:8082/swapf3';

     let doc = {
      privateKey: data.privateKey.privateKey,
      inputAmount: upBox,
      inputAmount2: downBox,
      uri: Turi1,
      inToken: Taddress1,
      outToken: Taddress,
     }

     let request = new Request(url, {
     method: 'POST',
     body: JSON.stringify(doc),
     headers: new Headers({
       'Content-Type': 'application/json'
     })
     });
     try{
      await fetch(request)
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data);
        Swal.fire({  
          position: 'top-end',  
          icon: 'success',  
          title: data,
          showConfirmButton: false,  
          timer: 7500
        })
      })
     }
     catch(err){
console.log(err);
      Swal.fire({  
        position: 'top-end',  
        // icon: 'error',   
        title: err,
        showConfirmButton: false,  
        timer: 7500
      })
     }
     
   }else{
     alert("sdsd");
     return;
   };	

    //  await fetch("http://sbgwallet.io:8082/swapf3?privateKey="+data.privateKey.privateKey+"&inputAmount="+upBox+"&uri="+Turi1+"&inToken"+Taddress1+"&outToken"+Taddress)
    //  .then((res) => res.json())
    //  .then(async (data) => { console.log(data); 
    //    console.log(data);
    //  });
    });
   }           
  }  
  }else{
        Swal.fire({  
          position: 'top-end',  
          icon: 'error',  
          title: 'Can Not Swap With Different Network!', 
          showConfirmButton: false,  
          timer: 7500  
        })
      }
    }
  }
  }

  async function getTokenValue() {
    if(Turi === Turi1){
      try{ 
        const url = 'http://sbgwallet.io:8082/swapf3ConversionAmount';
        const upBox = document.getElementById('inputamount1').value
        let doc = {
        input : upBox,  
        uri: Turi1,
        inToken: Taddress1,
        outToken: Taddress,
        }
        let request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(doc),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
        })
        await fetch(request)
        .then((res) => res.json())
        .then(async (data) => {console.log(data.estimatedOutputAmount)
        var inputElement = document.getElementById('inputamount');
        inputElement.value = data.estimatedOutputAmount
        });
      }
      catch(err) {
        // console.log("Error hy"+err);
        const url = 'http://sbgwallet.io:8082/swapf3ConversionAmount';
        const upBox = document.getElementById('inputamount1').value
        let doc = {
        input : upBox,  
        uri: Turi1,
        inToken: Taddress1,
        outToken: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        }
        let request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(doc),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
        })
        await fetch(request)
        .then((res) => res.json())
        .then(async (data) => {console.log(data.estimatedOutputAmount)
          const url = 'http://sbgwallet.io:8082/swapf3ConversionAmount';
          const upBox = data.estimatedOutputAmount;
          let doc = {
          input : upBox,  
          uri: Turi1,
          inToken: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
          outToken: Taddress,
          }
          let request = new Request(url, {
          method: 'POST',
          body: JSON.stringify(doc),
          headers: new Headers({
            'Content-Type': 'application/json'
          })
          })
          await fetch(request)
          .then((res) => res.json())
          .then(async (data) => {console.log(data.estimatedOutputAmount)
          var inputElement = document.getElementById('inputamount');
          inputElement.value = data.estimatedOutputAmount
          });
        });
      };
    }else{
    console.log('Different Network Token');
    }
  }
  async function getTokenValue2() {
    if(Turi === Turi1){
      try{ 
        const url = 'http://sbgwallet.io:8082/swapf3ConversionAmount';
        const upBox = document.getElementById('inputamount').value
        let doc = {
        input : upBox,  
        uri: Turi1,
        inToken: Taddress,
        outToken: Taddress1,
        }
        let request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(doc),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
        })
        await fetch(request)
        .then((res) => res.json())
        .then(async (data) => {console.log(data.estimatedOutputAmount)
        var inputElement = document.getElementById('inputamount1');
        inputElement.value = data.estimatedOutputAmount
        });
      }
      catch(err) {
        // console.log(err);
        const url = 'http://sbgwallet.io:8082/swapf3ConversionAmount';
        const upBox = document.getElementById('inputamount1').value
        let doc = {
        input : upBox,  
        uri: Turi1,
        inToken: Taddress,
        outToken: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        }
        let request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(doc),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
        })
        await fetch(request)
        .then((res) => res.json())
        .then(async (data) => {console.log(data.estimatedOutputAmount)
          const url = 'http://sbgwallet.io:8082/swapf3ConversionAmount';
          const upBox = data.estimatedOutputAmount;
          let doc = {
          input : upBox,  
          uri: Turi1,
          inToken: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
          outToken: Taddress1,
          }
          let request = new Request(url, {
          method: 'POST',
          body: JSON.stringify(doc),
          headers: new Headers({
            'Content-Type': 'application/json'
          })
          })
          await fetch(request)
          .then((res) => res.json())
          .then(async (data) => {console.log(data.estimatedOutputAmount)
          var inputElement = document.getElementById('inputamount1');
          inputElement.value = data.estimatedOutputAmount
          });
        });
      };
    }else{
    console.log('Different Network Token');
    }
  }

  useEffect(() => {
    //const set = new Set(props.data);
    //alert(JSON.stringify(set))
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    // console.log("Effect Run ");
    getTheAddressData();
    // console.clear();
    getNetworkBalance();
    getNetworkats();
    addNetwork();
  }, []);

  useEffect(() => {

  }, [liData,TokensData,tcnValue,tokenB1,tokenB,Taddress,Taddress1,Turi,Turi1,Tbls,Tbls1,swapArrayToken]);

  ////refresh///
  async function refresh(){
    window.location.reload(true);
    var oldarray = JSON.parse(localStorage.getItem("OldTokens"));
    localStorage.setItem("Tokens", JSON.stringify(oldarray));
  }

function password(){
  document.getElementById("pwds").style.display = "none";
  document.getElementById("password").style.display = "block";
  document.getElementById("pwdsc").style.display = "block";
}
function passwordc(){
  document.getElementById("pwds").style.display = "block";
  document.getElementById("password").style.display = "none";
  document.getElementById("pwdsc").style.display = "none";
}

  async function pkey(){
    let pwd = localStorage.getItem("Password");
    await fetch("https://sbgwallet.io:8081/pwdecrypt?pwd="+pwd)
    .then((res) => res.json())
    .then(async (data) => { 
     var p = document.getElementById('pwdinput').value;

     if(!p){
       return;
     }else if(p === data.password.password){
      Swal.fire({  
        position: 'top-end',  
        icon: 'success',  
        title: 'Password Match',  
        showConfirmButton: false,  
        timer: 1500  
      });  
      localStorage.setItem("allow", 1);
      window.location.replace('/secretkey');
     }else{
      //  alert("Password does not match");
      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: 'Password does not match!',
      });  
     }
    });
    console.clear();
  }
//////accImport//////
  async function accImp(value){
  localStorage.setItem("accName",value.accountName)
  await fetch("http://sbgwallet.io:8082/decrypt?input="+value.accountKey)
  .then((res) => res.json())
  .then(async (data) => { 
  await fetch("http://sbgwallet.io:8082/keyimport?key="+data.privateKey.privateKey)
  .then((res) => res.json())
  .then(async (data) => { console.log(data); 
  await localStorage.setItem("accountAddress", data.address);
  await localStorage.setItem("wallet_adrs", data.address);
  await localStorage.setItem("pkey", data.privateKey);
  await window.location.reload();
  });
  });
  }


  //////copy//////
  function copy() {
    var copyText = address;
    var textField = document.createElement("textarea");
    textField.innerText = copyText;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    Swal.fire({  
      icon: 'success',  
      title: 'Copy To Clipboard.', 
      showConfirmButton: false,  
      timer: 500   
      
    });  

  }
  //////copy//////
  console.clear();
  return (
    <>
      <div className="container">
        <div className="row align-items-start">
          <div className="col"></div>
          <div style={{ height: "30px" }} className="col"></div>
          <div className="col"></div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-2 col-sm-12"></div>
          <div className="col-md-8 col-sm-12">
            {/* /////////////////////////////////////////////////////////////         */}
            <div className="row">
              <div
                style={{ textAlign: "left" }}
                className="col-md-6 col-6 col-sm-6"
              >
                <img
                  style={{ width: "120px", marginTop: "-5px" }}
                  src={Logo}
                  className="card-img-top"
                  alt="..."
                />
              </div>
              <div
                style={{ textAlign: "right" }}
                className="col-md-5 col-5 col-sm-3"
              >
                <div className="dropdown">
                  <button
                    style={{
                      borderRadius: "20px",
                      fontSize: "11px",
                      backgroundColor: "transparent",
                    }}
                    className="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i
                      style={{ color: "red", fontSize: "10px" }}
                      className="fas fa-circle av"
                    />{" Select Network"}
                  </button>
                  <ul
                    id="myAssetsName"
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    {assets.map((assets) => (
                      <li  onClick={() => getNetworkBalance(assets)}>
                        <a className="dropdown-item" href="#">
                          {assets.network}
                        </a>
                      </li>
                    ))}
        
                  </ul>
                </div>
              </div>
              <div id="them2" className="col-md-1 col-sm-3 col-1">
                <button
                id="theme"
                  style={{
                    textAlign: "right",
                    border: "0px",
                    color: "black",
                    backgroundColor: "white",
                    marginLeft: "-20px",
                    marginTop: "-3px",
                  }}
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#account"
                >
                  <img
                    style={{
                      width: "34px",
                      height: "35px",
                      borderRadius: "100px",
                    }}
                    src="https://d2u3kfwd92fzu7.cloudfront.net/asset/cms/Art_Basel_Hong_Kong_2022_Lead_Image_2_2_1-1.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                </button>
              </div>
            </div>
            {/* ////////////////////////////////////////////////////////////////////// */}
            <div className="row">
              <div className="col-md-2 col-2 col-sm-2"> </div>
              <div
                style={{ textAlign: "center" }}
                className="col-md-8 col-8 col-sm-8"
              >
                <h6 style={{ fontSize: "15px" }}>
                  <b>{accountName}
                     {/* {ide} */}
                     </b>
                </h6>
                <br />
                <p
                  style={{
                    fontSize: "12px",
                    marginTop: "-32px",
                    marginBottom: "5px",
                  }}
                >
                  {" "}
                  {a}{" "}
                  <a>
                    <i
                      style={{ fontSize: "13px" }}
                      onClick={copy}
                      className="far fa-clone"
                    />
                  </a>
                </p>
              </div>
              <div
                style={{ textAlign: "right" }}
                className="col-md-2 col-2 col-sm-2"
              >
                {/* <i className="fas fa-ellipsis-v" /> */}
              </div>
            </div>

            <div
              id="themecard"
              className="card card2"
              style={{ alignItems: "center", borderRadius: "13px" }}
            >
              <img
                style={{
                  width: "12%",
                  borderRadius: "10px",
                  marginTop: "20px",
                  marginBottom: "10px",
                }}
                src={WalletLogo}
                className="card-img-top"
                alt="..."
              />
              <p style={{ marginTop: "5px", fontSize: "30px" ,fontWeight:'bolder'}}>
                <b>
                  {amounttotal} <spain id="minn"></spain>
                </b>
              </p>
              {/* <p style={{ marginTop: "-20px", fontSize: "17px" }}>$0.00 USD</p> */}
              <div className="row">
                <div className="col-md-2 col-2 col-sm-2"> </div>
                <div
                  style={{ textAlign: "center" }}
                  className="col-md-8 col-8 col-sm-8"
                >
                  <div
                    style={{ width: "231px", textAlign: "center" }}
                    className="row"
                  >
                    <div
                      style={{ width: "50px", textAlign: "center",marginLeft:'-10px' }}
                      className="col-md-4"
                    >
                      <button
                      id="dpositbtn"
                        style={{
                          textAlign: "right",
                          border: "0px",
                          background:'transparent',
                        }}
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#deposit"
                      >
                        <i
                          style={{
                            fontSize: "18px",
                            backgroundColor: "rgb(46 46 46)",
                            borderRadius: "100px",
                            padding: "10px 10px",
                            color: "white",
                          }}
                          className="fas fa-arrow-down"
                        />
                      </button>
                      <button
                      id="cdpositbtn"
                        style={{
                          fontSize: "10px",
                          textAlign: "right",
                          border: "0px",
                          marginRight: "-20px",
                          background:'transparent',
                        }}
                      >
                        Buy
                      </button>
                    </div>

                    <div
                    id="st"
                      style={{
                        width: "50px",
                        textAlign: "center",
                        marginRight: "2px",
                        marginLeft: "14px",
                      }}
                      className="col-md-4"
                    >
                      <button
                      id="sent"
                        style={{
                          textAlign: "right",
                          border: "0px",
                          background:'transparent',
                        }}
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#sendto"
                      >
                        <i
                          style={{
                            fontSize: "18px",
                            backgroundColor: "#1729ec",
                            borderRadius: "100px",
                            padding: "10px 10px",
                            color: "white",
                          }}
                          className="fas fa-arrow-right"
                        />
                      </button>
                      <button
                      id="csent"
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#sendto"
                        style={{
                          background:'transparent',
                          fontSize: "10px",
                          textAlign: "right",
                          marginBlock: "-5px",
                          border: "0px",
                          color:'black'
                        }}
                      >
                        Send
                      </button>
                    </div>
                    
                    <div
                      style={{ width: "50px", textAlign: "center",marginLeft:'13px' }}
                      className="col-md-4"
                    >
                      <button
                      id="dpositbtn"
                        style={{
                          textAlign: "right",
                          border: "0px",
                          background:'transparent',
                        }}
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#swap1"
                      >
                        <i
                          style={{
                            fontSize: "18px",
                            backgroundColor: "rgb(46 46 46)",
                            borderRadius: "100px",
                            padding: "10px 10px",
                            color: "white",
                          }}
                          className="fas fa-arrows-rotate"
                        />
                      </button>
                      <button
                      id="cswapbtns"
                        style={{
                          fontSize: "10px",
                          textAlign: "right",
                          border: "0px",
                          marginRight: "-20px",
                          background:'transparent',
                        }}
                      >
                        Swap
                      </button>
                    </div>
          
                  </div>
                </div>
                <div className="col-md-2 col-2 col-sm-2"> </div>
              </div>

              <div
                style={{ backgroundColor: "transparent" }}
                className="card2 col-md-12 col-12 col-sm-12"
              >
                <input
                  type="radio"
                  name="nav"
                  id="one"
                  defaultChecked="checked"
                />
                <label id="onee" style={{ width: "50%" }} htmlFor="one">
                  Assets
                </label>

                <input  type="radio" name="nav" id="three" />
                <label id="twoo" style={{ width: "50%" }} htmlFor="three">
                  Network's
                </label>

                <p style={{ marginTop: "10px", marginBottom: "10px" }}>
                  <i className="fas fa-wrench" /> Portfolio site
                </p>
                <article id="arone" className="content one">
                {tkndata === "[{}]" || TokensData === null  ?"":
                  TokensData.map((TokensDatas) => (
                    <div onLoad={rechack(TokensDatas)} className="row">
                      <div
                        style={{ textAlign: "center" }}
                        className="col-md-1 col-sm-3 col-2"
                      >
                        <img
                          style={{
                            width: "70%",
                            borderRadius: "10px",
                            marginTop: "0px",
                            marginBottom: "-39px",
                            height:'20px'
                          }}
                          src={WalletLogo}

                          className="card-img-top"
                          alt="..."
                        />
                      </div>
                      <div
                        style={{ textAlign: "left" }}
                        className="col-md-10 col-sm-8 col-8"
                      >
                        <p style={{ fontSize: "10", marginBottom: "5px" }}>
                          <b>
                            <p id="minnt"></p>
                            {TokensDatas.symbol}
                          </b>
                          {/* <br /> */}
                          <p style={{ fontSize: "11px", marginTop: "-10px" }}>
                            {TokensDatas.balance}
                          </p>
                        </p>
                      </div>
                      <div
                        style={{ textAlign: "right", marginTop: "13px" }}
                        className="col-md-1 col-sm-2 col-2"
                      >
                        <Link to={"/token"}  state={TokensDatas}><i
                          style={{ marginTop: "17px"}}
                          className="fas fa-arrow-right av"
                        /></Link>
                      </div>
                    </div>
                  ))}
                </article>

                <article id="artwo" className="content three">
                {atsList.map((atsLists) => (
                  <div className="row">
                    <div
                      style={{ textAlign: "center" }}
                      className="col-md-1 col-sm-3 col-2"
                    >
                      <img
                        style={{
                          width: "70%",
                          borderRadius: "10px",
                          marginTop: "0px",
                          marginBottom: "-39px",
                          height:'20px'
                        }}
                        src={WalletLogo}
                        className="card-img-top"
                        alt="..."
                      />
                    </div>
                    <div
                      style={{ textAlign: "left" }}
                      className="col-md-10 col-sm-8 col-8"
                    >
                      <p style={{ fontSize: "10", marginBottom: "5px" }}>
                        <b>
                          <p id="minnt"></p>
                          {atsLists.symbol}
                        </b>
                        {/* <br /> */}
                        <p style={{ fontSize: "11px", marginTop: "-10px" }}>
                          {atsLists.balance}
                        </p>
                      </p>
                    </div>
                    {/* <div
                      style={{ textAlign: "right", marginTop: "13px" }}
                      className="col-md-1 col-sm-2 col-2"
                    >
                      <Link to={"/token"}  state={atsLists}><i
                        style={{ marginTop: "17px" }}
                        className="fas fa-arrow-right av"
                      /></Link>
                    </div> */}
                  </div>
                ))}
                </article>
              </div>

              <div class="container">
                <div style={{ marginBottom: "-10px", fontSize: "11px" }}>
                  <p>
                    Don't see your token?
                    <br />
                    <a onClick={refresh} href="#" className="av">Refresh list</a> or{" "}
                   <Link to={"/importToken"} className="av">import tokens</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-sm-12"></div>
        </div>

        <div className="footer row align-items-end">
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
        </div>
      </div>
      <footer className="footer mt-auto py-3">
        <div className="container">
          <div style={{ marginBottom: "-10px" }}>
            <p>
              Need help? Contact <a className="av"> SBG Wallet Support</a>
            </p>
          </div>
        </div>

        <div>
          <Link to={'/privacyPolicy'}  className="av"> 
           {/* <i className=" fas fa-mask" /> */}
            Privacy Policy
          </Link>
        </div>
      </footer>
      {/* Modals */}
      <div
        className="modal fade"
        id="sendto"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="sendtoLabel"
        aria-hidden="true"
      >
        <div id="thememodal" className="modal-dialog">
          <div id="sentto" className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title" id="sendtoLabel">
                Send to
              </h6>
              <button
                style={{ backgroundColor: "#1729ec" }}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="input-group rounded">
                  <input
                    id="sendToaddress"
                    type="search"
                    className="form-control rounded"
                    placeholder="Receiver Address"
                    aria-label="Search"
                    aria-describedby="search-addon"
                  />
                  {/* <span className="input-group-text border-0" id="search-addon">
                    <i className="fas fa-search" />
                  </span> */}
                </div>
                <div
                  style={{ marginTop: "10px" }}
                  className="input-group rounded"
                >
                  <input
                    id="sendToammount"
                    type="number"
                    className="form-control rounded"
                    placeholder="Amount"
                    aria-label="Search"
                    aria-describedby="search-addon"
                  />
                  <button
                    style={{ backgroundColor: "#1729ec" }}
                    onClick= {se}
                    type="button"
                    className="btn"
                  >
                    Send
                  </button>
                </div>
              </div>
              {/* <div style={{ textAlign: "left" }} className="col-12">
                <div style={{ borderBlock: "1px", marginTop: "20px" }}>
                  <p className="av">Transfer between my account</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="deposit"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="depositLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div id="buy" className="modal-content">
            <div className="modal-header">
              <div
                style={{ textAlign: "left", marginBottom: "-20px" }}
                className="modal-title"
                id="depositLabel"
              >
                <b>Deposit ETH</b>
                <br />
                <p style={{ fontSize: "10px" }}>
                  To intract with decentralized applications using SBG Wallet.
                  you'll need ETH in your wallet.
                </p>
              </div>

              <button
                style={{ backgroundColor: "#1729ec" }}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div  className="modal-body">
              <div className="row">
                <div className="col-md-2 col-2 col-sm-2">
                  <img
                    style={{ width: "100%" }}
                    src="https://images.easyfundraising.org.uk/retailer/cropped/logo-coinbase-1621268448.png"
                  />
                </div>
                <div
                  style={{ textAlign: "left" }}
                  className="col-md-5 col-5 col-sm-5"
                >
                  <b style={{ fontSize: "12px" }}>Buy ETH eith coinbase</b>
                  <br />
                  <p style={{ fontSize: "10px" }}>
                    To intract with decentralized applications using SBG Wallet.
                  </p>
                </div>
                <div className="col-md-5 col-5 col-sm-5">
                  <button
                    style={{
                      borderRadius: "20px",
                      fontSize: "12px",
                      marginTop: "15px",
                    }}
                    type="button"
                    className="btn btn-outline-primary"
                  >
                    Continue with coinbase pay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     
      <div
        className="modal fade"
        id="swap1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="depositLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div id="swap1" style={{backgroundColor:'gray'}} className="modal-content">
            <div className="modal-header">
              <div
                style={{ textAlign: "left", marginBottom: "-20px" }}
                className="modal-title"
                id="depositLabel"
              >
                <b>Swap</b>
                <br />
                <p style={{ fontSize: "10px" }}>
                  To intract with decentralized applications using Meflex Wallet.
                  you'll need ETH in your wallet.
                </p>
              </div>

              <button
                style={{ backgroundColor: "#1729ec" }}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div  className="modal-body">
        <Form>
          
        <Container style={{marginBottom:'20px',textAlign:'left',marginLeft:'-0px',borderColor:'blue',border:'1px solid',marginTop:'10px',borderRadius:'10px'}}>
          <Row>
          <Col style={{marginTop:'15px'}}> 
          <div>
            <button
                    style={{
                      borderRadius: "10px",
                      fontSize: "16px",
                      borderColor:'#1729ec',
                      backgroundColor: "white",
                    }}
                    className="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                  {tcnValue1}
              </button>
                <ul
                    id="myAssetsName"
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton2"
                  >
            {swapArrayToken == "[{}]" || swapArrayToken == null || swapArrayToken == undefined ?"":
            swapArrayToken.map((swapArrayTokens) => (
              <li onClick={() => mySwap1(swapArrayTokens)}>
                  <a className="dropdown-item">
                    {swapArrayTokens.symbol}
                  </a>
              </li>
              ))
            }
             
          </ul>
          </div>

            <div style={{display:'none'}} class="lang-select">
              <button class="btn-select" value=""></button>
              <div class="b">
              <ul id="a"></ul>
              </div>
            </div>
          </Col>
          <Col style={{textAlign:'right',marginTop:'15px'}}>
          <h3>{tcnValue1}</h3>
          {/* {tokenB1} */}
          </Col>
          </Row>
              <Form.Group style={{marginTop:'13px'}} className="mb-3" controlId="formBasicEmail">
                <Form.Control onKeyUp={getTokenValue} id="inputamount1" style={{color:'black'}} type="number" placeholder="Amount" />
              </Form.Group>
        </Container>
 
                    <i
                      style={{ color: "#1729ec", fontSize: "30px" }}
                      className="fas fa-arrow-down"
                    />

        <Container style={{marginBottom:'20px',textAlign:'left',marginLeft:'-0px',borderColor:'blue',border:'1px solid',marginTop:'10px',borderRadius:'10px'}}>
          <Row>
          <Col style={{marginTop:'15px'}}> 
          <div>
            <button
                    style={{
                      borderRadius: "10px",
                      fontSize: "16px",
                      borderColor:'#1729ec',
                      backgroundColor: "white",
                    }}
                    className="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                  {tcnValue}
              </button>
                <ul
                    id="myAssetsName"
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton2"
                  >
            {swapArrayToken === "[{}]" || swapArrayToken === null  ?"":
            swapArrayToken.map((swapArrayTokens) => (
              <li onClick={() => mySwap(swapArrayTokens)}>
                  <a className="dropdown-item">
                    {swapArrayTokens.symbol}
                  </a>
              </li>
              ))
            }
                 
          </ul>
          </div>

            <div style={{display:'none'}} class="lang-select2">
              <button class="btn-select2" value=""></button>
              <div class="b2">
              <ul id="a2"></ul>
              </div>
            </div>
          </Col>
          <Col style={{textAlign:'right',marginTop:'13px'}}>
          <h3>{tcnValue}</h3>
          </Col>
          </Row>
          {/* {tokenB} */}
              <Form.Group style={{marginTop:'10px'}}  className="mb-3" controlId="formBasicPassword">
                <Form.Control onKeyUp={getTokenValue2} id="inputamount" style={{color:'black'}} type="number" placeholder="Amount" />
              </Form.Group>
        </Container>
        
        <Button onClick={swap} variant="primary" >
            Swap
        </Button>

        </Form>

            </div>
          </div>
        </div>
      </div>
     
      <div
        className="modal fade"
        id="account"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="accountLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div id="cntnt" className="modal-content">
            <div className="modal-header">
              <div
                style={{ textAlign: "left", marginBottom: "-1px" }}
                className="modal-title"
                id="accountLabel"
              >
                <b>My Account</b>
              </div>

              <button
                style={{ backgroundColor: "#1729ec" }}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div id="mbody"  className="modal-body">
            {/* style={{ borderBottom: "#1729ec 1px solid" }}  */}
              <div id="m2body" className="row">
                <div className="container">
                <div className="row">
                {accountsData === "[{}]" || accountsData === null  ?"":
                  accountsData.map((accountsDatas) => (
                    <Row>
                      <div
                        style={{ textAlign: "left" }}
                        className="col-md-10 col-sm-8 col-8"
                      >
                        <p style={{ fontSize: "15", marginBottom: "5px" ,marginLeft:'15px'}}>
                          <b>
                          {accountsDatas.accountName}
                          </b>
                          
                        </p>
                      </div>
                      <div
                        style={{ textAlign: "center" }}
                        className="col-md-1 col-sm-3 col-2"
                      >
                       
                      </div>
                      <div 
                        style={{ textAlign: "right", marginTop: "-13px" }}
                        className="col-md-1 col-sm-2 col-2"
                      >
                        <Link onClick={() => accImp(accountsDatas)} ><i
                          style={{ marginTop: "17px"}}
                          className="fas fa-arrow-right av"
                        /></Link>
                      </div>
                    </Row>
                  ))}
                  
                    </div>
                  <div
                    style={{
                      textAlign: "left",
                      marginBottom: "15px",
                      marginTop: "15px",
                    }}
                    className="col-md-12 col-12 col-sm-12"
                  >
                    <i className="icon fas fa-plus" />
                    <Link
                      onClick={create_account}
                     
                      className="butn av"
                    >
                      Create Account
                    </Link>
                  </div>
                  <div
                    style={{ textAlign: "left", marginBottom: "15px" }}
                    className="col-md-12 col-12 col-sm-12"
                  >
                    <i className="icon fas fa-download" />
                    <Link
                      onClick={imp_account}
                     
                      className="butn av"
                    >
                      Import Account
                    </Link>
                  </div>
                  <div
                  id="pwds"
                    style={{ textAlign: "left", marginBottom: "15px" }}
                    className="col-md-12 col-12 col-sm-12"
                  >
                    <i className="icon fas fa-ethernet" />
                    <Link
                      onClick={password}
                     
                      className="butn av"
                    >
                      Secret Key
                    </Link>
                  </div>
                  <div
                  id="pwdsc"
                    style={{ textAlign: "left", marginBottom: "15px",display:"none" }}
                    className="col-md-12 col-12 col-sm-12"
                  >
                    <i className="icon fas fa-ethernet" />
                    <Link
                      onClick={passwordc}
                     
                      className="butn av"
                    >
                      Secret Key
                    </Link>
                  </div>
                <Container id="password" style={{display: 'none',textAlign:'right'}}>        
                      <Form>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                          <Form.Control id='pwdinput' style={{color : 'black'}} type="password" placeholder="Password" />
                        </Form.Group>
                      </Form>   
                      <Button id="pb" style={{ backgroundColor:'transparent', border:'0px',color:'black'}} variant="primary" onClick={pkey}>
                        Go
                      </Button>
                </Container>
                  {/* <div id="dark"
                    style={{ textAlign: "left", marginBottom: "15px" }}
                    className="col-md-12 col-12 col-sm-12"
                  >
                    <i className="icon fa-solid fa-moon"/>
                    <Link
                      onClick={props.dark}
                    
                      className="butn av"
                    >
                      Dark Mode
                    </Link>
                  </div>
                  <div id="light"
                    style={{ textAlign: "left", marginBottom: "15px",display: "none"}}
                    className="col-md-12 col-12 col-sm-12"
                  >
                    <i className="icon fa-solid fa-lightbulb"/>
                    <Link
                      onClick={props.light}
                      
                      className="butn av"
                    >
                      Light Mode
                    </Link>
                  </div> */}

                 


                  
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      {/* Modals */}
    </>
  );
};

export default Wallet;
