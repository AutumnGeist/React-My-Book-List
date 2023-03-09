import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, FloatingLabel } from 'react-bootstrap'
import { toast } from "react-toastify"
import { useSelector, useDispatch } from "react-redux"
import { forgotPassword, reset } from '../features/user/userSlice'
import decorImg from '../images/decor-short.png'

function ForgotPW() {
    const [email, setEmail] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { isSuccess, isError, message } = useSelector((state) => state.user)

    useEffect(() => {
        if (isError) {
          toast.error(message)
        } else if (isSuccess) {
          toast.success('Email sent!')
          setTimeout(() => {
            navigate("/login")
          }, 2000)
        }
        dispatch(reset());
    }, [isSuccess, isError, message, navigate, dispatch])
    
    //send email with reset password link to user email
    const onSubmit = async (e) => {
        e.preventDefault()      
        dispatch(forgotPassword({email}))
    }

    return (
    <div className="container">
        <section className="page-heading">
            <h1 className="page-title">Forgot Password</h1>
            <img src={decorImg} alt="decor img" className="decor-img" />
        </section>
        <h5 style={{fontFamily: 'Grenze', paddingBottom: '2%'}}>Enter your email address to receive a password reset link</h5>
        <Form onSubmit={onSubmit}>
            <div className="form-group">
                <FloatingLabel label="Email Address">
                    <Form.Control 
                        required
                        type="email" 
                        placeholder="email" 
                        className="floating-input"
                        value={email || ''} 
                        onChange={(e) => setEmail(e.target.value)} />
                </FloatingLabel>
            </div>
            <Button type="submit" variant="dark" size="lg" className="loginBtn">Submit</Button>
        </Form>
    </div>
  )
}

export default ForgotPW