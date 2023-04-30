import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Customer from './pages/Customer';
import Checkout from './pages/Checkout';
import Order from './pages/Order';
import OrderDetails from './pages/OrderDetails';
import SellerOrder from './pages/SellerOrder';
import SellerOrderDetails from './pages/SellerOrderDetails';
import Admin from './pages/Admin';

function App() {
  return (
    <div>
      <Switch>
        <Route component={ Login } exact path="/login" />
        <Route component={ Login } exact path="/" />
        <Route component={ Register } exact path="/register" />
        <Route component={ Customer } exact path="/customer/products" />
        <Route component={ Checkout } exact path="/customer/checkout" />
        <Route component={ Order } exact path="/customer/orders" />
        <Route component={ OrderDetails } exact path="/customer/orders/:id" />
        <Route component={ SellerOrder } exact path="/seller/orders" />
        <Route component={ SellerOrderDetails } exact path="/seller/orders/:id" />
        <Route component={ Admin } exact path="/admin/manage" />
      </Switch>
    </div>
  );
}

export default App;
