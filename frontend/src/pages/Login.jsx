import React, { useEffect } from 'react'
import { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import { Navigate, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'


function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isLoading, isSuccess, message, isError } = useSelector((state) => state.auth)

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }


    const onSubmit = (e) => {
        e.preventDefault()


        const userData =
        {
            email,
            password
        }

        dispatch(login(userData))

        navigate('/')

    }

    useEffect(() => {
        if (isError) {
            toast.error(message)

        }

        // Redirect logged in
        if (isSuccess || user) {
            < Navigate to='/' />

        }

        dispatch(reset())

    }, [isError, isSuccess, user, message, navigate, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>
                    Please Log in to get Support
                </p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit} >

                    <div className='form-group'>
                        <input required type="email" placeholder='Enter Your Email' className='form-control' id='email' name='email' value={email} onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <input required type="password" placeholder='Enter Your Password' className='form-control' id='password' name='password' value={password} onChange={onChange} />
                    </div>

                    <div className='form-group'>
                        <button className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>


        </>
    )
}

export default Login