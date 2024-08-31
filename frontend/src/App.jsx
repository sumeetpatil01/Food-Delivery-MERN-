import React, { useEffect } from 'react'
import "./App.css";
import Header from './components/layouts/Header';
import Home from './components/layouts/Home';
import Footer from './components/layouts/Footer';
import Menu from './components/layouts/Menu';
import Cart from './components/cart/Cart';
import OrderSuccess from './components/cart/OrderSuccess';
import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails';
import Login from './components/users/Login';
import Register from './components/users/Register';
import Profile from './components/users/Profile';
import UpdateProfile from './components/users/UpdateProfile';
import ForgotPassword from './components/users/ForgotPassword';
import NewPassword from './components/users/NewPassword';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import store from './store';
import { loadUser } from './actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems } from './actions/cartActions';

export default function App() {
  //Dispatched exactly once, when the component is first rendered, and check if the user is authenticated or not
  // console.table(store) //debug
  useEffect(() => {
    store.dispatch(loadUser());
  },[]);

  const dispatch  = useDispatch();
  const { user } = useSelector(state => state.auth);
  if(user){
    dispatch(fetchCartItems());
  }


  return (
    <BrowserRouter>
      <div className='app'>
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/eats/stores/:id/menus" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/users/login" element={<Login />} />
            <Route path="/users/signup" element={<Register />} />
            <Route path="/users/me" element={<Profile />} />
            <Route path="/users/me/update" element={<UpdateProfile />} />
            <Route path="/users/forgotPassword" element={<ForgotPassword />} />
            <Route path="/users/resetPassword/:token" element={<NewPassword />} />
            <Route path="/success" element={<OrderSuccess />} />
            <Route path="/eats/orders/me/myOrders" element={<ListOrders />} />
            <Route path="/eats/orders/:id" element={<OrderDetails />} />
            <Route path="*" element={<h1>This page does not exist.</h1>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
