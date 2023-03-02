import {
  LOGIN_REQUESTS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  CLEAR_ERRORS,
  REGISTER_FAIL,
  REGISTER_REQUESTS,
  REGISTER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUESTS,
  LOAD_USER_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
} from '../constants/userConstants'



import axios from 'axios'

// Logging in user
export const login = (email, password) => async(dispatch) => {
  try {
    dispatch({type: LOGIN_REQUESTS})

    const config = {headers: {"Content-Type": "application/json"}}

    const data = await axios.post('/user/login', {email, password}, config)

    dispatch({
      type: LOGIN_SUCCESS, 
      payload:data
    })
    
  } catch (error) {
    dispatch({
      type:LOGIN_FAIL,
      payload:error.response.data.msg
    })
  }
}

// Load user
export const loadUser = () => async(dispatch) => {
  try {
    dispatch({type: LOAD_USER_REQUESTS})

    const logged = await axios.get('/cookieCheck')

    if(logged.data.msg === 'User Logged In'){
      const data = await axios.get('/user/profile')
      dispatch({
        type: LOAD_USER_SUCCESS, 
        payload:data
      })
    } else if (logged.data.msg === 'User Not Logged In') {
      dispatch({
        type:LOAD_USER_FAIL,
        payload: 'Not Logged In'
      })
    }
    
  } catch (error) {
    dispatch({
      type:LOAD_USER_FAIL,
      payload:error.response.data.msg
    })
  }
}

// Registering User
export const register = (userData) => async(dispatch) => {
  try {
    dispatch({type: REGISTER_REQUESTS})

    const config = {headers: {"Content-Type": "multipart/form-data"}}

    const data = await axios.post('/user/register', userData, config)

    dispatch({
      type: REGISTER_SUCCESS, 
      payload:data
    })

  } catch (error) {
    dispatch({
      type:REGISTER_FAIL,
      payload:error.response.data.msg
    })
  }
}

// Logout User
export const logout = () => async(dispatch) => {
  try {

    await axios.get('/user/logout')

    dispatch({
      type: LOGOUT_SUCCESS
    })

  } catch (error) {
    dispatch({
      type:LOGOUT_FAIL,
      payload:error.response.data.msg
    })
  }
}



// Clearing Errors
export const clearErrors = () => async(dispatch) => {
  dispatch({type:CLEAR_ERRORS})
}