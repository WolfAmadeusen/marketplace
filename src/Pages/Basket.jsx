import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import MainLayout from '../layouts/main';
import CartItem from '../components/goods/CartItem/CartItem';
import WhiteButton from '../components/buttons/WhiteButton/WhiteButton';
import ButtonLink from '../components/buttons/buttonLink/buttonLink';
import { ButtonProduct } from '../components/buttons/button';
import { BasketEmpty } from '../components/Basket/Basket';

export default function OrderCheckout() {
   const accessToken = localStorage.getItem('accessToken');
   const [basket, setBasket] = useState([]);
   const [totalQuantity, setTotalQuantity] = useState(0);
   const [totalCoust, setTotalCoust] = useState(0);
   let navigate = useNavigate();


   useEffect(() => {
      // Загружаем корзину из localStorage при монтировании компонента
      const savedBasket = JSON.parse(localStorage.getItem('basket')) || [];

      setBasket(savedBasket);
   }, []);

   useEffect(() => {
      // Подсчет общего количества товаров
      const newTotalQuantity = basket.reduce((total, product) => total + product.quantity, 0);

      // Подсчет общей стоимости товаров
      const totalCost = basket.reduce((total, product) => total + product.price * product.quantity, 0);

      setTotalQuantity(newTotalQuantity);
      setTotalCoust(totalCost);
   }, [basket]);

   //Удаления товара из корзины
   const onRemove = (id) => {
      setBasket((prevBasket) => {
         // Удаляем товар из корзины
         const updatedBasket = prevBasket.filter((item) => item.id !== id);

         // Сохраняем обновленную корзину в localStorage
         localStorage.setItem('basket', JSON.stringify(updatedBasket));
         return updatedBasket;
      });
   };

   // Обновления количества товара
   function onUpdateQuantity(id, amount) {
      setBasket((prevBasket) => {
         // Обновляем корзину
         const updatedBasket = prevBasket.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(amount, 1) } : item
         );

         // Сохраняем обновленную корзину в localStorage
         localStorage.setItem('basket', JSON.stringify(updatedBasket));
         return updatedBasket;
      });
   }


   function Order() {
      const OrderId = Math.floor(Math.random() * 389403800);
      navigate(`/api/basket/complited/${OrderId}`);
      localStorage.setItem('basket', JSON.stringify([]));
      return null;
   }


   return (
      <MainLayout body='flex flex-col min-h-screen'>
         {basket.length === 0 ? (
            <BasketEmpty />
         ) : (
            <div className="container mx-auto my-auto">
               <section className="flex flex-col md:flex-row justify-between items-center mt-40 lg:mt-16">
                  <h1 className="text-3xl md:text-4xl font-semibold mb-4 md:mb-6 text-center md:text-left">
                     Оформление заказа
                  </h1>
                  <WhiteButton className="flex justify-center items-center px-4 py-2 w-full md:w-auto">
                     <Link to="/">Продолжить покупки</Link>
                  </WhiteButton>
               </section>
               {accessToken ? (
                  <>
                     <section className="grid grid-cols-1 md:grid-cols-3 gap-2 my-8 justify-center">
                        {/* Секция с итогом к оплате */}
                        <section className='self-start bg-orange-100 p-4 md:p-8 order-1 md:order-2 mt-6 col-span-1'>
                           <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Итог к оплате</h2>
                           <section className="grid grid-cols-12 gap-2 md:gap-4 mb-4 md:mb-8 font-bold">
                              <span className="col-span-8">Количество товара:</span>
                              <span className="text-lg md:text-xl">{totalQuantity}</span>
                              <span className="col-span-8">К оплате</span>
                              <span className="text-xl md:text-2xl">{totalCoust}</span>
                           </section>
                           <ButtonProduct onClick={Order} name="Оформление заказа" />
                        </section>

                        {/* Секция с товарами */}
                        <div className='col-span-1 md:col-span-2 order-2 md:order-1'>
                           {
                              basket.map(item => (
                                 <CartItem
                                    key={item.id}
                                    idProduct={item.id}
                                    title={item.title}
                                    price={item.price}
                                    quantity={item.quantity}
                                    categories={item.categories}
                                    images={item.images}
                                    onRemove={onRemove}
                                    onUpdateQuantity={onUpdateQuantity}
                                 />
                              ))
                           }
                        </div>
                     </section>
                  </>
               ) :
                  (
                     <div className="grid grid-cols-12 gap-4 mt-6">
                        <section className="bg-orange-100 col-span-8 p-4">
                           <form action="#" method="post" className="flex flex-col items-center w-4/5 mx-auto">
                              <h2 className="text-2xl font-semibold text-center mb-6">Мои данные</h2>
                              <div className="w-full mb-4">
                                 <ButtonLink />
                              </div>
                              <div className="w-full my-2 text-center text-gray-500">или</div>
                              <div className="w-full mb-6">
                                 <label htmlFor="fullname" className="block text-xl font-bold text-black-700">Имя, Фамилия</label>
                                 <input
                                    type="text"
                                    id="fullname"
                                    placeholder="Владимир Зеленский"
                                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                 />
                              </div>
                              <div className="w-full mb-6">
                                 <label htmlFor="email" className="block text-xl font-bold text-black-700">Електронная почта</label>
                                 <input
                                    type="email"
                                    placeholder="example@mail.com"
                                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    autoComplete="username"
                                 />
                              </div>
                              <button type="submit" className="submitButton w-full mb-10">Зареестрироватся</button>
                           </form>
                        </section>
                        <div className='col-span-4'>
                           <section className="bg-orange-100 p-8">
                              <h2 className="text-2xl font-bold mb-6">Итог к оплате</h2>
                              <section className="grid grid-cols-12 gap-4 mb-8 font-bold">
                                 <span className="col-span-8">Каличество товаров:</span>
                                 <span className="text-xl"> {totalQuantity}</span>
                                 <span className="col-span-8">К оплате</span>
                                 <span className="text-2xl">{totalCoust}</span>
                              </section>
                              <ButtonProduct onClick={Order} name="Оформление заказа" />
                           </section>
                        </div>

                        <section className="col-span-8 mt-6 mb-12">
                           <h2 className="text-2xl font-bold ">Мои заказы</h2>
                           {

                              basket.map(item => (
                                 <CartItem
                                    key={item.id}
                                    idProduct={item.id}
                                    title={item.title}
                                    price={item.price}
                                    quantity={item.quantity}
                                    categories={item.categories}
                                    images={item.images}
                                    onUpdateQuantity={onUpdateQuantity}
                                    onRemove={onRemove}
                                 />
                              ))
                           }
                        </section>
                     </div>
                  )
               }
            </div >
         )}
      </MainLayout>
   )
}