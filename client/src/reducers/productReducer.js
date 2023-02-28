import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUESTS,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
} from '../constants/productConstants'


export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUESTS: 
      return {
        loading: true,
        allProducts: [],
      } 
    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        productCount:action.payload.data.productCount,
        allProducts: action.payload.data.allProducts,
        productsPerPage: action.payload.data.productsPerPage,
        filteredProductsCount: action.payload.data.filteredProductsCount,
      }
      case ALL_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
      case CLEAR_ERRORS:
        return{
          ...state,
          error:null
        }
    default:
      return state;
  }
}


export const productDetailsReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product:action.payload.data.foundProduct,
      }
      case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
      case CLEAR_ERRORS:
        return{
          ...state,
          error:null
        }
    default:
      return state;
  }
}