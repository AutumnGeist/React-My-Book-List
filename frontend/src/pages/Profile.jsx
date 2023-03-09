import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { Image, Form, Button, Collapse, Col, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { MdAddBox } from "react-icons/md";
import { update, deleteUser, logout } from '../features/user/userSlice'
import { getBooks, reset } from '../features/book/bookSlice'
import { selectFaveBooks, selectFaveAuthors } from '../features/book/customSelectors'
import Spinner from '../components/Spinner'
import decorImg from '../images/decor-long.png'
import libraryImg from '../images/library.png'

function Profile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user, isSuccess} = useSelector((state) => state.user)
    const userMessage = useSelector((state) => state.user.message)
    const {books, isLoading, isError, message} = useSelector((state) => state.book)
    const faveAuthors = useSelector(selectFaveAuthors)
    const faveBooks = useSelector(selectFaveBooks)
    const [bookStats, setBookStats] = useState({})
    const [bookPercent, setBookPercent] = useState({})
    const [nameForm, setNameForm] = useState(false)
    const [emailForm, setEmailForm] = useState(false)
    const [passwordForm, setPasswordForm] = useState(false)
    const [deleteForm, setDeleteForm] = useState(false)
    const [formData, setFormData] = useState({
      name: user.name,
      email: user.email,
      password: null,
      password2: null
    })
    
    //get user books from redux state/DB
    useEffect(() => {
      if(isError) {
          toast.error(message)
      }
      dispatch(getBooks())
      return () => {
          dispatch(reset)
      }
  }, [isError, isSuccess, message, dispatch])

    //calculate status statistics of book state
    useEffect(() => {
      let stats = {
        total: 0,
        reading: 0,
        completed: 0,
        holding: 0,
        planning: 0,
        dropped: 0
      }
      let percents = {
        reading: 0,
        completed: 0,
        holding: 0,
        planning: 0,
        dropped: 0
      }
      //calculate stats
      for(let b in books) {
        switch(books[b].status) {
          case 'Completed':
            stats.completed += 1
            break
          case 'Reading':
            stats.reading += 1
            break
          case 'On-Hold':
            stats.holding += 1
            break
          case 'Plan to Read':
            stats.planning += 1
            break
          case 'Dropped':
            stats.dropped += 1
            break
          default:
            break
        }
        stats.total = books.length
        setBookStats(stats)

        //calculate percentages
        const calcPercent = (num) => {
          return num / stats.total * 100
        }
        percents.completed = calcPercent(stats.completed)
        percents.reading = calcPercent(stats.reading)
        percents.holding = calcPercent(stats.holding)
        percents.planning = calcPercent(stats.planning)
        percents.dropped = calcPercent(stats.dropped)
        setBookPercent(percents)
      }
    }, [books])

    const onChange = (e) => {
      setFormData(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value
      }))
    }
    
    const onSubmit = (e) => {
      e.preventDefault()
      //check if changing password
      if(formData.password !== null) {
        //verify the passwords match
        if(formData.password !== formData.password2) {
          console.log("Error: passwords do not match!")
        }
      }
      //update
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      }
      dispatch(update({id: user._id, userData: userData}))
      if(isSuccess) {
        toast.success(userMessage)
      }
      setNameForm(false)
      setEmailForm(false)
      setPasswordForm(false)
      setDeleteForm(false)
      setFormData({...formData, password: null, password2: null})
    }

    //delete user account & logout user
    const onDelete = () => {
      dispatch(deleteUser(user._id))
      dispatch(logout())
      dispatch(reset())
      navigate('/')
    }

    if(isLoading) {
      return <Spinner />
    }
  
    return (
    <>
    
    <div className="container">
        <section className="pb-3 centered w-100">
          <h1 className="profile-title">Profile</h1>
          <img src={decorImg} alt="decor img" className="decor-img center"/>
        </section>
      
        <section className="profile">
          <Row className="w-100 d-flex justify-content-center">
          <Col xl={3} lg={2} md={12} sm={12} className="col1">
            <div className="profilePic">
              <h1>My Book List</h1>
              <Image fluid src={libraryImg} alt="default profile pic" id="profileImg" />
            </div>
            <div className="userInfo center">
              <h3 className="center">User Info</h3>
              <div className="text-left">
                <p><strong>Username:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </div>
            </div>
            <div className="settings">
              <h3 className="center">Settings</h3>
                <button className="settings-btn text-left" onClick={() => setNameForm(!nameForm)}>Change Username</button>
              <Collapse in={nameForm}>
                <div>
                  <Form onSubmit={onSubmit} className="settingsForm">
                      <Form.Group className="h-form">
                        <Form.Control type="text" name="name" value={formData.name || ''} onChange={onChange} />
                        <Button type="submit" variant="dark" size="sm">Submit</Button>
                      </Form.Group>
                  </Form>
                </div>
              </Collapse>
                <button className="settings-btn text-left" onClick={() => setEmailForm(!emailForm)}>Change Email</button>
              <Collapse in={emailForm}>
                <div>
                  <Form onSubmit={onSubmit} className="settingsForm">
                    <Form.Group className="h-form">
                      <Form.Control type="email" name="email" value={formData.email || ''} onChange={onChange} />
                      <Button type="submit" variant="dark" size="sm">Submit</Button>
                    </Form.Group>
                  </Form>
                </div>
              </Collapse>
              <button className="settings-btn text-left" onClick={() => setPasswordForm(!passwordForm)}>Reset Password</button>
              <Collapse in={passwordForm}>
                <div>
                  <Form onSubmit={onSubmit}  className="settingsForm">
                      <Form.Label className="pr-label" style={{fontSize:'10px'}}>New Password:</Form.Label>
                      <Form.Control type="password" name="password" value={formData.password || ''} onChange={onChange} />                    
                      <Form.Label className="pr-label" style={{fontSize:'10px'}}>Confirm New Password:</Form.Label>
                        <Form.Control type="password" name="password2" value={formData.password2 || ''} onChange={onChange} />
                      <Button type="submit" variant="dark" className="w-100 mt-1">Submit</Button>                  
                  </Form>
                </div>
              </Collapse>

              <button className="settings-btn text-left" onClick={() => setDeleteForm(!deleteForm)}>Delete Account</button>
              <Collapse in={deleteForm}>
                <div>
                  <div className="center settingsForm">
                      <label className="pb-2">Are you sure?</label>
                      <p>Your book list will be lost.</p>
                      <Button type="submit" variant="danger" onClick={onDelete}>Confirm Delete</Button>
                  </div>
                </div>
              </Collapse>
            </div>
          </Col>

          <Col xl={8} lg={7} md={12} sm={12} className="col2">
            <div className="statistics">
              <h3>Statistics</h3>
              <div className="stats-bar">
                <div className="stats completed" style={{width: `${bookPercent.completed}%`}}></div>
                <div className="stats reading" style={{width: `${bookPercent.reading}%`}}></div>
                <div className="stats planning" style={{width: `${bookPercent.planning}%`}}></div>
                <div className="stats holding" style={{width: `${bookPercent.holding}%`}}></div>
                <div className="stats dropped" style={{width: `${bookPercent.dropped}%`}}></div>
              </div>
              <Row className="legend">
                <Col md={4} sm={12}>
                  <div className="legend-item">
                    <p>Total Books: {bookStats.total}</p>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color completed"></div>
                    <p>Completed: {bookStats.completed}</p>
                  </div>
                </Col>
                <Col md={4} sm={12} >
                  <div className="legend-item">
                    <div className="legend-color reading"></div>
                    <p>Reading: {bookStats.reading}</p>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color planning"></div>
                    <p>Planning to Read: {bookStats.planning}</p>
                  </div>
                </Col>
                <Col md={4} sm={12} >
                  <div className="legend-item">
                    <div className="legend-color holding"></div>
                    <p>On-Hold: {bookStats.holding}</p>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color dropped"></div>
                    <p>Dropped: {bookStats.dropped}</p>
                  </div>
                </Col>
              </Row>
            </div>
              <div className="favBooks">
                <h3>Favorite Books</h3>               
                <div className="fave-images">
                  {faveBooks.map(book => <img src={book.image} key={book._id} alt="book cover img" className="fave-img" />)}
                </div>
              </div>
              <div className="favAuthors">
                <h3>Favorite Authors</h3>
                {faveAuthors.map(author => <p key={author}>{author}</p>)}
              </div>
          </Col>
          </Row>
        </section>
    </div>
    </>
  )
}

export default Profile