import React from 'react';
import './triarty.css';


export default function Triarty({ specificationsRef, feedbackRef, totalReviews, scrollToSection }) {
   return (
      <section className={`flex items-start gap-6 md:ml-4 lg:pl-6 sm:my characteristics`}>
         <button onClick={() => scrollToSection(specificationsRef)}>
            Характеристики
         </button>
         <button onClick={() => scrollToSection(feedbackRef)}>
            Отзывы <span className='text-gray-500'>{totalReviews}</span>
         </button>
      </section>
   );
}
