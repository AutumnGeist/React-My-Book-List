import React from 'react'
import { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { toast } from 'react-toastify'
import { Button } from 'react-bootstrap';
import axios from 'axios'
import ResultItem from '../components/ResultItem';
import decorImg from '../images/decor-short.png'

function BookSearch() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])

    const onSubmit = (e) => {
        e.preventDefault()
        setResults([])
        search(query)
        setQuery('')
    }

    //get search result from Books API
    const search = async (q) => {
        try {
            const response = await axios.get(`/search/${q}`)
            if(response.data) {
                setResults(response.data)
            }else {
                toast.error("No results found")
            }
        } catch (error) {
            toast.error(error)
        }
    }
  
    return ( 
    <div className="container">
        <section className="center mb-2">
            <h1 className="page-title">Find Books</h1>
            <img src={decorImg} alt="decor img" className="decor-img" />   
        </section>
        <section className="search-form pt-4">
        <h3>Search by title or author</h3>
        <form className="d-flex" onSubmit={onSubmit}>
            <div className="form-group">
                <input 
                    type="text"
                    className="form-control"
                    id="query"
                    name="query"
                    value={query}
                    placeholder="Search for books"
                    onChange={(e) => setQuery(e.target.value)}>
                </input>
            </div>
            <div className="form-group">
                <Button variant="dark" type="submit" className="btn btn-block"><FaSearch /></Button>
            </div>
        </form>
        </section>
        
        <section className="searchResults">
            {results.length > 1 ? (
                <>
                {results.map(book => (
                    <ResultItem key={book.id} book={book} />
                ))}
                </>
            ) : ('')}
        </section>
    </div>
  )
}

export default BookSearch