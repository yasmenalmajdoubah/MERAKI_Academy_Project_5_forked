import React from 'react'

const Settings = () => {
  return (
    <div className= "bg-white h-screen">
      <p className='font-bold'>Settings</p>
      <div className='flex justify-around '>
        {/* *** left Side *** */}
        <div className=' flex-col content-center text-center justify-center w-1/4 border-e-4'>
<p>Personal Settings</p>
<p>Account Settings</p>
        </div>
        {/* *** right side *** */}
        <div className='w-3/4'>

        </div>
      </div>
    </div>
  )
}

export default Settings