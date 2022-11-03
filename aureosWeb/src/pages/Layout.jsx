import React from 'react'
import {Outlet} from 'react-router-dom';


function Layout() {
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
        <h1 className='text-center text-6xl uppercase font-bold text-teal-700 my-5'>Áureos</h1>
        <p className='uppercase font-semibold text-2xl my-5'>Toma un descanso</p>
        <main className='bg-white p-10 text-center shadow-2xl rounded-lg w-1/2'>
            <Outlet/>
        </main>
    </div>
  )
}

export default Layout
