import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

const Navbar = () => {


  return (
    <div className=''>
        <div className='flex flex-wrap fixed w-[100%] justify-between  bg-black text-white p-3  text-[25px]'>
        <div className='fonts flex-1 ps-3 '>
           <button className=''> EasyBank</button>
        </div>
        <div className='flex flex-wrap  text-[20px] flex-1 justify-evenly'>
            <Link to='/'><div>
                Home
            </div></Link>
            <Link to='/register'><div>
                Register

            </div></Link>

            <Link to='/login'><div>
                Login

            </div></Link>
            
        </div>
    </div>
    <Outlet></Outlet>
    
    </div>
    
  )
}

export default Navbar