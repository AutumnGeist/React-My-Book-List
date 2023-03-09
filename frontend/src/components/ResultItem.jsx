import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Collapse } from 'react-bootstrap';
import BookForm from './BookForm'

function ResultItem({book}) {
    const [showForm, setShowForm] = useState(false)
    const [showDesc, setShowDesc] = useState(false)

    const {user} = useSelector((state) => state.user)
 
    //save the necessary book data received from the API
    const bookData = {
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        publishedDate: book.volumeInfo.publishedDate,
        image: "",
        categories: book.volumeInfo.categories,
        pageCount: book.volumeInfo.pageCount
    }

    //check for undefined values
    const checkData = (data) => {
        if(book.volumeInfo.imageLinks !== undefined) {
            data.image = book.volumeInfo.imageLinks.thumbnail
        }
        for(let d in data) {
            if(data[d] === undefined || data[d] === 0) {              
                //match the default array type (prevents errors from join() methods)
                if(d === 'authors' || d === 'categories') {
                    data[d] = ['?']
                }else if(d === 'pageCount') {
                    data[d] = ''
                }else {
                    data[d] = '?'
                } 
            }    
        }
    }
    checkData(bookData)
  
    return (
    <>
        <Row className="bookResult">
            <Col lg={4} sm={12} className="bookImg">
                <img src={bookData.image} className="image" alt="book cover img" />
            </Col>
            <Col lg={4} sm={12} className="bookInfo">
                <div className="text-left">
                    <h3>{bookData.title}</h3>
                    <p><strong>Authors: </strong>{bookData.authors.join(', ')}</p>
                    <p><strong>Published Date: </strong>{bookData.publishedDate}</p>
                    <p><strong>Categories: </strong>{bookData.categories.join(', ')}</p>
                    <p><strong>Description:</strong> <button className="desc-btn" onClick={() => setShowDesc(!showDesc)}>
                        {showDesc ? 'Close Description' : 'View Description'}
                    </button> </p>
                </div>
            </Col>
            <Col lg={4} sm={12} className="showForm-btn">
                
                <button onClick={() => setShowForm(!showForm)} className="btn addBtn btn-lg bg-warning" >
                    {showForm ? 'Close' : 'Add'}
                </button>
                
            </Col>
        </Row>
        <Collapse in={showDesc}>
            <Row>
                <div className="bookDesc">
                    <p>{book.volumeInfo.description}</p>
                </div>
            </Row>  
        </Collapse>
        <Collapse in={showForm}>
            <Row>
                <div className="bookForm">
                    {user ?
                        <BookForm book={bookData} showForm={() => setShowForm()} />
                        : <h5 className="center">Login or create an account to save to list.</h5>
                    }
                </div>
            </Row>
        </Collapse>
    </>
  )
}

export default ResultItem