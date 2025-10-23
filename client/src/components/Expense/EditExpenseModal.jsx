import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'

import moment from 'moment'

import { useNavigate, useParams } from 'react-router-dom'

import useExpenseTracker from '../../context/useExpenseTracker'
import axiosInstance from '../../utils/axiosInstance'
const EditExpenseModal = ({isOpen, onClose, expense}) => {
    const [source,setSource]=useState('')
    const [amount,setAmount]=useState(0)
    const [date,setDate]=useState('')
    const [error,setError]=useState('')
    const [loading,setLoading]=useState(false)
    const [Expense, setExpense] =useState({})
    const {updateExpense} =useExpenseTracker()
    const navigate =useNavigate()
   
 

    const handleSubmit =async (e) => {
        const expenseData ={source, amount, date}
        e.preventDefault();
      
        setError('')
        setLoading(true)
        try {
           await updateExpense(expense._id, expenseData)
           onClose()
           navigate('/Expense')
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center h-screen bg-slate-800/50 backdrop-blur-sm'>
        <div className='p-4 rounded-md bg-white sm:w-[60%] w-[80%] relative'>
            <div className='absolute  text-3xl text-slate-800 rounded-md -right-5 bg-slate-100 -top-5 ' >
                <MdClose onClick={onClose}/>
            </div>
            <form onSubmit={handleSubmit}>
                <h1 className='text-center  text-2xl  py-4'>Edit the Expense</h1>
                <div className='mb-4'>
                    <label htmlFor="Source" className='block mb-2'>Source</label>
                    <input type="text" placeholder='Freelance, Salary ...' className='px-4 py-2 w-full rounded-md bg-slate-300 'value={source} onChange={(e)=>setSource(e.target.value)} />
                </div>
                <div className='mb-4'>
                    <label htmlFor="Amount" className='block mb-2'>Amount</label>
                    <input type="number" placeholder='' className='px-4 py-2 w-full rounded-md bg-slate-300 'value={amount} onChange={(e)=>setAmount(e.target.value)} />
                </div>
                <div className='mb-4'>
                    <label htmlFor="Date" className='block mb-2'>Date</label>
                    <input type="date" placeholder='' className='px-4 py-2 w-full rounded-md bg-slate-300 'value={date} onChange={(e)=>setDate(e.target.value)} />
                </div>
                <button disabled={loading} className='px-5 py-2 rounded-md bg-purple-600 text-slate-200 w-full mt-4 disabled:bg-purple-500 ' type='submit'>{loading ?'Editing ...':"Edit Expense"}</button>
            </form>
        </div>
    </div>
  )
}

export default EditExpenseModal