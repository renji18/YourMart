import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/layout/Header/Header.js'
import Footer from './components/layout/Footer/Footer.js'
import './App.css'
import webfont from 'webfontloader'
import Home from './components/HOME/Home.js'
import ProductDetails from './components/Product/ProductDetails.js'
import Products from './components/Product/Products.js';
import Search from './components/Product/Search.js'
import LoginSignup from './components/User/LoginSignup.js';
import store from './store'
import { loadUser } from './actions/userAction.js';
import UserOptions from './components/layout/Header/UserOptions.js'
import { useSelector } from 'react-redux';

function App() {

  const {isAuthenticated, user} = useSelector(state => state.user)

  useEffect(()=>{
    webfont.load({
      google:{
        families:["Roboto", "Droid Sans", "Chilanka"]
      }
    })
    store.dispatch(loadUser())
  })

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/product/:id' element={<ProductDetails />} />
        <Route exact path='/products' element={<Products />} />
        <Route  path='/products/:keyword' element={<Products />} />
        <Route exact path='/search' element={<Search />} />
        <Route exact path='/login' element={<LoginSignup />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
