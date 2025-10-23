import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'
import useExpenseTracker from '../../context/useExpenseTracker'
import moment from 'moment'
import axiosInstance from '../../utils/axiosInstance'
import { useNavigate, useParams } from 'react-router-dom'
import DashboardLayout from '../DashboardLayout'
import { toast } from 'react-toastify'
const EditIncomeModal = ({open, onClose}) => {
    const [source,setSource]=useState('')
    const [amount,setAmount]=useState(0)
    const [date,setDate]=useState('')
    const [error,setError]=useState('')
    const [loading,setLoading]=useState(false)
    const [income, setIncome] =useState({})
    const {setIncomes, incomes} =useExpenseTracker()
    const navigate =useNavigate()
    const {id} =useParams()
    useEffect(()=>{
     const fetchIncome = async () => {
        try {
            const res =await axiosInstance.get(`/api/incomes/${id}`)
            setSource(res.data.source)
            setAmount(res.data.amount)
            setDate(moment(res.data.date).format('YYYY-MM-DD'))
        } catch (error) {
            console.log(error)
            toast.error(error || 'failed to fetch income')
        }
     }
     fetchIncome()
    },[id])

    const handleSubmit =async (e) => {
        const incomeData ={source, amount, date}
        e.preventDefault();
      
        setError('')
        setLoading(true)
        try {
           const res =await axiosInstance.put(`/api/incomes/${id}`, incomeData)
           setIncomes(incomes.map((item)=> item._id === id ? res.data : item))
           toast.success('Income updated!')
           navigate('/income')
        } catch (error) {
            console.log(error)
            toast.error(error.message || 'failed to update!')
        }finally{
            setLoading(false)
        }
    }
  return (
    <DashboardLayout className=' flex items-center justify-center h-screen bg-slate-800/50 backdrop-blur-sm'>
        <div className='p-4 rounded-md bg-white sm:w-[60%] w-[80%] relative'>
            <div className='absolute  text-3xl text-slate-800 rounded-md -right-5 bg-slate-100 -top-5 ' >
                <MdClose/>
            </div>
            <form onSubmit={handleSubmit}>
                <h1 className='text-center  text-2xl  py-4'>Edit the Income</h1>
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
                <button disabled={loading} className='px-5 py-2 rounded-md bg-purple-600 text-slate-200 w-full mt-4 disabled:bg-purple-500 ' type='submit'>{loading ?'Editing ...':"Edit Income"}</button>
            </form>
        </div>
    </DashboardLayout>
  )
}

export default EditIncomeModal