import Web3 from "web3";
import starNotaryArtifact from "../../client/src/contracts/StarNotary.json";

import Swal from 'sweetalert2'

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    //const { web3 } = this;

    const web3 = new Web3('https://goerli.infura.io/v3/af8eece80afb40ef8be65fbcdf4a5961')

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
        text: 'The website was unable to connect to the contract or to the Ethereum Goerli chain.',
        footer: 'Contact the author for assitance.'
      })
    }
  },

  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },

  createStar: async function() {
    const { createStar } = this.meta.methods;
    const name = document.getElementById("starName").value;
    const id = document.getElementById("starId").value;
    await createStar(name, id).send({from: this.account, gasPrice: 100000});
    App.setStatus("New Star Owner is " + this.account + ".");
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