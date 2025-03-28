import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/main.jsx";
import { ButtonMain } from "../components/buttons/button.jsx";
import { FavoriteMain } from "../components/Favorite/Favorite.jsx";


export default function Favorite() {
   const [favorite, setFavorite] = useState([]);

   useEffect(()=>{
      const savedFavorite = JSON.parse(localStorage.getItem('favorite')) || [];
      setFavorite(savedFavorite);
   }, []);

   // Синхронізувати зміни у кошику
   const handleRemove = (id) => {
      setFavorite(favorite.filter((item) => item.id !== id));
   };

   return (
      <MainLayout body={`flex flex-col min-h-screen ${favorite.length === 0 ? "bg-orange-100" : ""}`} main="flex-grow mb-52 mt-20">
         {favorite.length === 0 ? (
            <section className="flex flex-col items-center justify-center gap-4 md:gap-6 p-4 min-h-screen">
               {/* Заголовок */}
               <h1 className="text-2xl sm:text-4xl text-center font-bold text-gray-800">
                  У вас нет избранных товаров
               </h1>

               {/* Подзаголовок */}
               <span className="text-lg sm:text-xl text-center text-gray-600">
                  К сожалению, у вас нет избранных товаров
               </span>

               {/* Описание */}
               <section className="text-sm sm:text-base text-center text-gray-500 max-w-2xl">
                  <p>Вы можете нажать на кнопку “Продолжить покупки”, либо вы можете нажать</p>
                  <p>на логотип, и вас переведет на главную страницу сайта</p>
               </section>

               {/* Кнопка */}
               <Link to="/">
                  <ButtonMain
                     name={'Продолжить покупки'}
                  />
               </Link>
            </section>
         ) : (
            <FavoriteMain
               favorite={favorite}
               onRemove={handleRemove}
            />
         )
         }
      </MainLayout >
   );
}