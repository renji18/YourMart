import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import LoginSignup from '../User/LoginSignup';

const ProtectedRoute = ({ options }) => {
  const { loading, isAuthenticated } = useSelector(state => state.user)

  return (
    <Fragment>
      {!loading && (
        <Routes>
          {isAuthenticated ?
            <Route exact={options.exact} path={options.path} element={options.element} />
            :
            <Route exact path='/login' element={<LoginSignup />} />
          }
        </Routes>
      )}
    </Fragment>
  )
}

export default ProtectedRoute