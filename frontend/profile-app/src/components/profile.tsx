import React,{useState} from 'react'
import {UserCircle, Pen} from 'lucide-react'
import Sidebar from 'sharedComp/Sidebar'
import Navbar from 'sharedComp/Navbar'
import EditUserModal from './editModal'
import { useEffect } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'

function Profile() {
    const [editModal, showEditModal]=useState(false)
    const [userDetails, setUserDetails]=useState(null)

    useEffect(()=>{
        console.log('ladingggg')
        axios.get('http://localhost:5000/users/getUserDetails', {
            withCredentials:true,
            headers:{
                Authorization:`Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(response=>{
            if(response.data.success){
                setUserDetails(response.data.user)
            }else{
                toast.error(response.data.message)
            }
        })
    },[])

    const toggleModal = () =>{
        showEditModal(!editModal)
    }

    return (
        <div>
            <Navbar/>
            <div className='flex'>
                <Sidebar/>
                <div className="bg-white flex-1 rounded-lg shadow p-6">
                    <div className='flex justify-between'>
                        <h2 className="text-lg font-medium mb-4">Profile</h2>
                        <button onClick={toggleModal} className='flex items-center gap-2 text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md transition-colors'>Edit Profile<Pen className="text-gray-600" size={20} /></button>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                                {userDetails && userDetails.image? (
                                    <img src={userDetails.image}/>
                                ):(
                                    <UserCircle className="text-gray-600" size={48} />
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input type="text" className="w-full p-2 border rounded" placeholder={userDetails && userDetails.name} disabled/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" className="w-full p-2 border rounded" placeholder={userDetails && userDetails.email} disabled/>
                            </div>
                        </div>
                    </div>
                    { editModal && 
                        <EditUserModal showModal={toggleModal} userDetails={userDetails}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile
