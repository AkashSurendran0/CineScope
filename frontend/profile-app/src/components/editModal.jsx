import { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function EditUserModal({showModal, userDetails}) {
    const [formData, setFormData] = useState({
        name: userDetails.name,
        image:''
    });
    const [formErrors, setFormErrors]=useState({
        name:'',
    })
    const [imagePreview, setImagePreview] = useState(null);
    const [checkImage, setCheckImage] = useState(false)

    // useEffect(()=>{
    //     user.image? setImagePreview(user.image):''
    // }, [])


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setCheckImage(true)
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleClose = () => {
        showModal()
    };

    const validateForm = () =>{
        const {name, image}=formData
        if(name.trim()=='' || name.length<=3) return {success:false, message:'Please enter a valid name', field:'name'}
        if (checkImage && image.name.trim()) {
            const imageRegex = /\.(jpg|jpeg|png|gif|webp)$/i;
            if (!imageRegex.test(image.name)) {
                return { success: false, message: 'Image must be a valid format (jpg, png, etc)', field:'image' };
            }
        }
        return {success:true}
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response=validateForm()
        if(response.success){
            if(formData.image){
                const editForm=new FormData()
                editForm.append('file', formData.image)
                editForm.append('upload_preset', 'cinescope_uploads')
                const response=await axios.post(`https://api.cloudinary.com/v1_1/djhmcbiq9/image/upload`, editForm)
                formData.image=response.data.secure_url
            }
            const submitResponse=await axios.post('http://localhost:5000/users/editUser', formData, {
                withCredentials:true,
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            if(submitResponse.data.success){
                window.location.reload()
            }else{
                toast.error(submitResponse.data.message)
            }
        }else{
            setFormErrors({
                [response.field]: [response.message]
            });
        }
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Edit User</h2>
            <button 
                onClick={handleClose} 
                className="text-gray-500 hover:text-gray-700 transition duration-150"
            >
                <X size={20} />
            </button>
            </div>
            
            <div className="p-6">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                Profile Image
                </label>
                <div className="flex items-center justify-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 border border-gray-300 mb-2">
                    {imagePreview ? (
                    <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                    />
                    ) : (
                    <div className="flex items-center justify-center h-full">
                        <Upload className="text-gray-400" size={24} />
                    </div>
                    )}
                </div>
                </div>
                <div className="flex justify-center">
                <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm">
                    Choose File
                    <input 
                    type="file" 
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                    />
                </label>
                </div>
                <p className='text-red-500'>{formErrors.image}</p>
            </div>
            
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
                Name
                </label>
                <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={userDetails.name}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className='text-red-500'>{formErrors.name}</p>
            </div>
            
            <div className="flex justify-end space-x-2">
                <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-150"
                >
                Cancel
                </button>
                <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-150"
                >
                Save Changes
                </button>
            </div>
            </div>
        </div>
        </div>
    );
}