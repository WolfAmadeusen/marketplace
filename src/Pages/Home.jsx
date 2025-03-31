import { getGoodsApi } from '../services/getGoodsApi';

import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import MainLayout from '../layouts/main';
import Catalog from '../components/Catalog/Catalog';
import Banner from '../components/Banner/Banner';
import ViewProduct from '../components/goods/ViewProduct';


export default function Home() {
   //Получаем API
   const [products, setProducts] = useState([]);
   const [error, setError] = useState(null);
   const navigate = useNavigate();

   useEffect(() => {
      const fetchProducts = async () => {
         try {
            const data = await getGoodsApi();
            setProducts(data);
         } catch (err) {
            setError(err.message);
            navigate('/error'); // Перенаправление на страницу ошибки
         }
      };
      fetchProducts();
   }, [navigate]);

   return (
      <>
         <MainLayout main='main grid grid-cols-1 xs:grid-cols-1 sm-425:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10 mb-8'>
            <Catalog />
            <div className="xs:col-span-1 sm-425:col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2">
               <Banner />
               {/* Телефоны */}
               <ViewProduct products={products} title={"Телефоны"} link={`api/product/category`} buttonRight={'160px'} />
               {/* Сетевые адаптеры */}
               <ViewProduct products={products} title={"комплекты"} link={`api/product/category`} buttonRight={'170px'} />
               {/* Ноутбуки */}
               <ViewProduct products={products} title={"Ноутбуки"} link={`/api/product/category`} buttonRight={'150px'} />
               {/* Клавиатуры и мыши */}
               <ViewProduct products={products} title={"Клавиатуры"} link={`api/product/category`} buttonRight={'190px'} />
            </div>
         </MainLayout>
      </>
   );
}