import React from 'react'
import Passop from './Passop'

const Navbar = () => {
  return (
    <nav className=''>
        <ul className=' flex justify-around items-center bg-slate-600 text-white h-12'>
            <Passop/>
            <div className='border-2 border-white flex justify-center items-center gap-2 bg-green-600 px-2 py-1 rounded-full font-bold'>
              <img className='invert' width={25} src="icons/github.svg" alt="github logo" />
              <div><a href="/">GitHub</a></div>
            </div>
        </ul>
    </nav>
  )
}

export default Navbar
