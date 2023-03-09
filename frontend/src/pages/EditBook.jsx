import React from 'react'
import { useLocation } from 'react-router-dom'
import { Row, Col, Image } from 'react-bootstrap'
import BookForm from '../components/BookForm'
import decorImg from '../images/decor-long.png'

function EditBook() {
    const location = useLocation()
    const book = location.state
  
    return (
    <div className="container">
        <section className="centered mb-3 w-100">
            <h1 className="booklist-title">Edit Book</h1>
            <img src={decorImg} alt="decor img" className="decor-img" />
        </section>
        <div className="editBook">
        <Row className="edit-rows">
            {/* <Col md={4} sm={4} xs={12} className="align-right">
                <Image src={book.image} alt="book cover img" className="align-right"/> 
            </Col>
            <Col md={8} sm={6} xs={12} className="bookDetails">
                <div className="text-left">
                <h3 className="pb-3">{book.title}</h3>
                <p><strong>Authors: </strong>{book.authors.join(', ')}</p>
                <p><strong>Publish Date: </strong>{book.publishedDate}</p>
                <p><strong>Categories: </strong>{book.categories.join(', ')}</p>
                </div>
            </Col> */}
            <Col className="centered">
                <Image src={book.image} alt="book cover img" className="pe-5"/>
                <div className="text-left">
                    <h3>{book.title}</h3>
                    <p><strong>Authors: </strong>{book.authors.join(', ')}</p>
                    <p><strong>Published Date: </strong>{book.publishedDate}</p>
                    <p><strong>Categories: </strong>{book.categories.join(', ')}</p>
                </div>
            </Col>
        </Row>
        <Row sm={12} className="pt-5 edit-rows">
            <BookForm book={book} edit={true}/>  
        </Row>
        </div>
    </div>
  )
}

export default EditBook