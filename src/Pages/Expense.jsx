import React, { useState, useEffect } from "react";

const Expense = () => {
  const [amount, setAmount] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [expenseEntries, setExpenseEntries] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    // Load expense entries from local storage on component mount
    const storedExpenseEntries = JSON.parse(
      localStorage.getItem("expenseEntries")
    );
    if (storedExpenseEntries) {
      setExpenseEntries(storedExpenseEntries);
    }

    // Load total expenses from local storage
    const storedTotalExpenses = JSON.parse(
      localStorage.getItem("totalExpenses")
    );
    if (storedTotalExpenses) {
      setTotalExpenses(storedTotalExpenses);
    }
  }, []);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleExpenseNameChange = (event) => {
    setExpenseName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new expense entry object
    const newEntry = {
      expenseName,
      amount: parseFloat(amount), // Convert amount to a number (optional)
    };

    // Add the new entry to the expenseEntries array
    setExpenseEntries([...expenseEntries, newEntry]);

    // Update the total expenses
    const updatedTotalExpenses = totalExpenses + newEntry.amount;
    setTotalExpenses(updatedTotalExpenses);

    // Clear the input fields
    setExpenseName("");
    setAmount("");

    // Save the updated expenseEntries and totalExpenses to local storage
    localStorage.setItem(
      "expenseEntries",
      JSON.stringify([...expenseEntries, newEntry])
    );
    localStorage.setItem("totalExpenses", JSON.stringify(updatedTotalExpenses));
  };

  const handleRemoveExpense = (index) => {
    // Get the removed entry amount
    const removedAmount = expenseEntries[index].amount;

    // Deduct the removed amount from the total expenses
    const updatedTotalExpenses = totalExpenses - removedAmount;
    setTotalExpenses(updatedTotalExpenses);

    // Remove the entry from the expenseEntries array
    const updatedExpenseEntries = [...expenseEntries];
    updatedExpenseEntries.splice(index, 1);
    setExpenseEntries(updatedExpenseEntries);

    // Save the updated expenseEntries and totalExpenses to local storage
    localStorage.setItem(
      "expenseEntries",
      JSON.stringify(updatedExpenseEntries)
    );
    localStorage.setItem("totalExpenses", JSON.stringify(updatedTotalExpenses));
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-2 w-full max-w-sm">
        <label htmlFor="expenseName" className="block font-medium">
          Expense Name:
        </label>
        <input
          type="text"
          id="expenseName"
          value={expenseName}
          onChange={handleExpenseNameChange}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
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
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
        />
        <button
          type="submit"
          className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Add Expense
        </button>
      </form>

      <div className="mt-4 w-full max-w-sm">
        {/* Expense Entries panel */}
        <h3 className="text-xl font-bold">Expense Entries:</h3>
        <ul>
          {expenseEntries.map((entry, index) => (
            <li key={index} className="flex items-center justify-between">
              <span>{entry.expenseName}</span>
              <span>${entry.amount.toFixed(2)}</span>
              <button
                onClick={() => handleRemoveExpense(index)}
                className="p-1 m-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 w-full max-w-sm">
        {/* Total Expenses panel */}
        <h3 className="text-xl font-bold">Total Expenses:</h3>
        <p className="text-2xl font-semibold">${totalExpenses.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Expense;
