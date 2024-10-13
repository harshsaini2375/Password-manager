import React from 'react'
import Passop from './Passop'

const Footer = () => {
    return (
        <>
            <div className="foot flex flex-col items-center absolute bottom-0 w-screen bg-slate-800 text-white">
                <Passop />
                <div className='flex'>
                    <span>Created with</span>
                    <img width={30} src="icons/heart.svg" alt="love" />
                    <span>by Harsh</span>
                </div>
            </div>
        </>

    )
}

export default Footer
