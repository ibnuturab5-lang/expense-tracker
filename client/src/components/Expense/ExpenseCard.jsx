import moment from "moment";

import { MdDelete, MdEdit } from "react-icons/md";

import EditExpenseModal from "./EditExpenseModal";
import { useDispatch,  } from "react-redux";
import { deleteExpense } from "../../slices/expenseSlice";
import { useState } from "react";

const ExpenseCard = ({expenses, onExpenseDeleted}) => {
    const [openEditModal, setOpenEditModal] = useState(false);
  const dispatch =useDispatch() 
  const handleDelete =async(id)=>{
    if(window.confirm('Are you sure you wanted to delete this ?')){
     await dispatch(deleteExpense(id)).unwrap();
     onExpenseDeleted()
    }
  }
  return (<>
  openEditModal && <EditExpenseModal  onClose={()=>setOpenEditModal(false)} />
    <div className="w-full bg-white rounded-md my-6 ">
    
      <h1 className="font-bold text-xl text-center p-3">Tables of All Incomes</h1>
      <table className="w-full p-3 mt-4 mx-3 overflow-x-auto">
        <thead>
          <tr className=" ">
            <th className="px-4 py-2 border ">Category</th>
            <th className="px-4 py-2 border ">Date</th>
            <th className="px-4 py-2 border ">Amount (in $)</th>
            <th className="px-4 py-2 border ">Actions</th>
          </tr>
        </thead>
        {expenses.map((expense) => (
          <tbody key={expense._id}>
            <tr className=" ">
              <td className="px-4 py-2 border">{expense.category}</td>
              <td className="px-4 py-2 border">
                {moment(expense.date).format("YYYY-MM-DD")}
              </td>
              <td className="px-4 py-2 border">{expense.amount}</td>
              <td className="px-4 py-2 border flex items-center justify-center gap-4">
                <MdEdit className="text-blue-600 cursor-pointer" />{" "}
                <MdDelete className="text-red-600 cursor-pointer" onClick={()=>handleDelete(expense._id)}/>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div></>
  );
};

export default ExpenseCard;
