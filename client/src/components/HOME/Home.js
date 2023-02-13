import React, {Fragment} from 'react'
import { CgMouse } from 'react-icons/cg'
import './Home.css'
import Product from './Product.js'

const Home = () => {

  const product = {
    name: "Blue Tshirt",
    price:"Rs.3000",
    _id:"demo",
    images:[{url:"https://i.ibb.co/DRST11n/1.webp"}]
  }

  return (
    <Fragment>
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
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </Fragment>
  )
}

export default Home