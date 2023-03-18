import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from '../constants/cartConstants'

import axios from 'axios'

// Add to cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const data = await axios.get(`/api/product/${id}`)
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.data.foundProduct._id,
      name: data.data.foundProduct.name,
      price: data.data.foundProduct.price,
      image: data.data.foundProduct.images[0].url,
      stock: data.data.foundProduct.stock,
      quantity
    }
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// Remove From Cart
export const removeItemsFromCart = (id) => async(dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// Save Shipping Info
export const saveShippingInfo = (data) => async(dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data
  })

  localStorage.setItem("shippingInfo", JSON.stringify(data))
}