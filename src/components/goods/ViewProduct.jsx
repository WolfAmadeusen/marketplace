import Title from '../Title';
import ClipLoader from "react-spinners/ClipLoader";
import Product from '../goods/Product';
import './Product.css'


export default function ViewProduct({ products, title, link, buttonRight }) {
   // Рандомное добавление товаров
   const getRandomProducts = (products, count) => {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
   };
   const randomFourGoods = products ? getRandomProducts(products, 4) : [];

   return (
      <>
         <Title text={title} link={link} buttonRight={buttonRight} target='_blank' />
         <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {products && products.length > 0 ? (
               randomFourGoods.map((product) => (
                  <Product
                     key={product.id}
                     id={product.id}
                     idProduct={product.productCode}
                     pictureUrl={product.pictureUrl}
                     price={product.price}
                     category={product.category}
                     title={product.title.ru}
                  />
               ))
            ) : (
               <div className="col-span-full flex justify-center items-center py-10">
                  <ClipLoader color="#FFA500" size={60} /> {/* Загрузка */}
               </div>
            )}
         </section>
      </>
   );
}