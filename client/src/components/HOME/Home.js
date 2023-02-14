import React, { Fragment, useEffect } from 'react'
import { CgMouse } from 'react-icons/cg'
import './Home.css'
import MetaData from '../layout/MetaData'
import Product from './Product.js'
import { clearErrors, getProducts } from '../../actions/productAction'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../layout/Loader/Loader.js';
import {useAlert} from 'react-alert'

const Home = () => {

  const dispatch = useDispatch()
  const alert = useAlert()

  const { loading, error, allProducts, productCount } = useSelector(state => state.products)

  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProducts())
  }, [dispatch, error, alert])


  return (
    <Fragment>
      {
        loading
          ?
          <Loader />
          :
          <Fragment>
            <MetaData title="Your Mart" />
            <div className="banner">
              <p>Welcome to Your Mart</p>
              <h1>Find Amazing Products Below</h1>
              <a href="#container">
                <button>
                  Scroll
                  <CgMouse />
                </button>
              </a>
            </div>
            <h2 className="homeHeading">Featured Products</h2>

            <div className="container" id="container">
              {allProducts && allProducts.map(product => (
                <Product product={product} key={product._id} />
              ))}
            </div>
          </Fragment>
      }
    </Fragment>
  )
}

export default Home