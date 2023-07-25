import { createContext, useContext, useState } from "react";

const ExpenseContext = createContext();

export const useExpenseContext = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }) => {
  const [totalExpenses, setTotalExpenses] = useState(0);

  return (
    <ExpenseContext.Provider value={{ totalExpenses, setTotalExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};
