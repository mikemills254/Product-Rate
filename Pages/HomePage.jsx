import React from 'react'
import Button from '../Components/Button'
import Cookies from 'js-cookie'
import { setIsAuthenticated } from '../Utils/Slicer'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'


function HomePage() {
    const dispatch = useDispatch()
    
    const handlelogOut = () => {
        Cookies.remove('AccessToken')
        dispatch(setIsAuthenticated(false))
        console.log('Logging out')
    }
    return (
        <div className='homePage w-full h-[100%]'>
            <Button
                text={'Log out'}
                onClick={() => handlelogOut()}
            />
            <Link to="/productPage">HomePage</Link>
        </div>
    )
}

export default HomePage
