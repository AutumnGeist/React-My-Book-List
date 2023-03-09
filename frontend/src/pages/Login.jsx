import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Form, FloatingLabel } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { login, reset } from '../features/user/userSlice'
import Spinner from '../components/Spinner'
import decorImg from '../images/decor-short.png'

function Login() {
  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
    //check form
    if (validateForm(e)) {
      const userData = {
        email,
        password
      }
      dispatch(login(userData))
    }
  }

  const validateForm = (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
      console.log("form validation error")
      setValidated(true)
      return false
    } else {
      setValidated(false)
      return true
    }
  }

  if(isLoading) {
    return <Spinner />
  }

  return (
    <div className="container">
      <section className="page-heading">
        <h1 className="page-title">Login</h1>
        <img src={decorImg} alt="decor img" className="decor-img" />  
      </section>

      <section>
        {/* <h3>Login to access your book list</h3> */}
        <Form validated={validated} onSubmit={onSubmit}>
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
              />
            </FloatingLabel>
          </div>
          <div className="form-group login-btns centered">
            <Button variant="dark" type="submit" size="lg" className="loginBtn">
              Submit
            </Button>
            <Link to='/forgotpw' className="forgotLink">
              Forgot Password?
            </Link>
          </div>
        </Form>
      </section>
    </div>
  )
}

export default Login