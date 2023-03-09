import React from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FaTimes } from 'react-icons/fa'
import { MdEdit, MdExpandMore, MdExpandLess } from 'react-icons/md'
import { Button, Collapse, Row, Col } from 'react-bootstrap'
import { deleteBook } from '../features/book/bookSlice'


function Book({book, index}) {
    const [showDetails, setShowDetails] = useState(false)
    const dispatch = useDispatch()

    return (
       <>
       <tr>
            <td>{index}</td>
            <td><img src={book.image} alt="book cover img" className="bookCover" /></td>
            <td>{book.title}</td>
            <td>{book.authors.join(', ')}</td>
            <td>{book.status}</td>
            <td>{book.score}/5</td>
            <td>
                <Button variant="dark" size="sm" className="list-btn" onClick={() => setShowDetails(!showDetails)}>
                    {showDetails ? <MdExpandLess size="20px" /> : <MdExpandMore size="20px" />}  
                </Button>
            </td>
            <td>
                <Link to='/edit' state={ book }>
                    <Button variant="warning" size="sm" className="list-btn">
                        <MdEdit size="20px" /> 
                    </Button>
                </Link>
            </td>
            <td>
                <Button variant="danger" size="sm" className="list-btn" onClick={() => dispatch(deleteBook(book._id))}>
                    <FaTimes size="20px" />
                </Button>
            </td>
       </tr>
            <tr>
            
                {/* <td colspan="8" className="p-0">
                    <Table striped bordered className="nestedTable"> 
                        <thead>
                            <tr>
                                <th>Published Date</th>
                                <th>Categories</th>
                                <th>Pages Read</th>
                                <th>Page Count</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Edit</th>
                           
                            </tr>
                        </thead>
                        <tr>
                            <td>{book.publishedDate}</td>
                            <td>{book.categories}</td>
                            <td>{book.pagesRead}</td>
                            <td>{book.pageCount}</td>
                            <td>{book.startDate}</td>
                            <td>{book.endDate}</td>
                        </tr>
                    </Table>
                </td> */}
     
                <td colSpan="9" >
                <Collapse in={showDetails}>
                    <div className="details">
                        <Row className="p-1">
                        <Col lg={3} md={6} sm={12} className="border-right">
                            <Row>
                                <Col>
                                    <p className="text-right text-bold">Published date: </p>
                                </Col>
                                <Col>
                                    {book.publishedDate}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p className="text-right text-bold">Categories: </p>
                                </Col>
                                <Col>
                                    {book.categories}
                                </Col>
                            </Row>
                        </Col>
                        <Col  lg={3} md={6} sm={12} className="border-right">
                            <Row>
                                <Col>
                                <p className="text-right text-bold">Pages read: </p>
                                </Col>
                                <Col>
                                    {book.pagesRead}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <p className="text-right text-bold">Page count: </p>
                                </Col>
                                <Col>
                                    {book.pageCount}
                                </Col>
                            </Row>
                        </Col>
                        <Col  lg={3} md={6} sm={12} className="border-right">
                            <Row>
                                <Col>
                                    <p className="text-right text-bold">Start date: </p>
                                </Col>
                                <Col className="center">
                                    {book.startDate}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p className="text-right text-bold">End date: </p>
                                </Col>
                                <Col>
                                    {book.endDate}
                                </Col>
                            </Row>
                        </Col>
                        <Col  lg={3} md={6} sm={12}>
                            <Row>
                                <Col>
                                    <p className="text-right text-bold">Favorite book: </p>
                                </Col>
                                <Col>
                                    <input disabled type="checkbox" checked={book.faveBook} className="form-check-input" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p className="text-right text-bold">Favorite author: </p>
                                </Col>
                                <Col>
                                    <input disabled type="checkbox" checked={book.faveAuthor} className="form-check-input"/>
                                </Col>
                            </Row>
                        </Col>
                        </Row>
                    </div>
                </Collapse> 
                </td>
            </tr>
       </>
    )
}

export default Book