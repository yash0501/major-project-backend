const express = require("express");
const app = express();
const Web3 = require("web3");

require("dotenv").config();
const port = process.env.PORT || 3000;

const RPC_ENDPOINT =
  "https://sepolia.infura.io/v3/3b9ddf92806a40b1a08daf6933086885";
const ORIGIN_CONTRACT_ADDRESS = "0xA64CDe06fFc21CDDc03399aca4BbA7df39A0acf6";
const WALLET_ADDRESS = "0x998235F53F383A8E0C103B73f6Ee903a8B85E0a2";
const WALLET_KEY =
  "0x369d90e79792c70501628ba0d89e06cf7ead277dd08e84c45a544b0849ff046d";

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
        internalType: "uint256",
        name: "_aadhar",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_complaintDocument",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
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
        internalType: "uint256",
        name: "_aadhar",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
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
        internalType: "uint256",
        name: "_aadhar",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
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
        internalType: "uint256",
        name: "_aadhar",
        type: "uint256",
      },
    ],
    name: "getUserAllComplaints",
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
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct FIR.FIR_Document[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_aadhar",
        type: "uint256",
      },
    ],
    name: "getUserComplaintCount",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "userFIRCount",
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
    aadhar,
    pan,
    city,
    pincode,
    policeStation,
    description,
    complaintDocument,
  } = req.body;
  try {
    console.log("Creating FIR Document");
    const trx = await tokenContract.methods.createFIR(
      name,
      phone,
      aadhar,
      pan,
      city,
      pincode,
      policeStation,
      description,
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

app.get("/getFIRDocument/:aadhar/:id", async (req, res) => {
  try {
    console.log("Getting FIR Document");
    const trx = await tokenContract.methods.getFIRDocument(
      req.params.aadhar,
      req.params.id,
    );
    const data = await trx.call();
    console.log(data);
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

// app.get("/getFIRDocumentStatus/:aadhar", async (req, res) => {
//   try {
//     console.log("Getting FIR Document Status");
//     const trx = await tokenContract.methods.getFIRDocumentStatus(
//       req.params.aadhar,
//     );
//     const data = await trx.call();
//     console.log(data);
//     res.send(data);
//   } catch (err) {
//     console.log(err);
//   }
// });

app.get("/getFIRDocumentComplaintDocument/:aadhar/:id", async (req, res) => {
  try {
    console.log("Getting FIR Document Complaint Document");
    const trx = await tokenContract.methods.getFIRComplaintDocument(
      req.params.aadhar,
      req.params.id,
    );
    const data = await trx.call();
    console.log(data);
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

app.post("/updateFIRDocument", async (req, res) => {
  const { aadhar, id, complaintDocument } = req.body;
  try {
    console.log("Updating FIR Document Status");
    const trx = await tokenContract.methods.updateFIR(
      aadhar,
      id,
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

app.get("/getUserComplaintsCount/:aadhar", async (req, res) => {
  try {
    console.log("Getting User Complaints Count");
    const trx = await tokenContract.methods.getUserComplaintCount(
      req.params.aadhar,
    );
    const data = await trx.call();
    console.log(data);
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/getUserAllComplaints/:aadhar", async (req, res) => {
  try {
    console.log("Getting User All Complaints");
    const trx = await tokenContract.methods.getUserAllComplaints(
      req.params.aadhar,
    );
    const data = await trx.call();
    console.log(data);
    res.send(data);
  } catch (err) {
    console.log(err);
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
