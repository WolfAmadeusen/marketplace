import React from 'react';
import WhiteButton from '../../buttons/WhiteButton/WhiteButton';
import './CartItem.css';

const CartItem = ({ title, idProduct, categories, price, quantity, images, onRemove, onUpdateQuantity }) => {

   const handleQuantityChange = (event) => {
      const newQuantity = parseInt(event.target.value, 10);
      if (!isNaN(newQuantity) && newQuantity >= 1) { // Минимальное значение — 1
         onUpdateQuantity(idProduct, newQuantity);
      }
   };

   const handleIncrement = () => {
      const newQuantity = quantity + 1; // Увеличиваем количество на 1
      onUpdateQuantity(idProduct, newQuantity);
   };

   const handleDecrement = () => {
      if (quantity > 1) { // Проверяем, что количество больше 1
         const newQuantity = quantity - 1; // Уменьшаем количество на 1
         onUpdateQuantity(idProduct, newQuantity);
      }
   };

   const handleRemove = () => {
      onRemove(idProduct);
   };

   return (
      <div className="container mx-auto bg-orange-100 p-6 my-6 flex flex-col md:flex-row lg:justify-between items-center">
         {/* Блок с изображением и информацией */}
         <div className='flex flex-col md:flex-row gap-4 md:gap-14 items-center w-full md:w-auto'>
            {/* Изображение */}
            <img
               src={images}
               alt="Image"
               className="images md:w-55 md:h-55 object-cover rounded-lg"
            />
            {/* Информация о товаре */}
            <div className='info text-center md:text-left'>
               <h4 className="font-bold text-xl md:text-2xl mb-2">{title}</h4>
               <p className="text-gray-500 mb-2">{categories}</p>
               <p className="text-gray-500">ID: {idProduct}</p>
               {/* Управление количеством */}
               <div className='flex gap-2 mt-2 items-center justify-center md:justify-start quantity'>
                  <button
                     onClick={handleDecrement}
                     className="px-3 py-1 rounded-lg"
                  >
                     -
                  </button>
                  <input
                     type="number"
                     placeholder='Количество товара'
                     value={quantity}
                     onChange={handleQuantityChange}
                     min="1"
                     className="text-center border rounded-lg"
                  />
                  <button
                     onClick={handleIncrement}
                     className="px-3 py-1 rounded-lg"
                  >
                     +
                  </button>
               </div>
            </div>
         </div>

         {/* Блок с ценой и кнопкой удаления */}
         <div className="items-center flex flex-col md:flex-row gap-4 md:gap-6 mt-4 md:mt-0">
            <span className='font-bold text-2xl md:text-3xl priceItem'>
               {price.toLocaleString('ru-RU')}
            </span>
            <WhiteButton
               onClick={handleRemove}
               className='flex justify-center items-center px-4 py-2 font-600 bg-white border rounded-lg'
            >
               Удалить
            </WhiteButton>
         </div>
      </div>
   );
};

export default CartItem;