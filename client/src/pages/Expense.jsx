import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import useExpenseTracker from "../context/useExpenseTracker";
import ExpenseBarChart from "../components/Expense/ExpenseBarChart";
import ExpenseCard from "../components/Expense/ExpenseCard";
import AddExpenseModal from "../components/Expense/AddExpenseModal";


const Expense = () => {
  const { last60DaysExpenses, expenses } = useExpenseTracker();
  const [open, setOpen] = useState(false);

  return (
    <DashboardLayout activeMenu={"Expense"}>
      

      <div className="mt-4 mx-auto w-full px-3 sm:px-6">
        <div>
        
        <button
          onClick={() => setOpen(!open)}
          className="px-2 py-1.5 mb-4 text-slate-100 bg-purple-600 rounded-md hover:bg-purple-800"
        >
          Add Expense
        </button>
    
      {open && <AddExpenseModal onClose={() => setOpen(false)} />}
        </div>
       {expenses.length >0  && <div className="h-[450px] bg-white w-full p-3 rounded-md">
          <h1 className="font-bold text-xl ">Last 60 days Expense Overview</h1>
          <ExpenseBarChart expenseData={last60DaysExpenses} />
        </div>}
        {expenses.length === 0 ? (
          <p className="text-slate-500 p-3">No expenses is found!</p>
        ) : (
          <ExpenseCard expenses={expenses} onClose={()=>setOpen(false)} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Expense;
