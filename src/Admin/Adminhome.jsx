import React, { useEffect, useState } from 'react'
import axios from 'axios'


const Adminhome = () => {

const [data,setData]=useState([])    
const [data1,setdata1]=useState([])
const [sts,setSts]=useState(null)
const [refresh,setrefresh]=useState(false)

let handleChange=(event)=>{
    setdata1({...data1,[event.target.name]:event.target.value})
  }

useEffect(()=>{
    const fetchData = async () =>{
        try{
            const response = await axios.get('http://localhost:4000/admin/viewusers');
            setData(response.data)
        }
        catch(error){
            console.error('Error fetching data')
        }
    };
    fetchData();
},[refresh]);


let handleSubmit=async(id)=>{
        setSts(id)

  }

  let handleSubmit1=async(id,status)=>{
    setSts(null)
    setrefresh(!refresh)
    let response1=await axios.put(`http://localhost:4000/admin/acceptusers/${id}`,{...data1, Status:status})
    console.log(response1);
 }


  return (
    <div className="landing">
            
            
            <div className="overflow-x-auto shadow-md sm:rounded-lg mt-64">
                <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-white uppercase dark:bg-gray-950/90 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-3 py-3">SLNO</th>
                            <th>NAME</th>
                            <th scope="col" className="px-3 py-3">EMAIL</th>
                            <th scope="col" className="px-3 py-3">PHONE NO</th>
                            <th scope="col" className="px-3 py-3">ADDRESS</th>
                            <th scope="col" className="px-3 py-3">DOB</th>
                            <th scope="col" className="px-3 py-3">AccNo</th>

                     
                            <th>STATUS</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item,index)=>(

                      
                            <tr key={item._id} className="dark:border-gray-700 text-white bg-gray-950/40 hover:bg-slate-800/50">
                                <td scope="row" className="px-1 py-4">{index+1}</td>
                                <td>{item.Name}</td>
                                <td>{item.Email}</td>
                                <td>{item.Phone}</td>
                               <td>{item.Address}</td>
                                <td>{new Date(item?.Dob).toLocaleDateString()}</td>
                                <td>{item.accNo}</td>
                                <td>{item.Status}</td>
                                    <>
                                        <td>
                                            <button className=" rounded w-14 h-6 text-center" onClick={() => handleSubmit(item._id)}>
                                                Accept
                                            </button>
                                            {sts === item._id &&
                                                <div className='bg-white w-[13rem] h-[6rem] mt-2 rounded-md'>
                                                    <input className='px-4 py-2 text-black' onChange={handleChange} type="text" name='accNo' placeholder='Enter ac no ' />
                                                    <button className='px-3 py-2 bg-blue-700 rounded-lg ms-14 mt-2 ' onClick={()=>(handleSubmit1(item._id,"Accepted"))}>SUBMIT</button>
                                                </div>
                                                }
                                        </td>
                                        <td>
                                            <button  onClick={()=>(handleSubmit1(item._id,"Rejected"))} className="text-black rounded w-14 h-6 text-center">
                                                Reject
                                            </button>
                                        </td>
                                    </>
                                
                            </tr>
                              ))}
                    </tbody>
                </table>
            </div>
        </div>

  )
}

export default Adminhome