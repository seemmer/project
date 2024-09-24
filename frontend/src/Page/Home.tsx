import React from 'react'
import Nav from '../component/Nav/Nav'
import Header from '../component/Header/Header'
import Recomment from '../component/Recomment/Recomment'
import '../component/Nav/์Nav.css'

const Home = () => {
  return (
    <div className='dark-nav'>
        <Nav/>
        <Header/>
        <Recomment/>
    </div>
  )
}

export default Home