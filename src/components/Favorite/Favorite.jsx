import { Link } from "react-router-dom";
import WhiteButton from "../buttons/WhiteButton/WhiteButton";
import CartFavoriteProduct from "../goods/CartFavoriteProduct";

export function FavoriteMain({ favorite, onRemove }) {
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
               {favorite.map(item => (
                  <CartFavoriteProduct
                     key={item.id}
                     idProduct={item.id}
                     title={item.title}
                     price={item.price}
                     categories={item.categories}
                     images={item.images}
                     onRemove={() => onRemove(item.id)}
                  />
               ))}
            </div>
         </div>
      </>
   );
}