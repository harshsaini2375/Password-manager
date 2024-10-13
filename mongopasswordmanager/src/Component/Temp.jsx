import React, { useState, useEffect } from 'react'
import Passop from './Passop'
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {

  const [site, setsite] = useState('')
  const [user, setuser] = useState('')
  const [pass, setpass] = useState('')

  const [mainarr, setmainarr] = useState([])

  // useEffect(() => {

  // }, [third])


  const handlesitename = (e) => {
    setsite(e.target.value)
  }

  const handleusername = (e) => {
    setuser(e.target.value)

  }

  const handlepassword = (e) => {
    setpass(e.target.value)

  }

  const handlesave = () => {
    setmainarr([...mainarr, { sitename: site, username: user, password: pass, key: uuidv4() }])
    setsite('')
    setuser('')
    setpass('')
    console.log(mainarr)

  }

  const handleedit = () => {
    console.log('gh')

  }

  const handledelete = (e) => {

    let id = e.name
    let index = mainarr.findIndex((item) => {
      return item.key === id
    })

    let arr = [...mainarr]
    for (let i = index; i < (arr.length) - 1; i++) {

      arr[i] = arr[i + 1]
    }
    arr.length = arr.length - 1
    
    setmainarr(arr)

  }




  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
      <div className=' cont  h-[87vh] w-[60vw] m-auto pt-10'>
        <div className="head flex flex-col  items-center ">
          <div><Passop /></div>
          <span>Your Own Password Manager</span>
        </div>
        <div className="input px-3">
          <input className='sitename border border-green-400 rounded-full w-full mt-3 px-4 py-1' type="text" placeholder='Enter Website URl' value={site} onChange={handlesitename} />
          <div className='passname flex gap-10 my-6'>
            <input className='username border border-green-400 rounded-full w-[46vw] px-4 py-1' type="text" placeholder='Enter Username' value={user} onChange={handleusername} />
            <input className='password border border-green-400 rounded-full px-4 py-1' type="password" placeholder='Enter Password' value={pass} onChange={handlepassword} />
          </div>
        </div>
        <div className="btn flex justify-center font-bold ">
          <button onClick={handlesave} className='flex items-center gap-2 border border-black rounded-full px-4 py-1 bg-green-300'>
            <img width={20} src="icons/add-folder.png" alt="add" />
            <span>Save</span>
          </button>
        </div>
        <div className='heading font-bold my-5 text-lg'>Your Passwords</div>

        <div className="header border border-black flex w-[60vw] py-2 px-3 justify-between bg-green-600 text-white font-bold">
          <span className=" w-2/5 text-center">Site</span>
          <span className=" w-1/5 text-center">Username</span>
          <span className=" w-1/5 text-center">Password</span>
          <span className=" w-1/5 text-center">Actions</span>
        </div>

        {mainarr.map((item) => {
          return (
            <div key={item.key} className="list   flex justify-between py-2 px-3 w-[60vw] bg-green-100">
              <span className="Site  border-x-2 border-white w-2/5 text-center">{item.sitename}</span>
              <span className="Username border-x-2 border-white  w-1/5 text-center">{item.username}</span>
              <span className="Password border-x-2 border-white  w-1/5 text-center">{item.password}</span>
              <span className="Actions border-x-2 border-white  w-1/5 text-center flex gap-5 justify-center">
                <button onClick={handleedit}>
                  <img className='cursor-pointer' width={20} src="icons/edit.svg" alt="edit" />
                </button>

                <button name={item.key} onClick={handledelete}>
                  <img className='cursor-pointer' width={20} src="icons/delete.svg" alt="delete" />
                </button>
              </span>
            </div>
          )
        }
        )}

      </div>
    </>
  )
}

export default Manager
