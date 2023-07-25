import { useState, useEffect } from "react";

const Expense = () => {
  const [amount, setAmount] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [expenseEntries, setExpenseEntries] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    // Load expense entries from local storage on component mount
    const storedExpenseEntries = JSON.parse(
      localStorage.getItem("expenseEntries")
    );
    if (storedExpenseEntries) {
      setExpenseEntries(storedExpenseEntries);
    }

    // Load total income from local storage
    const storedTotalIncome = JSON.parse(localStorage.getItem("totalIncome"));
    if (storedTotalIncome) {
      setTotalIncome(storedTotalIncome);
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

    // Deduct the expense amount from the total income
    const updatedTotalIncome = totalIncome - newEntry.amount;
    setTotalIncome(updatedTotalIncome);

    // Add the new entry to the expenseEntries array
    setExpenseEntries([...expenseEntries, newEntry]);

    // Clear the input fields
    setExpenseName("");
    setAmount("");

    // Save the updated expenseEntries and totalIncome to local storage
    localStorage.setItem(
      "expenseEntries",
      JSON.stringify([...expenseEntries, newEntry])
    );
    localStorage.setItem("totalIncome", JSON.stringify(updatedTotalIncome));
  };

  const handleRemoveExpense = (index) => {
    // Get the removed entry amount
    const removedAmount = expenseEntries[index].amount;

    // Add the removed amount back to the total income
    const updatedTotalIncome = totalIncome + removedAmount;
    setTotalIncome(updatedTotalIncome);

    // Remove the entry from the expenseEntries array
    const updatedExpenseEntries = [...expenseEntries];
    updatedExpenseEntries.splice(index, 1);
    setExpenseEntries(updatedExpenseEntries);

    // Save the updated expenseEntries and totalIncome to local storage
    localStorage.setItem(
      "expenseEntries",
      JSON.stringify(updatedExpenseEntries)
    );
    localStorage.setItem("totalIncome", JSON.stringify(updatedTotalIncome));
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
        <h3 className="text-xl font-bold">Expense Entries:</h3>
        <ul>
          {expenseEntries.map((entry, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span>
                {entry.expenseName}: ${entry.amount.toFixed(2)}
              </span>
              <button
                onClick={() => handleRemoveExpense(index)}
                className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Expense;
