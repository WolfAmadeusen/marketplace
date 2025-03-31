import React from 'react';
import './CartItem/CartItem.css';
import WhiteButton from '../buttons/WhiteButton/WhiteButton';

const CartFavoriteProduct = ({ title, idProduct, categories, price, images, onRemove }) => {

   const handleRemove = () => {
      onRemove(idProduct);
   };

   return (
      <div className="container mx-auto bg-orange-100 p-6 my-6 gap-4 flex flex-col lg:justify-between items-center">
         {/* Блок с изображением и информацией */}
         <div className='flex flex-col gap-4 md:gap-14 items-center w-full md:w-auto'>
            {/* Изображение */}
            <img
               src={images}
               alt="Image"
               className="images md:w-55 md:h-55 object-cover rounded-lg"
            />
            {/* Информация о товаре */}
            <div className='info md:text-left'>
               <h4 className="font-bold text-xl md:text-2xl mb-2">{title}</h4>
               <p className="text-gray-500 mb-2">{categories}</p>
               <p className="text-gray-500">ID: {idProduct}</p>
            </div>
         </div>

         {/* Блок с ценой и кнопкой удаления */}
         <div className="flex flex-col md:flex-row gap-4 mt-4 md:gap-6 md:mt-0">
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

export default CartFavoriteProduct;