import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import useExpenseTracker from "../context/useExpenseTracker";

import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

import AddIncomeModal from "../components/Income/AddIncomeModal";
import IncomeCard from "../components/Income/IncomeCard";
import IncomeBarChart from "../components/Income/IncomeBarChart";
import { useDispatch, useSelector } from "react-redux";
import { getAllIncomes, getLast30DaysIncomes } from "../slices/incomeSlice";
const Income = () => {
  const { incomes, last30DaysIncomes, error, loading } = useSelector(
    (state) => state.income
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    dispatch(getAllIncomes());
    dispatch(getLast30DaysIncomes());
  }, [dispatch]);

  const navigate = useNavigate();
  const handleOpen = () => {
    setOpen(!open);
  };

  if (error)
    return (
      <DashboardLayout activeMenu={"Income"}>
        <p className="text-red-600 text-sm p-3">Error: {error.message}</p>;
      </DashboardLayout>
    );

  return (
    <DashboardLayout activeMenu={"Income"}>
      <div className=" px-3 sm:px-6  rounded-md  mx-auto w-full ">
        <div className="flex items-center justify-between py-4">
          <h1 className="py-2 font-bold"></h1>
          <button
            onClick={handleOpen}
            className="px-2 py-1  rounded-md bg-purple-600 text-slate-50 hover:bg-purple-700 flex items-center justify-between text-sm"
          >
            Add Income
          </button>
        </div>
        {open && <AddIncomeModal open={open} onClose={() => setOpen(false)} />}

       
          <>
            {last30DaysIncomes.length > 0 && (
              <div className="my-4 h-[450px]  w-full bg-white p-2 rounded-md z-20">
                <h1 className="font-bold text-xl p-3">
                  Last 30 Days Income Overview
                </h1>
                <IncomeBarChart incomeData={last30DaysIncomes} />
              </div>
            )}
            <div className="bg-white rounded-md p-4">
              <h1 className="py-6 px-3 text-xl  font-bold underline ">
                All Incomes
              </h1>
              {incomes.length === 0 ? (
                <p>No Incomes added yet.</p>
              ) : (
                <ul className="space-y-5">
                  {incomes.map((item, index) => (
                    <IncomeCard key={index} item={item} />
                  ))}
                </ul>
              )}
            </div>
          </>
       
      </div>
    </DashboardLayout>
  );
};

export default Income;
