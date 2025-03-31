import { Link } from 'react-router-dom';
import './basket.css';
import CartItem from '../goods/CartItem/CartItem';
import { ButtonMain } from '../buttons/button';
import WhiteButton from '../buttons/WhiteButton/WhiteButton';
import React from 'react';

export function BasketEmpty() {
   return (
      <div className="flex flex-col items-center justify-center gap-4 my-16 sm:gap-8">
         <h1 className="text-2xl sm:text-4xl text-center">Корзина пуста</h1>
         <img
            src="/marketplace/images/main/variable/basket/bigBasket.svg"
            alt="Big basket"
            className="w-48 sm:w-64"
         />
         <h1 className="text-lg sm:text-xl text-center">К сожалению, у вас нет товара</h1>
         <section className="text-sm sm:text-base text-center">
            <p>Вы можете нажать на кнопку “Продолжить покупки”, либо вы можете нажать</p>
            <p>на логотип, и вас переведет на главную страницу сайта</p>
         </section>
         <section className='flex justify-center'>
            <Link to='/' className="w-full sm:w-auto font-bold">
               <ButtonMain name={'Продолжить покупки'} className="w-full sm:w-auto" />
            </Link>
         </section>
      </div>
   );
}


// BasketMain component
export function FavoriteMain({ basket, onRemove }) {
   return (
      <>
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 mt-16 gap-4 md:mt-0 sm:mt-4 sm:gap-0">
               <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center sm:text-left">
                  Избранные товары
               </h1>
               <WhiteButton className="w-full sm:w-auto flex justify-center items-center px-6 py-3 sm:px-4 sm:py-2 text-white">
                  <Link to="/" className="whitespace-nowrap">
                     Продолжить покупки
                  </Link>
               </WhiteButton>
            </div>

            {/* Отображаем товары в корзине */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {basket.map(item => (
                  <CartItem
                     key={item.id}
                     idProduct={item.id}
                     title={item.title}
                     price={item.price}
                     categories={item.categories}
                     onRemove={() => onRemove(item.id)}
                  />
               ))}
            </div>
         </div>
      </>
   );
}