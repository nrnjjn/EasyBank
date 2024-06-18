import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Userhome = () => {

const [ data, setdata]=useState([])
const [ data1, setdata1]=useState('')
const [refresh,setrefresh]=useState(false)

let id=localStorage.getItem('id')
console.log(id);

let handleChange=(event)=>{
    setdata1({...data1,[event.target.name]:event.target.value})
  }


let handleSubmit1=async(event)=>{
    event.preventDefault();
    try{
    let response1=await axios.post('http://localhost:4000/user/deposite',{...data1, userId:id, process:"deposite"})
    console.log(response1);
    }
    catch(error){
        console.error('Error depositing:', error);
    }
 };

 let handleSubmit2=async(event)=>{
    event.preventDefault();
    try{
    let response1=await axios.post('http://localhost:4000/user/withdraw',{...data1, userId:id, process:"withdraw"})
    console.log(response1);
    }
    catch(error){
        console.error('Error depositing:', error);
    }
 };


  useEffect(()=>{
    const fetchData = async () =>{
        try{
            const response = await axios.get(`http://localhost:4000/user/transaction/${id}`);
            setdata(response.data);
            console.log(response.data);
        }
        catch(error){
            console.error('Error fetching data',error);
        }
    };
    fetchData();
},[refresh]);




  return (
    <div className='userhome'>
        <div className='mt-32  '>
            <div className='flex gap-5'>
                <p>Name:</p>
               <p> {data?.bal?.Name}</p>
            </div>
            <div className='flex gap-5'>
                <p className='mt-3'>Acc no:</p>
                <p className='mt-3'>{data?.bal?.accNo}</p>
            </div>
        </div>
        <div>
            <form onSubmit={handleSubmit2}>
            <div className='mt-10 flex flex-wrap justify-between w-80 ms-96'>
                <input onChange={handleChange} type="text" placeholder='Amount'  name='Amount' className='rounded placeholder:text-center' />
                <button className='bg-black text-white p-0.5 rounded'>Withdraw</button>
            </div>
            </form>
        </div>
        <div>
            <form  onSubmit={handleSubmit1}>
            <div className='mt-10 flex flex-wrap w-80 justify-between ms-96'>
                <input onChange={handleChange}  name='Amount' type="text" placeholder='Amount' className='rounded placeholder:text-center' />
                <button className='bg-black text-white p-0.5 rounded'>Deposite</button>
            </div>
            </form>
        </div>
        <div className='mt-10  ms-96 '>
                <table className='w-[500px] text-sm text-center rtl:text-right text-white '>
                    <thead className='text-xs uppercase dark:bg-gray-950/70'>
                        <tr>
                            <th scope='col' className='px-6 py-3'>
                                SLNO
                            </th>
                            <th>Balance</th>
                            <th>Amount</th>
                            <th>Transaction</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {data.trans?.map((item, index)=>(
                            <tr  className='dark:border-gray-700 bg-gray-950/40 hover:bg-slate-800/50'>
                                <td scope='row' className='px-6 py-4'>
                                   {index+1}
                                </td>
                                <td>{item?.transBalance}</td>
                                <td>{item?.Amount}</td>
                                <td>{item?.process}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
    </div>
  )
}

export default Userhome