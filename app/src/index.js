import Web3 from "web3";
import starNotaryArtifact from "../../client/src/contracts/StarNotary.json";

import DataTable from "datatables.net"

import Swal from 'sweetalert2'



const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    //const web3 = new Web3('https://goerli.infura.io/v3/af8eece80afb40ef8be65fbcdf4a5961');
    //web3 = new Web3(window.web3.currentProvider.enable())

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      console.log("Network ID", networkId);
      const deployedNetwork = starNotaryArtifact.networks[networkId];
      console.log("deployedNetwork", deployedNetwork);
      this.meta = new web3.eth.Contract(
        starNotaryArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
    } catch (error) {
      console.error("Could not connect to contract or chain.");
      Swal.fire({
        icon: 'error',
        title: 'Could not connect to contract or chain',
        text: 'The website was unable to connect to the contract or to the Ethereum Goerli chain. Do you have a web3 wallet, like Metamask, installed?',
        footer: 'Install Metamask or contact the author for assitance.'
      })
    }


    //Create table
    let table1 = new DataTable(
      '#myfancytable',
      {columns: [
        { title: 'Star ID' },
        { title: 'Star Name' }]
      }
    );

    // Read events, so existing stars can be identified.
    let pastEvents = await this.meta.getPastEvents("allEvents", { fromBlock: 1});
    console.log("Past Events",pastEvents);
    for (const x of pastEvents) {
      if (x.event)
      console.log(x);
      console.log(x.event);
      console.log(x.returnValues.from, x.returnValues.to);
      if(x.event=="Transfer" & x.returnValues.from=="0x0000000000000000000000000000000000000000"){
        table1.row.add([x.returnValues.tokenId, "TODO"]).draw();
      }
    }

  },

  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },

  createStar: async function() {
    ///alert("Create Star called");//TODO delete
    const { createStar } = this.meta.methods;
    const name = document.getElementById("starName").value;
    const id = document.getElementById("starId").value;
    ///console.log("A");//TODO delete line
    await createStar(name, id).send({from: this.account});
    //await createStar(name, id, {from: this.account});
    Swal.fire("Successfully created a new star!");
  },

  sellStar: async function() {
    ///alert("Create Star called");//TODO delete
    const { putStarUpForSale } = this.meta.methods;
    const ethprice = document.getElementById("askingPrice-sell").value;
    let starPrice = Web3.utils.toWei(ethprice, "ether");
    const id = document.getElementById("starId-sell").value;
    await putStarUpForSale(id, starPrice).send({from: this.account});
    Swal.fire("Successfully put up star for sale!");
  },

  buyStar: async function() {
    ///alert("Create Star called");//TODO delete
    const { buyStar } = this.meta.methods;
    const id = document.getElementById("starId-buy").value;
    await buyStar(id).send({from: this.account});
    Swal.fire("Successfully bought Star!");
  }

};

window.App = App;

window.addEventListener("load", async function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // get permission to access accounts
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'No web3 provider found!',
      text: 'This website needs a browser extension like Metamask, so you can register or buy stars. Without, you will only be able to see registered stars.',
      footer: 'Install metamask and/or switch to a compatible browser.'
    })
    console.warn("No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",);
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"),);
  }

  App.start();

});
