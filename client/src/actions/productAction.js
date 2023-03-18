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
export const getProducts = (keyword='', currentPage=1, price=[0, 50000], category, ratings=0) => async(dispatch) => {
  try {
    dispatch({type:ALL_PRODUCT_REQUESTS})

    let link = `/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&overallRating[gte]=${ratings}`

    if(category){
      link = `/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&overallRating[gte]=${ratings}`
    }

    const data = await axios.get(link) 


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
    
    const data = await axios.get(`/api/product/${_id}`)


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