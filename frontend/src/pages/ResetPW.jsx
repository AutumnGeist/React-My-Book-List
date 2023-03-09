import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import { Form, FloatingLabel, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { resetPassword, reset } from '../features/user/userSlice'
import decorImg from '../images/decor-short.png'

function ResetPW() {
  const [formData, setFormData] = useState({
    password: '',
    password2: ''
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const userID = location.pathname.split("/")[2]
  const resetToken = location.pathname.split("/")[3]
  const { isSuccess, isError, message } = useSelector((state) => state.user)

  console.log(resetToken)

  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else if (isSuccess) {
      toast.success('Password updated')
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    }
    dispatch(reset());
  }, [isSuccess, isError, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if(formData.password !== formData.password2) {
      toast.error("Error: passwords do not match!")
    }else {
      dispatch(resetPassword({id: userID, password: formData.password, resetToken: resetToken}))
    }
  }
  
  return (
    <div className="container">
      <section className="page-heading">
        <h1 className="page-title">Reset Password</h1>
        <img src={decorImg} alt="decor img" className="decor-img" /> 
      </section>

      <Form onSubmit={onSubmit}>
        <div className="form-group">
          <FloatingLabel label="New Password">
            <Form.Control
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              placeholder='Enter password'
              onChange={onChange}
              autoComplete="off"
            />
          </FloatingLabel>
        </div>
        <div className="form-group">
          <FloatingLabel label="Confirm Password">
            <Form.Control
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={formData.password2}
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
    </div>
  )
}

export default ResetPW