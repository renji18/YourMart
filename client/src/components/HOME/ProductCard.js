import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { Link } from 'react-router-dom'

const ProductCard = ( {product} ) => {

  const options = {
    edit:false,
    color:"rgba(20,20,20,0.2)",
    activeColor:"tomato",
    size:window.innerWidth < 600 ? 20 : 25,
    value:product.overallRating,
    isHalf:true
  }

  return (
    <Link className='productCard' to={`/product/${product._id}`}>
      <img alt={product.name} src={product.images[0].url} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} /> <span>{product.numOfReviews}</span>
      </div>
      <span>`${product.price}`</span>
    </Link>
  )
}

export default ProductCard