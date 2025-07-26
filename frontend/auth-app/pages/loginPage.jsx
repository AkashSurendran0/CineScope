import {useSelector, useDispatch} from 'react-redux'
import { setLogin } from '../features/setLogin'
import { setError, removeErrors } from '../features/loginPageErrors'
import { useRef } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'

function LoginPage() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const currentState=useSelector((state)=>state.setLogin)
    const loginErrors=useSelector((state)=>state.loginErrors)
    const signInEmailRef=useRef()
    const signInPassRef=useRef()
    const signUpNameRef=useRef()
    const signUpEmailRef=useRef()
    const signUpPassRef=useRef()
    const signUpConfirmPassRef=useRef()
    const forgotPassEmailRef=useRef()
    const forgotPassPassRef=useRef()
    const forgotPassConfirmPassRef=useRef()

    function validateLoginForm(){
        const email=signInEmailRef.current.value
        const password=signInPassRef.current.value
        const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailPattern.test(email)){
            dispatch(removeErrors())
            dispatch(setError({field:'signInEmail', message:'Please Enter a valid Email'}))
            return {success:false}
        }
        const formData={
            email:email,
            password:password
        }
        dispatch(removeErrors())
        return {success:true, formData:formData}
    }

    function validateSignInForm(){
        const name=signUpNameRef.current.value
        const email=signUpEmailRef.current.value
        const password=signUpPassRef.current.value
        const confirmPass=signUpConfirmPassRef.current.value
        const namePattern=/^[A-Za-z ]{2,50}$/
        if(!namePattern.test(name)){
            dispatch(removeErrors())
            dispatch(setError({field:'signUpName', message:'Enter a proper name'}))
            return {success: false}
        }
        const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailPattern.test(email)){
            dispatch(removeErrors())
            dispatch(setError({field:'signUpEmail', message:'Enter a proper email'}))
            return {success: false}
        }
        if(password.trim().length<5){
            dispatch(removeErrors())
            dispatch(setError({field:'signUpPass', message:'Password must be minimum 5 letters'}))
            return {success: false}
        }
        if(!/[A-Z]/.test(password)){
            dispatch(removeErrors())
            dispatch(setError({field:'signUpPass', message:'Must contain minimum one capital letter'}))
            return {success: false}
        }
        if(!/[!@#$%^&*]/.test(password)){
            dispatch(removeErrors())
            dispatch(setError({field:'signUpPass', message:'Must contain alteast one special character'}))
            return {success: false}
        }
        if(password!==confirmPass){
            dispatch(removeErrors())
            dispatch(setError({field:'signUpConfirmPass', message:'Passwords doesnt match'}))
            return {success: false}
        }
        dispatch(removeErrors())
        const formData={
            name: name,
            email: email,
            password: password
        }
        return {success: true, formData:formData}
    }

    function validateForgotPassForm(){
        const email=forgotPassEmailRef.current.value
        const password=forgotPassPassRef.current.value
        const confirmPass=forgotPassConfirmPassRef.current.value
        if(password.trim().length<5){
            dispatch(removeErrors())
            dispatch(setError({field:'forgotPassPass', message:'Password must be minimum 5 letters'}))
            return {success: false}
        }
        if(!/[A-Z]/.test(password)){
            dispatch(removeErrors())
            dispatch(setError({field:'forgotPassPass', message:'Must contain minimum one capital letter'}))
            return {success: false}
        }
        if(!/[!@#$%^&*]/.test(password)){
            dispatch(removeErrors())
            dispatch(setError({field:'forgotPassPass', message:'Must contain alteast one special character'}))
            return {success: false}
        }
        if(password!==confirmPass){
            dispatch(removeErrors())
            dispatch(setError({field:'forgotPassConfirmPass', message:'Passwords doesnt match'}))
            return {success: false}
        }
        dispatch(removeErrors())
        const formData={
            email: email,
            password: password
        }
        return {success: true, formData:formData}
    }

    const loginUser = async (e) =>{
        e.preventDefault()
        const result=validateLoginForm()
        if(result.success){
            const response=await axios.post('http://localhost:5000/users/userLogIn', result.formData, {withCredentials:true})
            if(response.data.success){
                localStorage.setItem('accessToken', response.data.token)
                toast.success(response.data.message)
                navigate('/')
            }else{
                toast.error(response.data.message)
            }
        }
    }

    const signUpUser = async (e) =>{
        e.preventDefault()
        const result=validateSignInForm()
        if(result.success){
            const response=await axios.post('http://localhost:5000/users/userSignIn', result.formData, {withCredentials:true})
            if(response.data.success){
                localStorage.setItem('accessToken', response.data.token)
                toast.success(response.data.message)
                navigate('/')
            }else{
                toast.error(response.data.message)
            }   
        }
    } 

    const changePass = async (e) =>{
        e.preventDefault()
        const result=validateForgotPassForm()
        if(result.success){
            const response=await axios.post('http://localhost:5000/users/changePass', result.formData)
            if(response.data.success){
                toast.success(response.data.message)
                dispatch(setLogin({field:'login'}))
            }else{
                toast.error(response.data.message)
            }
        }
    }

    return (
        <>
            { currentState.login &&  (
                <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                    <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="bg-gray-800 p-6">
                        <h2 className="text-2xl font-bold text-white text-center">CineScope</h2>
                        <p className="text-white text-center mt-2">Please sign in to your account</p>
                        </div>
                        
                        <form className="p-6 space-y-6" onSubmit={loginUser}>
                        <div className="space-y-1">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                            Email Address
                            </label>
                            <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none`}
                            placeholder="you@example.com"
                            ref={signInEmailRef}
                            />
                            <p className="text-sm text-red-600">{loginErrors.signInEmail}</p>

                        </div>
                        
                        <div className="space-y-1">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
                            Password
                            </label>
                            <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type='password'
                                autoComplete="current-password"
                                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none`}
                                placeholder="*********"
                                ref={signInPassRef}
                            />
                            <p className="text-sm text-red-600">{loginErrors.signInPass}</p>

                            </div>

                        </div>
                        
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                            </div>
                            
                        </div>
                        
                        <div>
                            <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-400"
                            >
                                Login
                            </button>
                        </div>
                        
                        <div className="mt-6 text-center">
                            <div className='flex justify-center items-center gap-2'>
                                <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                </p>
                                <p onClick={()=>dispatch(setLogin({field: 'signUp'}))} className="font-medium hover:text-grey-500 cursor-pointer">
                                    Sign up now
                                </p>
                            </div>
                            <div className='flex justify-center items-center gap-2'>
                                <p className="text-sm text-gray-600">
                                Forgot Password?{' '}
                                </p>
                                <p onClick={()=>dispatch(setLogin({field: 'forgotPass'}))} className="font-medium hover:text-grey-500 cursor-pointer">
                                    Click Here
                                </p>
                            </div>
                        </div>
                        </form>
                        
                    </div>
                </div>
            ) } 
            { currentState.signUp && (
                <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                    <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="bg-gray-800 p-6">
                        <h2 className="text-2xl font-bold text-white text-center">CineScope</h2>
                        <p className="text-white text-center mt-2">Please create a new account</p>
                        </div>
                        
                        <form className="p-6 space-y-6" onSubmit={signUpUser}>
                            <div className="space-y-1">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                                Name
                                </label>
                                <input
                                id="email"
                                name="email"
                                type="text"
                                autoComplete="email"
                                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none`}
                                placeholder="Abcdef"
                                ref={signUpNameRef}
                                />
                                <p className="text-sm text-red-600">{loginErrors.signUpName}</p>

                            </div>

                            <div className="space-y-1">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                                Email Address
                                </label>
                                <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none`}
                                placeholder="you@example.com"
                                ref={signUpEmailRef}
                                />
                                <p className="text-sm text-red-600">{loginErrors.signUpEmail}</p>

                            </div>
                            
                            <div className="space-y-1">
                                <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
                                Password
                                </label>
                                <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type='password'
                                    autoComplete="current-password"
                                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none`}
                                    placeholder="••••••••"
                                    ref={signUpPassRef}
                                />
                                <p className="text-sm text-red-600">{loginErrors.signUpPass}</p>

                                </div>
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
                                Confirm Password
                                </label>
                                <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type='password'
                                    autoComplete="current-password"
                                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none`}
                                    placeholder="••••••••"
                                    ref={signUpConfirmPassRef}
                                />
                                <p className="text-sm text-red-600">{loginErrors.signUpConfirmPass}</p>

                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                </div>
                                
                            </div>
                            
                            <div>
                                <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-400"
                                >
                                    Sign Up
                                </button>
                            </div>
                            
                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600">
                                Already have a account?{' '}
                                </p>
                                <p onClick={()=>dispatch(setLogin({field: 'login'}))} className="font-medium hover:text-grey-500 cursor-pointer">
                                    Log In now
                                </p>
                            </div>
                        </form>
                        
                    </div>
                </div>
            ) }
            { currentState.forgotPass && (
                <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                    <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="bg-gray-800 p-6">
                        <h2 className="text-2xl font-bold text-white text-center">CineScope</h2>
                        <p className="text-white text-center mt-2">Please create a new password</p>
                        </div>
                        
                        <form className="p-6 space-y-6" onSubmit={changePass}>

                            <div className="space-y-1">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                                Email Address
                                </label>
                                <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none`}
                                placeholder="you@example.com"
                                ref={forgotPassEmailRef}
                                />

                            </div>
                            
                            <div className="space-y-1">
                                <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
                                Password
                                </label>
                                <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type='password'
                                    autoComplete="current-password"
                                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none`}
                                    placeholder="••••••••"
                                    ref={forgotPassPassRef}
                                />
                                <p className="text-sm text-red-600">{loginErrors.forgotPassPass}</p>

                                </div>
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
                                Confirm Password
                                </label>
                                <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type='password'
                                    autoComplete="current-password"
                                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none`}
                                    placeholder="••••••••"
                                    ref={forgotPassConfirmPassRef}
                                />
                                <p className="text-sm text-red-600">{loginErrors.forgotPassConfirmPass}</p>

                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                </div>
                                
                            </div>
                            
                            <div>
                                <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-400"
                                >
                                    Change Password
                                </button>
                            </div>
                            
                            <div className="mt-6 text-center">
                            <div className='flex justify-center items-center gap-2'>
                                <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                </p>
                                <p onClick={()=>dispatch(setLogin({field: 'signUp'}))} className="font-medium hover:text-grey-500 cursor-pointer">
                                    Sign up now
                                </p>
                            </div>
                            <div className="flex justify-center items-center gap-2">
                                <p className="text-sm text-gray-600">
                                Already have a account?{' '}
                                </p>
                                <p onClick={()=>dispatch(setLogin({field: 'login'}))} className="font-medium hover:text-grey-500 cursor-pointer">
                                    Log In now
                                </p>
                            </div>
                        </div>
                        </form>
                        
                    </div>
                </div>
            )}

        </>
        
    )
}

export default LoginPage
