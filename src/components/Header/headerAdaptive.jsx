import { useState } from "react";
import { Link } from "react-router-dom";
import './Header.css';

export default function HeaderAdaptive() {
   const [isOpen, setIsOpen] = useState(true);

   const closeMenu = () => {
      document.body.style.overflow = 'visible';
      setIsOpen(false);
   };

   if (!isOpen) {
      return null;
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
      <div className="header-adaptive">
         <section className="toggle-menu-search relative ">
            <button className="close-button" onClick={closeMenu}>
               &times;
            </button>

            <div className="menu">
               <Link
                  to={('/')}
                  className="menu-item"
                  onClick={() => {
                     return document.body.style.overflow = 'visible';
                  }}
               >
                  <img
                     src="/marketplace/images/main/variable/house/houseAdaptive.svg"
                     width="30px"
                     height="auto"
                     alt="Home"
                  />
               </Link>

               <Link to={'/profile'} onClick={handleClick} className="menu-item">
                  <img
                     src="/marketplace/images/main/variable/human/main.svg"
                     width="30px"
                     height="auto"
                     alt="Profile"
                  />
               </Link>
               <select name="lang" className="select-lang">
                  <option value="RU">RU</option>
                  <option value="UA">UA</option>
               </select>
            </div>

            <ul className="main-menu flex flex-col gap-8">
               <li>
                  <Link to={"/api/product/productByCategory/0"}>
                     <span>Мобильная техника и электроника</span>
                     <img src="/marketplace/images/main/variable/arrow/arow.svg" alt="img" />
                  </Link>
               </li>
               <li>
                  <Link to={"/api/product/productByCategory/1"}>
                     <span>Компьютеры</span>
                     <img src="/marketplace/images/main/variable/arrow/arow.svg" alt="img" />
                  </Link>
               </li>
               <li>
                  <Link to={"/api/product/productByCategory/2"}>
                     <span>Комплектующие</span>
                     <img src="/marketplace/images/main/variable/arrow/arow.svg" alt="img" />
                  </Link>
               </li>
               <li>
                  <Link to={"/api/product/productByCategory/3"}>
                     <span>string</span>
                     <img src="/marketplace/images/main/variable/arrow/arow.svg" alt="img" />
                  </Link>
               </li>
            </ul>

            <div className="additional-links">
               <h6>Партнерам</h6>
               <span className="mb-4"><Link to={'/'}>Продавать на Shopilyze</Link></span>
               <h6>Продавцам</h6>
               <span><Link to={'/'}>Чат с продавцами</Link></span>
            </div>
         </section >
      </div >
   );
}