import React from 'react'
import { useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { Nav } from 'react-bootstrap'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import {logout, reset} from '../features/user/userSlice'

function Menu({onOpen, showMenu}) {
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.user)

    //set is the menu is currently visible
    useEffect(() => {
        setVisible(showMenu)
    }, [showMenu])
    
    //updates state to logout user
    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
  
    return (
    <>
    <Nav className="nav" style={{ left: visible && '0px' }}>
        <div className="line-segment">
            <div className="light-line"></div>
            <div className="dark-line"></div>
            <div className="big-light-line">
                <Link to='/'>
                    <h1 className="logo">My Book List</h1>
                </Link>
            </div>
            <div className="dark-line"></div>
            <div className="light-line"></div>
        </div>
        <div className="menu-box">
        <ul className="nav-list">
            {user ? (
                <>
                <li onClick={onLogout}>
                    <Link to='/'>
                        Logout
                    </Link>
                </li>
                <li>
                    <Link to='/profile'>
                        Profile
                    </Link>
                    
                </li>
                <li>
                    <Link to='/bookList'>
                        Book List
                    </Link>
                </li>
                </>
            ) : (
                <>
                <li>
                    <Link to='/login'>
                        Login
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                        Register
                    </Link>
                </li>
                </>
            )}
            
            <li>
                <Link to='/search'>
                    Find Books
                </Link>
            </li>
            
        </ul>
        </div>
        <div className="line-segment">
            <div className="light-line"></div>
            <div className="dark-line"></div>
            <div className="big-light-line"></div>
            <div className="dark-line"></div>
            <div className="light-line"></div>
        </div>
    </Nav>
    <div className="navbar-toggler" style={{ paddingLeft: visible && '200px' }}>
        <button 
            className="toggle-btn" 
            type="button" 
            data-toggle="collapse" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
            onClick={onOpen}>
            {visible ? <AiOutlineMenuFold size="50px" /> : <AiOutlineMenuUnfold size="50px" />}
        </button>
    </div>
    </>
  )
}

export default Menu