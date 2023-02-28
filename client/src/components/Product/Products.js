import React, { Fragment, useEffect, useState } from 'react'
import './Products.css'
import { clearErrors, getProducts } from '../../actions/productAction'
import { useSelector, useDispatch } from 'react-redux'
import ProductCard from '../HOME/ProductCard'
import { useAlert } from 'react-alert'
import Loader from '../layout/Loader/Loader.js';
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import MetaData from '../layout/MetaData'

const Products = () => {

  const dispatch = useDispatch()
  const alert = useAlert()
  let { keyword } = useParams()

  const categories = [
    'Entertainment',
    'Basic Necessities',
    'Guns'
  ]

  const [currentPage, setCurrentPage] = useState(1)
  const [price, setPrice] = useState([0, 50000])
  const [category, setCategory] = useState('')
  const [ratings, setRatings] = useState(0)

  const { loading, error, allProducts, productCount, productsPerPage, filteredProductsCount } = useSelector(state => state.products)

  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
  }

  const priceHandler = (event, newPrice) => {
    event.preventDefault()
    setPrice(newPrice)
  }

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProducts(keyword, currentPage, price, category, ratings))
  }, [dispatch, error, alert, keyword, currentPage, price, category, ratings])

  return (
    <Fragment>
      {
        loading ?
          <Loader />
          :
          <Fragment>
          <MetaData title='PRODUCTS --YourMart' />
            <h2 className='productsHeading'>Products</h2>
            <div className="products">
              {allProducts &&
                allProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>


            <div className="filterBox">
              <Typography>Price</Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="on"
                aria-labelledby='range-slider'
                min={0}
                className='filterSlider'
                max={50000}
              />

              <Typography>Categories</Typography>
              <ul className='categoryBox'>
                {categories.map((category) => (
                  <li
                    className='category-link'
                    key={category}
                    onClick={() => setCategory(category)}>
                    {category}
                  </li>
                ))}
              </ul>

              <fieldset>
                <Typography component='legend'>Ratings Above</Typography>
                <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating)
                }}
                aria-labelledby='continuous-slider'
                valueLabelDisplay='auto'
                min={0}
                max={5}
              />
              </fieldset>
            </div>


            {
              productsPerPage < filteredProductsCount &&
              <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={productsPerPage}
                  totalItemsCount={productCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="last"
                  itemClass='page-item'
                  linkClass='page-link'
                  activeClass='pageItemActive'
                  activeLinkClass='pageLinkActive'
                />
              </div>
            }
          </Fragment>
      }
    </Fragment>
  )
}

export default Products