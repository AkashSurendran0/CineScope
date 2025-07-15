import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSidebar } from '../features/toggleSidebar'
// import { setSection } from '../../features/Home_Page/toggleSections'
import { Menu, X, Plus, UserCircle, Film, Settings } from 'lucide-react'
// import { isTokenExpired } from '../../security/jwtValidator'
// import { useNavigate } from 'react-router-dom'

function SideBar() {
    // const navigate=useNavigate()
    const dispatch=useDispatch()
    const activeSidebar=useSelector((state)=>state.toggleSidebar.value)
    // const activeSection=useSelector((state)=>state.toggleSection)

    const userItems = [
        { id: 'Reviews', icon: <Film size={20} />, name: 'Reviews' },
        { id: 'Add Review', icon: <Plus size={20} />, name: 'Add Review' },
        { id: 'Your Reviews', icon: <UserCircle size={20} />, name: 'Your Reviews' },
        { id: 'Profile', icon: <Settings size={20} />, name: 'Profile' },
    ];

    const changeSection = async (section) =>{
        // const token=JSON.parse(localStorage.getItem('userInfo'))
        // const tokenExpired=await isTokenExpired(token)
        // console.log(tokenExpired)
        // if(!tokenExpired){
        //     dispatch(setSection({section: section}))
        // }else if(tokenExpired){
        //     if(token) localStorage.removeItem('userInfo');
        //     navigate('/login')
        // }
    }

    return (
            <div className={`bg-gray-800 text-white ${activeSidebar? 'w-64':'w-20'} min-h-screen transition-all duration-300 ease-in-out flex flex-col`}>
                <div className='p-4 flex items-center justify-between'>
                    {activeSidebar && <h1 className='text-xl font-bold'>CineScope</h1>}
                    <button onClick={()=>dispatch(setSidebar())} className='p-2 rounded-md hover:bg-gray-700'>
                        {activeSidebar? <X size={20}/>:<Menu size={20}/>}
                    </button>
                </div>

                <div className='flex-1 overflow-y-auto py-4'>
                    <ul className='space-y-1'>
                        {userItems.map(item=>(
                            <li key={item.id}>
                                <button onClick={()=>changeSection(item.id)} className={`flex items-center ${activeSidebar? 'justify-start px-4':'justify-center px-2'} py-3 w-full hover:bg-gray-700 transition-colors`}>
                                    <span className='inline-flex'>{item.icon}</span>
                                    {activeSidebar && <span className='ml-3'>{item.name}</span>}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>          
    )
}

export default SideBar
