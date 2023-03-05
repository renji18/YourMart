import React, { Fragment, useEffect, useState } from 'react'
import { clearErrors, getProductDetails } from '../../actions/productAction'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../layout/Loader/Loader.js';
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'
import ReviewCard from './ReviewCard.js'
import ReactStars from 'react-rating-stars-component'
import { addItemsToCart } from '../../actions/cartAction';

const ProductDetails = () => {

  const _id = (window.location.pathname).split('/product/')[1]

  const dispatch = useDispatch()
  const alert = useAlert()

  const [quantity, setQuantity] = useState(1)
  const { loading, error, product } = useSelector(state => state.productDetails)


  const addToCartHandler = () => {
    dispatch(addItemsToCart(_id, quantity))
    alert.success('Item Added To Cart')
  }

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProductDetails(_id))
  }, [dispatch, error, alert, _id])

  const options = {
    size: "large",
    value: product.overallRating,
    readOnly: true,
    precision: 0.5,
  };

  const increaseQuantity = () => {
    if(product.stock <= quantity) 
      return
    const qty = quantity + 1;
    setQuantity(qty)
  }

  const decreaseQuantity = () => {
    if(quantity <= 1)
      return
    const qty = quantity - 1;
    setQuantity(qty)
  }

  return (
    <Fragment>
      {
        loading
          ?
          <Loader />
          :
          <Fragment>
            <MetaData title={`${product.name} -- YourMart`} />
            <div className="ProductDetails">
              <div className='CarouselImage'>
                <Carousel>
                  {product.images
                    &&
                    product.images.map((item, i) => (
                      <img src={item.url} alt={`${i} Slide`} className='CarouselImage' key={item.url} />
                    ))
                  }
                </Carousel>
              </div>
              <div>
                <div className="detailsBlock-1">
                  <h2>{product.name}</h2>
                  <p>Product # {product._id}</p>
                </div>
                <div className="detailsBlock-2">
                  <ReactStars {...options} />
                  <span
                    className='detailsBlock-2-span'>
                    {" "}
                    ({product.numOfReviews} Reviews)
                  </span>
                </div>
                <div className="detailsBlock-3">
                  <h1>{`₹${product.price}`}</h1>
                  <div className="detailsBlock-3-1">
                    <div className="detailsBlock-3-1-1">
                      <button onClick={decreaseQuantity}>-</button>
                      <input readOnly type="number" value={quantity} />
                      <button onClick={increaseQuantity}>+</button>
                    </div>
                    <button
                      disabled={product.Stock < 1 ? true : false}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </button>
                  </div>

                  <p>
                    Status:
                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                      {product.Stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                  </p>
                </div>
                <div className="detailsBlock-4">
                  Description : <p>{product.description}</p>
                </div>
                <button className="submitReview">
                  Submit Review
                </button>
              </div>
            </div>
            <h3 className="reviewsHeading">REVIEWS</h3>
            {product.reviews && product.reviews[0] ? (
              <div className="reviews">
                {product.reviews &&
                  product.reviews.map(review => <ReviewCard review={review} key={review.name} />)}
              </div>
            ) : (
              <p className="noReviews">No Reviews Yet</p>
            )}
          </Fragment>
      }
    </Fragment>
  )
}

export default ProductDetails