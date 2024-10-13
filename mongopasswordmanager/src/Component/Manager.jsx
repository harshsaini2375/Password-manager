import React, { useState, useEffect, useRef } from 'react'
import Passop from './Passop'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { FSWatcher } from 'vite';


const Manager = () => {

  const [form, setform] = useState({})
  const [formarray, setformarray] = useState([])
  let idref = useRef(0)

  const getpassword = async () => {
    let req = await fetch("http://localhost:3000/")
    let result = await req.json()
    console.log(result)
    setformarray(result)
  }


  useEffect(() => {
    getpassword();
  }, [])


  const handlechange = (e) => {
    // this adds a new kew in the object when input field changes
    idref.current = idref.current + 1
    console.log(idref.current)
    setform({ ...form, [e.target.name]: e.target.value, key: idref.current })

  }

  const handlesave = async () => {

    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      setformarray([...formarray, form])
      // we do localstorage here instead of makinng functions so that we can pass directlt [...formarray, form]
      // in set item bcz when we pass formarray(state) it take time to update and do not store properly

      // localStorage.setItem("localpassword", JSON.stringify([...formarray, form]))

      await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })

      setform({ site: "", username: "", password: "", key: idref.current })
    }

    else {
      alert("Input invalid!")
      setform({ site: "", username: "", password: "", key: idref.current })

    }

  }

  const handleedit = async(id, site, username, password) => {
    let index = formarray.findIndex((item) => {
      return item._id === id
    })

    let arr = [...formarray]
    for (let i = index; i < (arr.length) - 1; i++) {

      arr[i] = arr[i + 1]
    }
    arr.length = arr.length - 1
    setformarray(arr)

    // localStorage.setItem("localpassword", JSON.stringify(arr))

    await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: username }) })


    setform({ site: site, username: username, password: password, key: idref.current });

  }

  const handledelete = async (e, id, username) => {

    let c = confirm("sure! you want to delete it")

    if (c) {
      let arr = [...formarray]

      let index = formarray.findIndex((item) => {
        return item._id === id
      })

      for (let i = index; i < (arr.length) - 1; i++) {

        arr[i] = arr[i + 1]
      }
      arr.length = arr.length - 1
      setformarray(arr)

      // localStorage.setItem("localpassword", JSON.stringify(arr))

      await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: username }) })

    }

  }

  const handlecopy = (text) => {

    // delete bounce key
    toast('Copied to the clipboard!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    navigator.clipboard.writeText(text);
  }





  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />

      {/* background of checkboxes*/}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>

      <div className='  cont   h-[91vh] xl:h-[84vh] xl:w-[60vw] w-[95vw] m-auto max-lg:p-2 max-xl:p-10 xl:pt-10'>
        <div className="head flex flex-col  items-center ">
          <div><Passop /></div>
          <span>Your Own Password Manager</span>
        </div>
        <div className="input px-3 max-lg:w-[95vw] max-lg:p-0 max-lg:flex max-lg:flex-col max-lg:items-center   ">
          {console.log(formarray)}


          <input value={form.site} name='site' onChange={handlechange} className='sitename border border-green-400 rounded-full w-full max-lg:w-11/12 mt-3 px-4 py-1' type="text" placeholder='Enter Website URl' />

          <div className='passname flex gap-10 max-lg:gap-3 my-6 max-lg:justify-center'>

            <input value={form.username} name='username' onChange={handlechange} className='username border border-green-400 rounded-full w-[46vw] max-lg:w-[45%] px-4 py-1' type="text" placeholder='Enter Username' />

            <input value={form.password} name='password' onChange={handlechange} className='password border border-green-400 rounded-full max-lg:w-[43%] px-4 py-1' type="password" placeholder='Enter Password' />

          </div>
        </div>
        <div className="btn flex justify-center font-bold ">
          <button onClick={handlesave} className='flex items-center gap-2 border border-black rounded-full px-4 py-1 bg-green-300'>
            <img width={20} src="icons/add-folder.png" alt="add" />
            <span>Save</span>
          </button>

        </div>
        <div className='yourpasswords font-bold my-5 text-lg'>Your Passwords</div>

        {formarray.length === 0 && <div>No passwords to show.</div>}



        {formarray.length !== 0 && <div className="header max-lg:text-xs border border-black flex xl:w-[60vw] py-2 px-3 justify-between bg-green-600 text-white font-bold rounded-t-xl w-[95vw]">
          <span className=" w-2/5 text-center">Site</span>
          <span className=" w-1/5 text-center">Username</span>
          <span className=" w-1/5 text-center">Password</span>
          <span className=" w-1/5 text-center">Actions</span>
        </div>
        }



        {formarray.map((item) => {
          return (
            <div key={[item._id, item.key]} className=" list h-fit max-lg:text-xs flex justify-between py-2 px-3 xl:w-[60vw] w-[95vw] bg-green-100">

              <span className="Site flex justify-center items-center gap-2 border-x-2 border-white h-full  w-2/5 ">
                <div className='break-words w-4/5'>{item.site}</div>
                <div className='cursor-pointer max-lg:hidden ' onClick={() => { handlecopy(item.site) }} ><img width={20} src="icons/copy.svg" alt="copybtn" /></div>
              </span>

              <span className="Site flex justify-center items-center gap-2 border-x-2 border-white h-full  w-1/5 ">
                <div className='break-words w-4/5'>{item.username}</div>
                <div className='cursor-pointer max-lg:hidden ' onClick={() => { handlecopy(item.username) }}><img width={20} src="icons/copy.svg" alt="copybtn" /></div>
              </span>

              <span className="Site flex justify-center items-center gap-2 border-x-2 border-white h-full  w-1/5 ">
                <div className='break-words w-4/5'>{item.password}</div>
                <div className='cursor-pointer max-lg:hidden ' onClick={() => { handlecopy(item.password) }}><img width={20} src="icons/copy.svg" alt="copybtn" /></div>
              </span>

              <span className="Actions border-x-2 border-white  w-1/5  flex max-lg:gap-1 gap-5 justify-center">
                <button onClick={() => { handleedit(item._id, item.site, item.username, item.password) }}>
                  <img className='cursor-pointer' width={20} src="icons/edit.svg" alt="edit" />
                </button>

                <button onClick={(e) => { handledelete(e, item._id, item.username) }}>
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
