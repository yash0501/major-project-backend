// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract FIR {
    struct FIR_Document {
        string name;
        uint phone;
        uint aadhar;
        string pan;
        string city;
        uint pincode;
        string policeStation;
        string description;
        string complaintDocument;
        uint timestamp;
    }

    mapping(uint => mapping(uint => FIR_Document)) public FIR_Documents;
    uint public FIR_DocumentsCount;
    mapping(uint => uint) public userFIRCount;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function createFIR(string memory _name,  uint _phone, uint _aadhar, string memory _pan, string memory _city, uint pincode, string memory _policeStation, string memory _description, string memory _complaintDocument) public {
        require(msg.sender == owner, "Only owner can create FIR");
        FIR_DocumentsCount++;
        uint index = userFIRCount[_aadhar];
        // if(userFIRCount[_aadhar])
        FIR_Documents[_aadhar][index] = FIR_Document(
            _name,
            _phone,
            _aadhar,
            _pan,
            _city,
            pincode,
            _policeStation,
            _description,
            _complaintDocument,
            block.timestamp
        );
        userFIRCount[_aadhar]++;
    }

    function updateFIR(uint _aadhar, uint _index, string memory _complaintDocument) public {
        require(msg.sender == owner, "Only owner can update FIR");
        FIR_Documents[_aadhar][_index].complaintDocument = _complaintDocument;
    }

    function updateAdmin(address newAdmin) public {
        require(msg.sender == owner, "Only owner can update FIR");
        owner = newAdmin;
    }

    function getFIRDocument(uint _aadhar, uint _index) public view returns (FIR_Document memory) {
        return FIR_Documents[_aadhar][_index];
    }

    function getFIRDocumentsCount() public view returns (uint) {
        return FIR_DocumentsCount;
    }

    function getFIRDocumentComplaintDocument(uint _aadhar, uint _index) public view returns (string memory) {
        return FIR_Documents[_aadhar][_index].complaintDocument;
    }

    function getUserComplaintCount(uint _aadhar) public view returns (uint){
        return userFIRCount[_aadhar];
    }

    function getUserAllComplaints(uint _aadhar) public view returns (FIR_Document[] memory){
        uint index = userFIRCount[_aadhar];
        FIR_Document[] memory results = new FIR_Document[](index);
        for(uint i=0;i<index;i++){
            FIR_Document memory doc = FIR_Documents[_aadhar][i];
            results[i] = doc;
        }
        return results;
    }
}