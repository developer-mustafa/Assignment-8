
import { useState } from "react";

const TransactionForm = ({ onSubmit, buttonText }) => {
  
  const [amount, setAmount] = useState("");

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(amount);
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="amount">Amount:</label>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={handleAmountChange}
        required
      />
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default TransactionForm;
