import React, { useEffect } from 'react'
import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import { Navigate, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'



function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    const { name, email, password, password2 } = formData

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { user, isLoading, isSuccess, message, isError } = useSelector(state => state.auth)





    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }


    const onSubmit = (e) => {
        e.preventDefault()



        if (password !== password2) {
            toast.error('Passwords do not match ')
        }
        else {
            const userData = {
                name,
                email,
                password,
            }



            dispatch(register(userData))
            navigate('/')
        }
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
                    <FaUser /> Register {user}
                </h1>
                <p>
                    Please Create an Account
                </p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit} >
                    <div className='form-group'>
                        <input required type="text" placeholder='Enter Your Name' className='form-control' id='name' name='name' value={name} onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <input required type="email" placeholder='Enter Your Email' className='form-control' id='email' name='email' value={email} onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <input required type="password" placeholder='Enter Your Password' className='form-control' id='password' name='password' value={password} onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <input required type="password" placeholder='Confirm Password' className='form-control' id='password2' name='password2' value={password2} onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <button className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>


        </>
    )
}

export default Register