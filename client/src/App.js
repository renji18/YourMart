import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/layout/Header/Header.js'
import Footer from './components/layout/Footer/Footer.js'
import './App.css'
import webfont from 'webfontloader'
import Home from './components/HOME/Home.js'
import ProductDetails from './components/Product/ProductDetails.js'
import Loader from './components/layout/Loader/Loader.js';

function App() {

  useEffect(()=>{
    webfont.load({
      google:{
        families:["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  },[])

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/product/:id' element={<ProductDetails />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
