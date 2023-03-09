import React from 'react'
import { useState, useEffect } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {createBook, updateBook, getBooks, reset } from '../features/book/bookSlice'
import {selectFaveAuthors} from '../features/book/customSelectors'

function BookForm({book, showForm, edit}) {
    const [formData, setFormData] = useState({
        status: '',
        score: '',
        pagesRead: '',
        pageCount: '',
        startDate: '',
        endDate: '',
        faveBook: false,
        faveAuthor: false
    })
    const [validated, setValidated] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isError, isSuccess, message} = useSelector((state) => state.book)
    const faveAuthors = useSelector(selectFaveAuthors)
    const bookAuthor = book.authors.toString()
    const totalPages = book.pageCount

    //load books into state
    useEffect(() => {
        if(isError) {
            toast.error(message)
        }
        dispatch(getBooks())
        return () => {
            dispatch(reset)
        }
    }, [isError, message, dispatch])

    //check for pre-loading state values
    useEffect(() => {
        //check if editing
        if(edit) {
            setFormData(book)
        } else {
            //check if pageCount has a value
            if(book.pageCount !== '') {
                setFormData(formData => ({
                    ...formData,
                    pageCount: book.pageCount
                }))
            }
        }
    }, [edit, book])

    //check for matching favorite authors
    useEffect(() => {
        if(faveAuthors.includes(bookAuthor)) {
            setFormData(formData => ({
                ...formData,
                faveAuthor: true
            }))
        }
    }, [faveAuthors, bookAuthor])

    const onChange = e => {
        //check if status is completed, if so mark all pages as read
        if(e.target.value === 'Completed') {
            setFormData({...formData, status: e.target.value, pagesRead: totalPages})
        } else {
            setFormData(prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            }))
        }
    }

    const onSubmit = e => {
        e.preventDefault()
        if(validateForm(e)) {
            //check if editing
            if(edit) {
                //update book details
                dispatch(updateBook({id:book._id, bookData: formData}))
                navigate('/bookList')
            } else {
                //remove pageCount from bookData (prevents duplicate property)
                delete book.pageCount
                //create new object from book prop and formData
                const bookData = {...book, ...formData}
                //save to Book state
                dispatch(createBook({bookData}))
                showForm(false)
            }
        }else {
            console.log("Form is not valid")
        }
    }

    const validateForm = (e) => {
        const form = e.currentTarget
        if(form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation()
            console.log("form validation error")
            setValidated(true)
            return false             
        }else {
            setValidated(false)
            return true
        }
    }
  
    return (
    <Form validated={validated} onSubmit={onSubmit}>
        <Row>
            <Col md={4} sm={6} xs={12} className="centered" >
                    <label className="label-align">Status: </label>
            </Col>
            <Col lg={6} md={8} className="centered">
                <select required type="text" name="status" value={formData.status || ''} onChange={onChange} className="form-select">
                    <option defaultValue value="">Select status</option>
                    <option value="Reading">Reading</option>
                    <option value="Completed">Completed</option>
                    <option value="On-Hold">On-Hold</option>
                    <option value="Plan to Read">Plan to Read</option>
                    <option value="Dropped">Dropped</option>
                </select>
                <Form.Control.Feedback type="invalid">
                    Please select a status
                </Form.Control.Feedback>
            </Col>
        </Row>
        <Row>
            <Col md={4} sm={6} xs={12} className="centered">
                <label className="label-align">Score: </label>
            </Col>
            <Col lg={6} md={8} className="centered">
                <select name="score" value={formData.score || ''} onChange={onChange} className="form-select">
                    <option defaultValue value="">Select score</option>
                    <option value="5">(5) Excellent</option>
                    <option value="4">(4) Great</option>
                    <option value="3">(3) Good</option>
                    <option value="2">(2) Just OK</option>
                    <option value="1">(1) Terrible</option>
                </select>
            </Col>
        </Row>
        <Row>
            <Col md={4} sm={6} xs={12} className="centered">
                <label className="label-align">Pages Read: </label>
            </Col>
            <Col lg={6} md={8} className="">
                <input 
                    type="number" 
                    min="0" 
                    max={totalPages} 
                    name="pagesRead" 
                    id="pagesRead" 
                    value={formData.pagesRead || ''} 
                    onChange={onChange} 
                    className="form-control small-input" 
                /><span> / </span>
                <input 
                    type="number" 
                    name="pageCount" 
                    id="pageCount" 
                    value={formData.pageCount || ''} 
                    onChange={onChange} 
                    className="form-control small-input" 
                />
            </Col>
        </Row>      
        <Row>
            <Col md={4} sm={6} xs={12} className="centered">
                <label className="label-align">Start Date: </label>
            </Col>
            <Col lg={6} md={8} className="centered">
                <input 
                    type="date" 
                    name="startDate" 
                    id="startDate" 
                    value={formData.startDate || ''} 
                    onChange={onChange} 
                    className="form-control" 
                />
            </Col>
        </Row>  
        <Row>
            <Col md={4} sm={6} xs={12} className="centered">
                <label className="label-align">End Date: </label>
            </Col>
            <Col lg={6} md={8} className="centered">
                <input 
                    type="date" 
                    name="endDate" 
                    id="endDate" 
                    value={formData.endDate || ''} 
                    onChange={onChange} 
                    className="form-control" 
                />              
            </Col>
        </Row>
        <Row>
            <Col md={4} sm={6} xs={12} className="centered">
                <label className="label-align">Favorite? </label>
            </Col>
            <Col lg={6} md={8} className="d-flex">
                <div className="p-1 pe-5">
                    <label className="pe-1">Book: </label>
                    <input 
                        type="checkbox" 
                        name="faveBook" 
                        id="faveBook" 
                        value={formData.faveBook || false} 
                        onChange={() => setFormData({...formData, faveBook: !formData.faveBook})} 
                        checked={formData.faveBook}
                        className="form-check-input" 
                    />
                </div>
                    <div className="p-1">
                    <label className="pe-1">Author: </label>
                    <input 
                        type="checkbox" 
                        name="faveAuthor" 
                        id="faveAuthor" 
                        value={formData.faveAuthor || false} 
                        onChange={() => setFormData({...formData, faveAuthor: !formData.faveAuthor})}
                        checked={formData.faveAuthor} 
                        className="form-check-input"
                    />
                </div>
            </Col>
        </Row> 
        <Row>
            <Col lg={4} md={4} sm={6} xs={12}></Col>
            <Col lg={6} md={8}>
                <div className="bookForm-btns">
                    <Button type="submit" variant="dark" className="bookFormBtn" >
                        {edit ? 'Update' : 'Add to List'}  
                    </Button>
                    {edit && 
                        <Button 
                            variant="danger" 
                            className="bookFormBtn" 
                            onClick={() => navigate('/bookList')}
                            >Cancel
                        </Button>
                    }
                </div>
            </Col>
        </Row>
    </Form> 
  )
}

export default BookForm