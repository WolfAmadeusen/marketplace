import { formatDate } from '../../utils/FormateDate';
import RenderStars from '../Stars/RenderStar';

const Feedback = ({ name, date, text, grade }) => {
   const formattedDate = formatDate(date);

   return (
      <div className="p-6 md:p-10 bg-orange-100 mb-6 rounded-lg">
         <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-4 items-start md:items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center">
               <span className="text-lg md:text-xl font-semibold text-gray-900">
                  {name}
               </span>
               <section className="flex gap-2">
                  {RenderStars(grade)}
               </section>
            </div>
            <div className="text-sm md:text-lg font-semibold text-gray-700">
               {formattedDate}
            </div>
         </div>
         <p className="text-base md:text-lg text-gray-600">
            {text}
         </p>
      </div>
   );
};

export default Feedback;
