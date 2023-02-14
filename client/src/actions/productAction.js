import axios from 'axios'
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUESTS,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
} from '../constants/productConstants'


// Get All Products
export const getProducts = () => async(dispatch) => {
  try {
    dispatch({type:ALL_PRODUCT_REQUESTS})
    
    const data = await axios.get('http://localhost:5000/products')


    dispatch({
      type:ALL_PRODUCT_SUCCESS,
      payload:data
    })

  } catch (error) {
    dispatch({
      type:ALL_PRODUCT_FAIL,
      payload:error.response.data.msg
    })
  }
}



// Get Single Product
export const getProductDetails = (_id) => async(dispatch) => {
  try {
    dispatch({type:PRODUCT_DETAILS_REQUEST})
    
    const data = await axios.get(`http://localhost:5000/product/${_id}`)


    dispatch({
      type:PRODUCT_DETAILS_SUCCESS,
      payload:data
    })

  } catch (error) {
    dispatch({
      type:PRODUCT_DETAILS_FAIL,
      payload:error.response.data.msg
    })
  }
}

// Clearing Errors
export const clearErrors = () => async(dispatch) => {
  dispatch({type:CLEAR_ERRORS})
}