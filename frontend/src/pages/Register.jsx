import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { toast } from 'react-toastify'
import { register, reset } from '../features/user/userSlice'
import Spinner from '../components/Spinner'
import decorImg from '../images/decor-short.png'

function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [validated, setValidated] = useState(false)
  //local form state  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  const { name, email, password, password2 } = formData

  //get redux user state
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.user)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    //check if form is valid
    if (validateForm(e)) {
      //save to state
      const userData = {
        name,
        email,
        password
      }
      console.log(userData)
      dispatch(register(userData))
    }
  }

  const validateForm = (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
      setValidated(true)
      return false
    } else {
      //check if passwords match
      if (password !== password2) {
        toast.error("Error: passwords do not match!")
      } else {
        setValidated(false)
        return true
      }
    }
  }

  if(isLoading) {
    return <Spinner />
  }

  return (
    <div className="container">
      <section className="page-heading">
        <h1 className="page-title">Register</h1>
        <img src={decorImg} alt="decor img" className="decor-img" />
        {/* <p>Create an account to start your book list</p> */}
      </section>

      <section className="form">
        <Form validated={validated} onSubmit={onSubmit}>
          <div className="form-group">
            <FloatingLabel label="Username">
              <Form.Control
                required
                type="text"
                className="floating-input"
                id="name"
                name="name"
                value={name}
                placeholder='Enter your name'
                onChange={onChange}
              />
            </FloatingLabel>
          </div>
          <div className="form-group">
            <FloatingLabel label="Email Address">
              <Form.Control
                required
                type="email"
                className="floating-input"
                id="email"
                name="email"
                value={email}
                placeholder='Enter your email'
                onChange={onChange}
              />
            </FloatingLabel>
          </div>
          <div className="form-group">
            <FloatingLabel label="Password">
              <Form.Control
                required
                type="password"
                className="floating-input"
                id="password"
                name="password"
                value={password}
                placeholder='Enter password'
                onChange={onChange}
                autoComplete="off"
              />
            </FloatingLabel>
          </div>
          <div className="form-group">
            <FloatingLabel label="Confirm Password">
              <Form.Control
                required
                type="password"
                className="floating-input"
                id="password2"
                name="password2"
                value={password2}
                placeholder='Confirm password'
                onChange={onChange}
                autoComplete="off"
              />
            </FloatingLabel>
          </div>
          
          <div className="form-group center">
            <Button variant="dark" type="submit" size="lg" className="loginBtn">
              Submit
            </Button>
          </div>
        </Form>
      </section>
    </div>
  )
}

export default Register