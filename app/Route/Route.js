import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import ContactPage from './Contact-Page';
import ProductsPage from './ProductsPage';
import AddProductPage from './AddProductPage';
import EditUserRolesPage from './EditUserRolesPage';
import AdminPage from './admin-page';

const Route = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/Contact-Page" component={ContactPage} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/add-product" component={AddProductPage} />
      <Route path="/edit-user-roles" component={EditUserRolesPage} />
      <Route path="/admin-page" component={AdminPage} />
    </Switch>
  );
};

export default Route;