import React, { useState, useEffect } from "react";

const Income = () => {
  const [amount, setAmount] = useState("");
  const [criteria, setCriteria] = useState("");
  const [incomeEntries, setIncomeEntries] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    // Load income entries from local storage on component mount
    const storedIncomeEntries = JSON.parse(
      localStorage.getItem("incomeEntries")
    );
    if (storedIncomeEntries) {
      setIncomeEntries(storedIncomeEntries);

      // Calculate the total income from the loaded entries
      const loadedTotalIncome = storedIncomeEntries.reduce(
        (total, entry) => total + entry.amount,
        0
      );
      setTotalIncome(loadedTotalIncome);
    }
  }, []);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleCriteriaChange = (event) => {
    setCriteria(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new income entry object
    const newEntry = {
      criteria,
      amount: parseFloat(amount), // Convert amount to a number (optional)
    };

    // Add the new entry to the incomeEntries array
    setIncomeEntries([...incomeEntries, newEntry]);

    // Update the total income by adding the new amount
    const updatedTotalIncome = totalIncome + newEntry.amount;
    setTotalIncome(updatedTotalIncome);

    // Clear the input fields
    setCriteria("");
    setAmount("");

    // Save the updated incomeEntries and totalIncome to local storage
    localStorage.setItem(
      "incomeEntries",
      JSON.stringify([...incomeEntries, newEntry])
    );
    localStorage.setItem("totalIncome", JSON.stringify(updatedTotalIncome));
  };

  const handleRemoveIncome = (index) => {
    // Get the removed entry amount
    const removedAmount = incomeEntries[index].amount;

    // Deduct the removed amount from the total income
    const updatedTotalIncome = totalIncome - removedAmount;
    setTotalIncome(updatedTotalIncome);

    // Remove the entry from the incomeEntries array
    const updatedIncomeEntries = [...incomeEntries];
    updatedIncomeEntries.splice(index, 1);
    setIncomeEntries(updatedIncomeEntries);

    // Save the updated incomeEntries and totalIncome to local storage
    localStorage.setItem("incomeEntries", JSON.stringify(updatedIncomeEntries));
    localStorage.setItem("totalIncome", JSON.stringify(updatedTotalIncome));
  };

  const handleClearList = () => {
    // Clear all income entries and reset total income to 0
    setIncomeEntries([]);
    setTotalIncome(0);

    // Clear local storage entries for income
    localStorage.removeItem("incomeEntries");
    localStorage.removeItem("totalIncome");
  };

  return (
    <div className="p-4 flex flex-col items-center bg-green-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Income</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
        <label htmlFor="criteria" className="block font-medium">
          Criteria Name:
        </label>
        <input
          type="text"
          id="criteria"
          value={criteria}
          onChange={handleCriteriaChange}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <label htmlFor="amount" className="block font-medium">
          Amount:
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Income
        </button>
      </form>

      <div className="mt-4 w-full max-w-sm">
        <h3 className="text-xl font-bold">Income Entries:</h3>
        <ul>
          {incomeEntries.map((entry, index) => (
            <li key={index} className="flex items-center justify-between">
              <span>
                {entry.criteria}: ${entry.amount.toFixed(2)}
              </span>
              <button
                onClick={() => handleRemoveIncome(index)}
                className="p-1 mt-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 w-full max-w-sm">
        <h3 className="text-xl font-bold">Total Income:</h3>
        <p className="text-2xl font-semibold">${totalIncome.toFixed(2)}</p>
      </div>

      <button
        onClick={handleClearList}
        className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Clear List
      </button>
    </div>
  );
};

export default Income;
