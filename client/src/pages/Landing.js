import React from 'react'
import NotLoggedIn from '../components/hero/NotLoggedIn'
import LoggedIn from '../components/hero/LoggedIn'
import LoggedInHeader from '../components/headers/LoggedInHeader'
import NotLoggedInHeader from '../components/headers/NotLoggedInHeader'
import Footer from '../components/Footer'

function Landing() {


  return (
    <>
      <LoggedInHeader />
      <NotLoggedInHeader />
      <NotLoggedIn />
      <LoggedIn />
      <Footer />
    </>
  )
}

export default Landing