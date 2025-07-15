import { LogOut, UserCircle } from 'lucide-react'
// import { useNavigate } from 'react-router-dom'

function Navbar() {
    // const navigate=useNavigate()
    const logoutUser = () =>{
        // localStorage.removeItem('userInfo')
        // navigate('/login')
    }

    return (
        <header className='bg-white shadow-sm'>
            <div className='flex items-center justify-between h-16 px-6 border-b'>
                <div className='flex items-center'>
                    <h1 className='text-xl font-semibold text-gray-800'>CineScope</h1>
                </div>

                <div className='flex items-center space-x-4'>
                    <div className='relative'>
                        <button className='flex items-center space-x-2'>
                            <div className='w-10 h-10 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center'>
                                <UserCircle className='text-gray-600' size={28}/>
                            </div>
                        </button>
                    </div>
                    <button className='flex items-center text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md transition-colors' onClick={logoutUser}>
                        <LogOut size={18}/>
                        <span className='ml-2'>Logout</span>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Navbar
