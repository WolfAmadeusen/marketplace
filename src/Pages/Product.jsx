import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import styles from './style/pagesStyle.module.css';
import './style/ProductAdaptive.css';

import MainLayout from "../layouts/main";
import CommentModal from "../components/Modal/CommentModal";
import RegistrationModal from "../components/Modal/RegistrationModal";
import Feedback from "../components/Feedback/Feedback";
import { ButtonProduct } from "../components/buttons/button";
import Specifications from '../components/Specifications/Specifications';
import WhiteButton from "../components/buttons/WhiteButton/WhiteButton";
import Triarty from "../components/buttons/Triarty/Triarty";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import { getProductById } from "../services/getProductApi";

export default function Product() {

   //Получение одного товара из API
   const { id } = useParams(); // Получаем id из роутов
   const [product, setProduct] = useState(null);
   const [error, setError] = useState(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [likeProduct, setLikeProduct] = useState(false);
   const [userStatus, setUserStatus] = useState(false);
   const [isRegisterModal, setRegisterModal] = useState(false);
   const [width, setWidth] = useState(window.innerWidth);

   useEffect(() => {
      const fetchProduct = async () => {
         try {
            const data = await getProductById(id);
            setProduct(data);
         } catch (err) {
            setError(err.message);
         }
      };

      fetchProduct();
   }, [id]);

   //Адаптив
   useEffect(() => {
      if (localStorage.getItem('accessToken')) {
         setUserStatus(true);
      }

      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, []);


   function buyProduct() {
      let item = {
         id: product.productCode,
         title: product.title.ru,
         price: product.price,
         quantity: 1,
         categories: product.parentCategory,
         images: product.pictureUrl,
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
   
      console.log(item);   
      console.log('Товар добавлен в карзину');
   }

   const handleLike = () => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
         let item = {
            id: product.productCode,
            title: product.title.ru,
            price: product.price,
            quantity: 1,
            categories: product.parentCategory,
            images: product.pictureUrl,
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

         console.log(item);   
         console.log('Поставили лайк на товар');
      } else { alert('Вы не вошли в аккаунт') }
   };

   const handleModal = () => {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
         setIsModalOpen(true);
         setLikeProduct(false);
      } else {
         alert('Для того чтобы оставить отзыв, вам нужно авторизоваться');
      }
   };

   const closeModal = () => {
      setIsModalOpen(false);
   };

   //вставка звёзд
   const
      starFill = '/images/goods/star-fill.png',
      starTransparency = '/images/goods/star-transparency.png',
      renderStars = (width = '', hight = '') => {
         // Генерация случайного количества звезд
         const fullStars = product.grade; //Получения количество звёзд
         const stars = [];
         for (let i = 1; i <= 5; i++) {
            stars.push(
               <img
                  key={i}
                  src={i <= fullStars ? starFill : starTransparency}
                  alt="star"
                  width={width}
                  height={hight}
               />
            );
         }
         return stars;
      };

   //Водные данные для характеристики
   const specificationsData = [
      {
         title: "Экран",
         items: [
            { name: "Диагональ экрана", value: "16.2" },
            { name: "Частота обнавления экрана", value: "120 Гц" },
            { name: "Тип экрана", value: "Liquid Retina XDR" },
            { name: "Разрешение", value: "3456х2234" },
            { name: "Покрытие экрана", value: "Глянцевое" },
            { name: "Встроенная камера", value: "FaceTime HD 1080p" },
         ],
      },
      {
         title: "Процессор",
         items: [
            { name: "Процессор", value: "Двенадцатиядерный Apple M3 Pro" },
            { name: "Операционная система", value: "macOS Sonoma" },
         ],
      },
      {
         title: "Оперативная память",
         items: [{ name: "Объем оперативной памяти", value: "16 ГБ" }],
      },
      {
         title: "Накопители данных",
         items: [
            { name: "Объём SSD", value: "512 ГБ" },
            { name: "Тип накопителя", value: "SSD" },
            { name: "Количество слотов M.2", value: "Без слота M.2" },
         ],
      },
      {
         title: "Видеокарта",
         items: [
            { name: "Производитель видеокарты", value: "Apple" },
            { name: "Тип видеокарты", value: "Встроенная" },
         ],
      },
   ];

   //Скрол
   let
      specificationsRef = useRef(false),
      feedbackRef = useRef(false);
   const scrollToSection = (ref) => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

   return (
      <MainLayout body="flex flex-col min-h-screen" main="flex-grow">
         <div className="lg:pl-10 lg:pt-10">
            {
               width >= 760 ? (
                  product ? (
                     <Breadcrumbs
                        parentCategory={product.parentCategory}
                        subCategory={product.category}
                        productId={id}
                        productName={product.title.ru}
                     />
                  ) : (
                     <div className="h-full mb-6">
                        <ClipLoader color="#FFA500" size={20} />
                     </div>
                  )
               ) : null
            }
            {
               product ? (
                  <div className="adaptiveProduct grid grid-cols-1 lg:grid-cols-2 items-stretch lg:mb-32 ">
                     {/* Заголовок товара */}
                     <section className="md:ml-4">
                        <h1 className={styles.productName}>{product.title.ru}</h1>
                     </section>

                     {/* Кнопки: просмотр товара и характеристики */}
                     <div>
                        <Triarty
                           specificationsRef={specificationsRef}
                           feedbackRef={feedbackRef}
                           totalReviews={product.coments.length}
                           scrollToSection={scrollToSection}
                        />
                     </div>

                     {/* Product images */}
                     <section className="bg-orange-100 p-6 lg:mt-10">
                        <img className={styles.pictureUrl} src={product.pictureUrl} alt="images" />
                     </section>

                     {/* Product info */}
                     <section className="bg-orange-100 p-6 flex flex-col gap-14 sm:gap-8 lg:mt-10">
                        <h2 className={styles.ProductSubTitle}>{product.title.ru}</h2>
                        {
                           width < 770 ? (
                              <>
                                 <section className="flex flex-col justify-between gap-4">

                                    {/* Звезды и наличие */}
                                    <section className="flex items-center gap-8 mb-4">
                                       <section className="flex gap-4">{renderStars(30, 30)}</section>
                                       <div className={styles.ProductAvailability}>В наличии</div>
                                    </section>
                                    <article className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 md:gap-10">
                                       {/* Информация о товаре */}
                                       <section className={styles.productInfo}>
                                          <div className="mb-2 md:mb-4">Имя продавца: {product.seller}</div>
                                          <div>Код товара: {product.productCode}</div>
                                       </section>

                                       {/* Цена */}
                                       <span className="priceProduct text-black font-bold mt-4 md:mt-0">
                                          {product.price}
                                       </span>
                                    </article>
                                 </section>
                                 <section className="buttons flex flex-col items-center gap-6 relative">
                                    <button
                                       onClick={buyProduct}
                                       className="w-full relative text-xl text-gray-700 font-600 rounded bg-orange-500 py-4">
                                       <img src="/images/main/variable/basket/BasketMain.svg" alt="images" />
                                       Купить
                                    </button>
                                    <button
                                       onClick={handleLike}
                                       className="w-full relative text-xl text-gray-700 font-semibold bg-inherit border-2 border-orange-500 rounded py-4">
                                       <img src="/images/main/variable/heart/heartMain.svg" alt="images" />
                                       В корзину
                                    </button>
                                 </section>
                              </>
                           ) : (
                              <>
                                 <section className="flex items-center">
                                    <section className="flex gap-4 mr-6">{renderStars()}</section>
                                    <div className={styles.ProductAvailability}>  В наличии</div>
                                 </section>

                                 <section className={styles.productInfo}>
                                    <div className="mb-4">Имя продавца: {product.seller}</div>
                                    <div>Код товара:  {product.productCode}</div>
                                 </section>
                                 <section className="flex gap-6 items-center relative">
                                    <div className={styles.ProductPrice}>{product.price}</div>
                                    <ButtonProduct
                                       onClick={buyProduct}
                                       name={'Купить'}
                                    />
                                    <WhiteButton
                                       className='p-2'
                                       onClick={handleLike}>
                                       <img src="/images/main/variable/heart/heartMain.svg" alt="heart" />
                                    </WhiteButton>
                                 </section>
                              </>
                           )
                        }
                     </section>
                  </div>
               ) : (
                  // Загрузка, для того чтобы успели подгрузиться информация
                  <div className="flex justify-center items-center h-full">
                     <ClipLoader color="#FFA500" size={60} />
                  </div>
               )
            }

            {/* Характеристики */}
            <Specifications ref={specificationsRef} data={specificationsData} />

            <section className="my-6 md:my-10 flex flex-col md:flex-row items-center gap-4 md:gap-10 md:ml-8" ref={feedbackRef}>
               {/* Заголовок "Отзывы" */}
               <span className="text-3xl md:text-4xl font-bold">
                  Отзывы
               </span>

               {/* Кнопка "Оставить отзыв" */}
               <button
                  className="text-gray-500 hover:text-orange-300 active:text-orange-600 transition-colors text-lg md:text-base"
                  onClick={handleModal}
               >
                  Оставить отзыв
               </button>
            </section>

            {/* Комментарии */}
            {product ? (
               product.coments && product.coments.length > 0 ? (
                  // Если есть комментарии, рендерим их
                  product.coments.map((comment, index) => (
                     <Feedback
                        key={index}
                        name={comment.author}
                        text={comment.content}
                        date={comment.createdAt}
                        grade={comment.grade}
                     />
                  ))
               ) : (
                  <p className="my-10 text-center text-gray-500">
                     <span className="text-3xl text-orange-500">📭</span>
                     <span className="block mt-2 text-lg font-semibold text-gray-600">
                        Нету тут комментариев
                     </span>
                     <span className="block text-sm text-orange-400 mt-1">
                        Будьте первым, кто оставит отзыв!
                     </span>
                  </p>
               )
            ) : (
               // Загрузка
               <div className="flex justify-center items-center h-full mb-20">
                  <ClipLoader color="#FFA500" size={60} />
               </div>
            )}
         </div>

         {/* Модальное окно */}
         {isModalOpen && <CommentModal isOpen={isModalOpen} onClose={closeModal} idProduct={id} />}
         {isRegisterModal && <RegistrationModal isOpen={isModalOpen} onClose={closeModal} />}
      </MainLayout >
   )
}