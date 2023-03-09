import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'underscore'
import { Table } from 'react-bootstrap'
import { getBooks, reset } from '../features/book/bookSlice'
import Book from '../components/Book'
import Spinner from '../components/Spinner'
import bookshelfImg from '../images/bookshelf.png'
import decorImg from '../images/decor-long.png'

function BookList() {
    //initial table sort order
    const initialOrder = {
        title: false,
        authors: false,
        status: false,
        score: true
    }
    //state for current table column order (false = sort ascending, true = sort descending)
    const [sortOrder, setSortOrder] = useState({
        title: true,
        authors: false,
        status: false,
        score: true
    })
    //state for current table view
    const [bookList, setBookList] = useState([])
    const [filter, setFilter] = useState('All Books')
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.user)
    const {books, isLoading, isError, message} = useSelector((state) => state.book)
  
    //get user books from redux state/DB
    useEffect(() => {
        if(isError) {
            toast.error(message)
          }
        dispatch(getBooks())
        return () => {
            dispatch(reset)
        }
    }, [isError, message, dispatch])

    //filter books based on status
    useEffect(() => {
        switch(filter) {
            case 'All Books':
                setBookList(books)
                break;
            case 'Currently Reading':
                setBookList(books.filter(book => book.status === 'Reading'))
                break;
            case 'Completed':
                setBookList(books.filter(book => book.status === 'Completed'))
                break;
            case 'On-Hold':
                setBookList(books.filter(book => book.status === 'On-Hold'))
                break;
            case 'Planning to Read':
                setBookList(books.filter(book => book.status === 'Plan to Read'))
                break;
            case 'Dropped':
                setBookList(books.filter(book => book.status === 'Dropped'))
                break;
            default:
                setBookList(books)
        }
    }, [books, filter])
    
    //sort book table columns
    const sortTable = (column) => {
        let colOrder = sortOrder
        //sort ascending if false, descending if true
        if(!colOrder[column]) {
            setBookList(_.sortBy(bookList, column))
            
        }else {
            setBookList(_.sortBy(bookList, column).reverse())
        }
        //reset all other columns back to initialOrder
        for(let col in colOrder) {
            if(col !== column) {
                colOrder[col] = initialOrder[col]
            }
        }
        //reverse the current column
        colOrder[column] = !colOrder[column]
        //save the current order
        setSortOrder(colOrder)
    }

    if(isLoading) {
        return <Spinner />
    }

    return (
    <>
    {/* <div className="centered p-0 m-0" >
        <img src={bookshelfImg} alt="bookshelf img" className="bookshelf-img" />
    </div> */}
    <div className="container"> 
        <div className="mb-3 centered w-100">
            <h1 className="booklist-title">Book List</h1>
            <img src={decorImg} alt="decor img" className="decor-img" />    
        </div>
        <div className="table">
            {books.length > 0 ? (
                <>
                    <div className="filter-bar">
                        <div className="filter-items d-flex justify-content-around">
                            <button className="filterButton" onClick={() => setFilter('All Books')}>All Books</button>
                            <button className="filterButton" onClick={() => setFilter('Currently Reading')}>Currently Reading</button>
                            <button className="filterButton" onClick={() => setFilter('Completed')}>Completed</button>
                            <button className="filterButton" onClick={() => setFilter('On-Hold')}>On-Hold</button>
                            <button className="filterButton" onClick={() => setFilter('Planning to Read')}>Planning to Read</button>
                            <button className="filterButton" onClick={() => setFilter('Dropped')}>Dropped</button>
                        </div>
                    </div>
                    <div className="filter-header">
                        <h3 className="filter-h3">{filter}</h3>
                    </div>
                    <Table striped bordered hover responsive="md" className="bookTable center">
                        <thead className="thead">
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th><button className="sortButton" onClick={() => sortTable('title')}>Title</button></th>
                                <th><button className="sortButton" onClick={() => sortTable('authors')}>Authors</button></th>
                                <th><button className="sortButton" onClick={() => sortTable('status')}>Status</button></th>
                                <th><button className="sortButton" onClick={() => sortTable('score')}>Score</button></th>
                                <th>Details</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookList.map((book, i) => ( 
                                <Book key={book._id} book={book} index={i+1} />
                            ))}
                        </tbody>
                    </Table>
                   
                </>
            ) : (
                <div className="center">
                    <h3>No Books Yet!</h3>
                    <p>Go to <Link to='/search'>Find Books</Link> to add a book to your list!</p>
                </div>
            )}
        </div>
    </div>
    </>
  )
}

export default BookList