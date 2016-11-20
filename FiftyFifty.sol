pragma solidity ^0.4.2;

//Keeping a reference to a library in case I want to extend in future
import "ConvertLib.sol";

contract FiftyFifty {

  // Event for notifying that the transfer has completed
	event TransferEvent(address indexed _from, address indexed _toRec1, address indexed _toRec2, uint256 _value);

	function FiftyFifty() {
		 // No code required for the constructor
	}

	function splitProceeds(address recAddr1,address recAddr2) payable returns(uint balance) {
		if (!recAddr1.send(msg.value/2) || !recAddr2.send(msg.value/2) )
				throw; // also reverts the transfer to Sharer
				TransferEvent(msg.sender, recAddr1, recAddr2, msg.value/2);
		return address(this).balance;
	}

	function getContractBalance() returns(uint) {
	   return address(this).balance;
	}
}
