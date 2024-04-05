import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

const Transactions = () => {
  const { transactions } = useContext(TransactionContext);

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex flex-col p-4">
        <div className="text-white text-3xl text-center mb-4">
          Latest Transactions
        </div>
        <div className="flex flex-col gap-4">
          {transactions.map((transaction, index) => (
            <div key={index} className="bg-[#181918] p-4 rounded-md shadow-md">
              <p className="text-white">From: {transaction.addressFrom}</p>
              <p className="text-white">To: {transaction.addressTo}</p>
              <p className="text-white">Amount: {transaction.amount} ETH</p>
              {transaction.message && (
                <p className="text-white">Message: {transaction.message}</p>
              )}
              <p className="text-[#37c7da] font-bold">{transaction.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
