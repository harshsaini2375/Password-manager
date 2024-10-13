import React from 'react'

const Passop = () => {
    return (
        <>
            <div className='w-28 relative flex justify-center items-center text-green-400 text-2xl font-bold'>
                <span>&lt;</span>
                <img src="icons/Pass.svg" alt="passsvg" />
                <div className='absolute left-[90px] '>
                    <span>Op/</span>
                    <span>&gt;</span>
                </div>
            </div>
        </>
    )
}

export default Passop
