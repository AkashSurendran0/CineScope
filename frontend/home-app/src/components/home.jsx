import React from 'react'
import Navbar from 'sharedComp/Navbar'
import Sidebar from 'sharedComp/Sidebar'

function Home() {
    return (
        <>
            <Navbar/>
            <div className='flex'>
                <Sidebar/>  
                <div>Latest Reviews</div>   
            </div>
        </>
    )
}

export default Home
