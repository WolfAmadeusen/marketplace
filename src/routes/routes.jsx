import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

/* Pages */
import Home from '../Pages/Home';
import Product from '../Pages/Product';
import NotFound from '../Pages/NotFound';
import Favorite from '../Pages/Favorite';
import Catalog from '../Pages/Catalog/Catalog';
import ProductByCategory from '../Pages/Catalog/ProductByCategory';
import Basket from '../Pages/Basket';
import Profile from '../Pages/Profile/Profile';
import { OrderCompleted } from '../Pages/OrderComplited';

const getRoutes = () => (
   <Routes>
      {/* Redirect */}
      <Route path="/" element={<Navigate to="/api/product" />} />

      {/* Основное */}
      <Route path="api/product" element={<Home />} />
      <Route path="api/product/:id" element={<Product />} />
      <Route path="api/basket" element={<Basket />} />
      <Route path='api/basket/complited/:idOrder' element={<OrderCompleted />} />
      <Route path="api/product/category" element={<Catalog />} />
      <Route path="api/product/productByCategory/:category" element={<ProductByCategory />} />

      {/* Профиль клиента */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/Orders" element={<Profile />} />
      <Route path="/profile/favorite" element={<Favorite />} />

      {/* Все ошибки */}
      <Route path="*" element={<NotFound />} />
   </Routes>
);

export default getRoutes;