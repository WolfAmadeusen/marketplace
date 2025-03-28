import { Link } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import LoginModal from '../Modal/LoginModal';
import './Product.css'

export default function Product({ id,idProduct, price, title, pictureUrl, category }) {
   const { isModalOpen, modalType, openModal, closeModal } = useModal();

   function buyProduct(event) {
      event.preventDefault();
      let item = {
         id: idProduct,
         title: title,
         price: price,
         quantity: 1,
         categories: category,
         images: pictureUrl,
      }

      // Получаем текущую корзину из localStorage
      const basket = JSON.parse(localStorage.getItem('basket')) || [];

      // Проверяем, есть ли уже такой товар в корзине
      const existingItem = basket.find((i) => i.id === item.id);

      if (existingItem) {
         // Если товар уже есть, увеличиваем его количество
         existingItem.quantity += 1;
      } else {
         // Если товара нет, добавляем его в корзину
         basket.push(item);
      }

      // Сохраняем обновлённую корзину в localStorage
      localStorage.setItem('basket', JSON.stringify(basket));
   }

   const handleLike = (event) => {
      event.preventDefault();
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
         let item = {
            id: idProduct,
            title: title,
            price: price,
            quantity: 1,
            categories: category,
            images: pictureUrl,
         }
         // Получаем текущую корзину из localStorage
         const favorite = JSON.parse(localStorage.getItem('favorite')) || [];
         // Проверяем, есть ли уже такой товар в корзине
         const existingItem = favorite.find((i) => i.id === item.id);
         if (existingItem) {
            // Если товар уже есть, увеличиваем его количество
            existingItem.quantity += 1;
         } else {
            // Если товара нет, добавляем его в корзину
            favorite.push(item);
         }

         // Сохраняем обновлённую корзину в localStorage
         localStorage.setItem('favorite', JSON.stringify(favorite));
         console.log('Поставили лайк на товар');
      } else {
         let register = confirm("Вы не зарегистрированы! Хотите зарегистрироваться?");
         register ? openModal("register") : null;
      }
   };

   return (
      <div className="product_item bg-orange-50 p-4 max-w-xs mx-auto">
         <div className="mb-4 flex justify-center">
            <Link to={`/api/product/${id}`}>
               <img draggable={"false"} src={pictureUrl} className="imgProduct" alt={title} />
            </Link>
         </div>
         <span className="product_item-title">
            <Link to={`/api/product/${id}`}>{title}</Link>
         </span>
         <section>
            <div className="flex justify-between mt-6 defaultButton ">
               <span className="product_item-price">{price}</span>
               <button onClick={buyProduct}>
                  <img
                     draggable={"false"}
                     src="/marketplace/images/main/variable/basket/BasketMain.svg"
                     className="text-black"
                     width="32px"
                     height="32px"
                     alt="basket"
                     />
               </button>
               <button onClick={handleLike} className="product_item-heart">
                  <img draggable={"false"} src="/marketplace/images/main/variable/heart/heart.svg" alt="heart" />
               </button>
            </div>

            <div className="adaptiveButton">
               <span className="product_item-price">{price}</span><br />
               <div className="flex justify-center flex-col mt-4 buttons">
                  <button
                     onClick={buyProduct}
                     className="relative pl-10"
                  >
                     <img src="/marketplace/images/main/variable/basket/BasketMain.svg" alt="images" /> Купить</button>
                  <button
                     onClick={handleLike}
                     className="relative pl-10"
                  >
                     <img src="/marketplace/images/main/variable/heart/heart.svg" alt="images" /> Сохранить</button>
               </div>
            </div>
         </section>
         {modalType && <LoginModal isOpen={isModalOpen} onClose={closeModal} />}
      </div>
   );
}