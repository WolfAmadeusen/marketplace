import './Header.css'
import { Link } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import SearchForm from '../search/searchForm'
import LoginModal from '../Modal/LoginModal';
import { useEffect, useState } from 'react';
import HeaderAdaptive from './headerAdaptive';

export default function Header() {
   const { isModalOpen, modalType, openModal, closeModal } = useModal();
   const [addProduct, setAddProduct] = useState(false);
   const [basket, setBasket] = useState([]);
   const [isMenuOpen, setIsMenuOpen] = useState(false);


   useEffect(() => {
      // Получаем данные из localStorage при загрузке компонента
      const savedBasket = JSON.parse(localStorage.getItem('basket')) || [];
      setBasket(savedBasket);
   }, []);

   const toggleMenu = () => {
      document.body.style.overflow = 'hidden';
      setIsMenuOpen(!isMenuOpen);
   }

   const handleClick = (event) => {
      if (localStorage.getItem('accessToken')) {
         navigate("/api/basket");
      } else {
         event.preventDefault();
         let register = confirm("Вы не зарегистрированы! Хотите зарегистрироваться?");
         register ? openModal("register") : null;
      }
   };

   return (
      <>
         <header className="flex justify-between items-center bg-black p-6 sm:p-4 fixed__header">
            <section className="logo">
               <div className='md:p-4'>
                  <h1 className="font-bold none"><Link to='/'>Shopilyze</Link></h1>
                  <button className="navbar-toggle view" onClick={toggleMenu}>☰</button>
               </div>
               {/* Выпадающее меню */}
               {isMenuOpen && (<HeaderAdaptive />)}
            </section>

            <section className="header-tools flex items-center justify-between space-x-6 none">
               <div className="flex items-center gap-4">
                  {addProduct && (
                     <div className="admin__button">
                        <Link to={'/'}>Добавить объявление</Link>
                     </div>
                  )}
                  <SearchForm />
                  <select name="lang" className="select-lang">
                     <option value="RU">RU</option>
                     <option value="UA">UA</option>
                  </select>
               </div>
               <div className="header-navigation flex gap-6 pl-6">
                  <Link to="/profile" onClick={handleClick}>
                     <img
                        src="/marketplace/images/main/human.svg"
                        width="40px"
                        height="auto"
                        alt="Profile"
                        onMouseEnter={(e) => e.target.src = "/marketplace/images/main/variable/human/hover.svg"}
                        onMouseLeave={(e) => e.target.src = "/marketplace/images/main/variable/human/main.svg"}
                     />
                  </Link>
                  <div className='relative'>
                     <Link to="/api/basket" >
                        <img
                           src="/marketplace/images/main/variable/basket/basket.svg"
                           width="40px"
                           height="auto"
                           alt="bassket"
                           onMouseEnter={(e) => e.target.src = "/marketplace/images/main/variable/basket/hover.svg"}
                           onMouseLeave={(e) => e.target.src = "/marketplace/images/main/variable/basket/basket.svg"}
                        />
                     </Link>
                     {basket && <span className='absolute text-base font-bold right-0 top-0 text-red-600'>{basket.length}</span>}
                  </div>
                  <Link to="/profile/favorite" onClick={handleClick}>
                     <img
                        src="/marketplace/images/main/variable/heart/heart.svg"
                        width="40px"
                        height="auto"
                        alt="heart"
                        onMouseEnter={(e) => e.target.src = "/marketplace/images/main/variable/heart/hover.svg"}
                        onMouseLeave={(e) => e.target.src = "/marketplace/images/main/variable/heart/heart.svg"}
                     />
                  </Link>
               </div>
               {modalType && <LoginModal isOpen={isModalOpen} onClose={closeModal} />}
            </section>

            {/* Адаптивная версия */}
            <section className="view mr-6">
               <div className="header-tools flex items-center justify-between gap-6 sm:gap-4">
                  <div className='relative'>
                     <Link to="/api/basket" >
                        <img
                           src="/marketplace/images/main/variable/basket/basket.svg"
                           width="40px"
                           height="auto"
                           alt="bassket"
                           onMouseEnter={(e) => e.target.src = "/marketplace/images/main/variable/basket/hover.svg"}
                           onMouseLeave={(e) => e.target.src = "/marketplace/images/main/variable/basket/basket.svg"}
                        />
                     </Link>
                     {basket && <span className='absolute text-base font-bold right-0 top-0 text-red-600'>{basket.length}</span>}
                  </div>
                  <div className="relative">
                     <Link to={'/profile/favorite'}>
                        <img
                           src="/marketplace/images/main/variable/heart/heart.svg"
                           width="40px"
                           height="auto"
                           alt="heart"
                        />
                     </Link>
                  </div>
                  <button>
                     <img src="/marketplace/images/main/search.svg" alt="search" draggable="false" width="40px" height="40px" />
                  </button>
               </div>
            </section>

         </header >
      </>
   )
}
