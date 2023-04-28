// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract FIR {
    struct FIR_Document {
        string name;
        uint phone;
        string email;
        uint aadhar;
        string pan;
        string city;
        uint pincode;
        string policeStation;
        string description;
        string complaintDocument;
        string status;
        uint timestamp;
    }

    mapping(string => FIR_Document) public FIR_Documents;
    uint public FIR_DocumentsCount;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function createFIR(
        string memory _name,
        uint _phone,
        string memory _email,
        uint _aadhar,
        string memory _pan,
        string memory _city,
        uint pincode,
        string memory _policeStation,
        string memory _description,
        string memory _complaintDocument,
        string memory _status
    ) public {
        require(msg.sender == owner, "Only owner can create FIR");
        FIR_DocumentsCount++;
        FIR_Documents[_email] = FIR_Document(
            _name,
            _phone,
            _email,
            _aadhar,
            _pan,
            _city,
            pincode,
            _policeStation,
            _description,
            _complaintDocument,
            _status,
            block.timestamp
        );
    }

    function updateFIR(
        string memory _email,
        string memory _complaintDocument,
        string memory _status
    ) public {
        require(msg.sender == owner, "Only owner can update FIR");
        FIR_Documents[_email].complaintDocument = _complaintDocument;
        FIR_Documents[_email].status = _status;
    }

    function updateAdmin(address newAdmin) public {
        require(msg.sender == owner, "Only owner can update FIR");
        owner = newAdmin;
    }

    function getFIRDocument(
        string memory _email
    ) public view returns (FIR_Document memory) {
        return FIR_Documents[_email];
    }

    function getFIRDocumentsCount() public view returns (uint) {
        return FIR_DocumentsCount;
    }

    function getFIRDocumentStatus(
        string memory _email
    ) public view returns (string memory) {
        return FIR_Documents[_email].status;
    }

    function getFIRDocumentComplaintDocument(
        string memory _email
    ) public view returns (string memory) {
        return FIR_Documents[_email].complaintDocument;
    }
}
