import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import categoriesWithImages from "../../utils/profileImages";
import "./Catalog.css";
import ClipLoader from "react-spinners/ClipLoader";

export default function CatalogProfile() {
   const [activeIndex, setActiveIndex] = useState(null);
   const [hoveredIndex, setHoveredIndex] = useState(null);
   const [catalogElements, setCatalogItems] = useState([]);
   const navigate = useNavigate();

   const goToProduct = (id) => navigate(`/api/product/productByCategory/${id}`);


   useEffect(() => {
      const fetchData = async () => {
         try {
            const CatalogData = categoriesWithImages.map(({ name, images }) => ({
               name,
               image: {
                  main: images[0],
                  hover: images[1],
                  press: images[2]
               }
            }));
            setCatalogItems(CatalogData);
         } catch (error) {
            console.error("Ошибка загрузки каталога", error);
         }
      };
      fetchData();
   }, []);

   return (
      <article className="catalog p-4 sm:p-6 w-full sm:w-1/4">
         {/* Заголовок */}
         <h3 className="font-bold text-xl mb-4 mt-28 md:mt-4 sm:mb-6 sm:text-2xl">Мой профиль</h3>

         {/* Секция с элементами каталога */}
         <section className="catalog-items">
            {catalogElements.length > 0 ? (
               catalogElements.map((item, index) => (
                  <div
                     key={index}
                     className={`catalog-item p-3 sm:p-4 mb-3 sm:mb-4 rounded-lg transition-all duration-300 ${activeIndex === index}`}
                     onClick={() => goToProduct(index)}
                     onMouseEnter={() => setHoveredIndex(index)}
                     onMouseLeave={() => setHoveredIndex(null)}
                  >
                     <div className="catalog__section flex items-center relative">
                        {/* Изображение */}
                        <img
                           src={
                              hoveredIndex === index
                                 ? item.image.hover
                                 : activeIndex === index
                                    ? item.image.press
                                    : item.image.main
                           }
                           alt="Картинка"
                           className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                        />

                        {/* Название элемента */}
                        <span className="ml-3 sm:ml-4 text-sm sm:text-base">
                           {item.name}
                        </span>

                        {/* Стрелка */}
                        <img
                           src={
                              hoveredIndex === index
                                 ? '/marketplace/images/main/variable/arrow/Arrow_right-hover.svg'
                                 : activeIndex === index
                                    ? '/marketplace/images/main/variable/arrow/press.png'
                                    : '/marketplace/images/main/variable/arrow/arrow_right.svg'
                           }
                           className="arrow absolute top-1/2 right-0 transform -translate-y-1/2 sm:w-5 sm:h-5"
                           alt="arrow"
                        />
                     </div>
                  </div>
               ))
            ) : (
               // Индикатор загрузки, если элементов нет
               <div className="flex justify-center items-center h-40">
                  <ClipLoader color="#FFA500" size={50} />
               </div>
            )}
         </section>
      </article>
   );
}