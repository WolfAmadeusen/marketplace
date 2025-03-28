import React from "react";
import './Specifications.css';

const Specifications = React.forwardRef(({ data }, ref) => {
   return (
      <div>
         {/* Заголовок */}
         <h1 ref={ref} className="text-2xl md:text-4xl font-bold mb-6 mt-10 md:ml-4">
            Характеристики
         </h1>

         {/* Контейнер с характеристиками */}
         <article className="bg-orange-100 p-4 md:p-8">
            {data.map((category, index) => (
               <div key={index} className="mb-6 md:mb-10">
                  {/* Заголовок категории */}
                  <span className="font-bold text-lg md:text-xl grid col-span-1 md:col-span-3 category-title">
                     {category.title}
                  </span>

                  {/* Список характеристик */}
                  <section className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mt-2 md:mt-4">
                     {category.items.map((item, i) => (
                        <React.Fragment key={i}>
                           {/* Название характеристики */}
                           <div className="p-1 md:p-2 item-name">
                              {item.name}
                           </div>

                           {/* Значение характеристики */}
                           <div className="col-span-1 md:col-span-2 item-value">
                              {item.value}
                           </div>
                        </React.Fragment>
                     ))}
                  </section>
               </div>
            ))}
         </article>
      </div>
   );
});

export default Specifications;
