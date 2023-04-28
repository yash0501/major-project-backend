const express = require("express");
const app = express();
const Web3 = require("web3");

require("dotenv").config();
const port = process.env.PORT || 3000;

const RPC_ENDPOINT = "";
const ORIGIN_CONTRACT_ADDRESS = "";
const WALLET_ADDRESS = "";
const WALLET_KEY = "";

let abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_phone",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_email",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_aadhar",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_pan",
        type: "string",
      },
      {
        internalType: "string",
        name: "_city",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "pincode",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_policeStation",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "string",
        name: "_complaintDocument",
        type: "string",
      },
      {
        internalType: "string",
        name: "_status",
        type: "string",
      },
    ],
    name: "createFIR",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "updateAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_email",
        type: "string",
      },
      {
        internalType: "string",
        name: "_complaintDocument",
        type: "string",
      },
      {
        internalType: "string",
        name: "_status",
        type: "string",
      },
    ],
    name: "updateFIR",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "FIR_Documents",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "phone",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "email",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "aadhar",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "pan",
        type: "string",
      },
      {
        internalType: "string",
        name: "city",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "pincode",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "policeStation",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "string",
        name: "complaintDocument",
        type: "string",
      },
      {
        internalType: "string",
        name: "status",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "FIR_DocumentsCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_email",
        type: "string",
      },
    ],
    name: "getFIRDocument",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "phone",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "email",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "aadhar",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "pan",
            type: "string",
          },
          {
            internalType: "string",
            name: "city",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "pincode",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "policeStation",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "complaintDocument",
            type: "string",
          },
          {
            internalType: "string",
            name: "status",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct FIR.FIR_Document",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_email",
        type: "string",
      },
    ],
    name: "getFIRDocumentComplaintDocument",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getFIRDocumentsCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_email",
        type: "string",
      },
    ],
    name: "getFIRDocumentStatus",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const web3Provider = new Web3(RPC_ENDPOINT);
// console.log(ORIGIN_CONTRACT_ADDRESS);
web3Provider.eth.accounts.wallet.add({
  privateKey: WALLET_KEY,
  address: WALLET_ADDRESS,
});

const tokenContract = new web3Provider.eth.Contract(
  abi,
  ORIGIN_CONTRACT_ADDRESS,
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/createFIR", async (req, res) => {
  const {
    name,
    phone,
    email,
    aadhar,
    pan,
    city,
    pincode,
    policeStation,
    description,
    complaintDocument,
    status,
  } = req.body;
  try {
    console.log("Creating FIR Document");
    const trx = await tokenContract.methods.createFIR(
      name,
      phone,
      email,
      aadhar,
      pan,
      city,
      pincode,
      policeStation,
      description,
      complaintDocument,
      status,
    );
    const gas = await trx.estimateGas({ from: WALLET_ADDRESS });
    const gasPrice = await web3Provider.eth.getGasPrice();
    const data = await trx.encodeABI();
    const nonce = await web3Provider.eth.getTransactionCount(WALLET_ADDRESS);
    const trxData = {
      from: WALLET_ADDRESS,
      to: ORIGIN_CONTRACT_ADDRESS,
      data,
      gas,
      gasPrice,
      nonce,
    };
    const receipt = await web3Provider.eth.sendTransaction(trxData);
    console.log(`Transaction sent, hash is ${receipt.transactionHash}`);
    res.send(receipt.transactionHash);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.get("/getFIRDocumentsCount", async (req, res) => {
  try {
    console.log("Getting FIR Documents Count");
    const trx = await tokenContract.methods.getFIRDocumentsCount();
    const data = await trx.call();
    console.log(data);
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/getFIRDocument/:email", async (req, res) => {
  try {
    console.log("Getting FIR Document");
    const trx = await tokenContract.methods.getFIRDocument(req.params.email);
    const data = await trx.call();
    console.log(data);
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/getFIRDocumentStatus/:email", async (req, res) => {
  try {
    console.log("Getting FIR Document Status");
    const trx = await tokenContract.methods.getFIRDocumentStatus(
      req.params.email,
    );
    const data = await trx.call();
    console.log(data);
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/getFIRDocumentComplaintDocument/:email", async (req, res) => {
  try {
    console.log("Getting FIR Document Complaint Document");
    const trx = await tokenContract.methods.getFIRComplaintDocument(
      req.params.email,
    );
    const data = await trx.call();
    console.log(data);
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

app.post("/updateFIRDocumentStatus", async (req, res) => {
  const { email, status, complaintDocument } = req.body;
  try {
    console.log("Updating FIR Document Status");
    const trx = await tokenContract.methods.updateFIRDocumentStatus(
      email,
      status,
      complaintDocument,
    );
    const gas = await trx.estimateGas({ from: WALLET_ADDRESS });
    const gasPrice = await web3Provider.eth.getGasPrice();
    const data = await trx.encodeABI();
    const nonce = await web3Provider.eth.getTransactionCount(WALLET_ADDRESS);
    const trxData = {
      from: WALLET_ADDRESS,
      to: ORIGIN_CONTRACT_ADDRESS,
      data,
      gas,
      gasPrice,
      nonce,
    };
    const receipt = await web3Provider.eth.sendTransaction(trxData);
    console.log(`Transaction sent, hash is ${receipt.transactionHash}`);
    res.send(receipt.transactionHash);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// app.get("/getAllFIRDocuments", async (req, res) => {
//   try {
//     console.log("Getting All FIR Documents");
//     const trx = await tokenContract.methods.FIR_Documents();
//     const data = await trx.call();
//     console.log(data);
//     res.send(data);
//   } catch (err) {
//     console.log(err);
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
