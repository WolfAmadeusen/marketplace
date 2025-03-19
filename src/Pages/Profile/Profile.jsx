import { Link, useNavigate } from "react-router-dom";
import { getUserData } from "../../services/auth/getDataUser";
import MainLayout from '../../layouts/main';
import CatalogProfile from "../../components/Catalog/CatalogProfile";

export default function Profile() {
   const navigate = useNavigate();
   const token = localStorage.getItem('accessToken');
   const userData = getUserData(token);
   const status = userData.role;
   localStorage.setItem('userData', userData);

   if (!token) {
      setTimeout(() => {
         alert('Вы не можете зайти у вас нету аккаунта')
      }, 50);
      return navigate('/');
   }

   return (
      <MainLayout main="flex flex-col sm:flex-row mt-10 mb-8 gap-4 sm:gap-8 px-4 sm:px-8" body="bg-orange-50">
         <CatalogProfile />
         <main className="p-6 flex flex-grow flex-col">
            {/* Профиль пользователя */}
            <article className="border-2 border-gray-500 rounded-lg p-6 mb-10 flex flex-col md:flex-row justify-between items-center w-full">
               <div className="flex items-center w-full mb-4 md:mb-0">
                  <div className="w-20 h-20 bg-slate-400 rounded-xl"></div>
                  <span className="font-600 text-xl text-gray-600 ml-6">{userData.name}</span>
               </div>
               {/* Кнопка "Изменить" */}
               <button className="border-orange-500 border-2 rounded-md hover:bg-orange-300 transition duration-300 py-2 px-8 font-600 text-gray-700 text-xl w-full md:w-auto">
                  Изменить
               </button>
            </article>

            {/* Личная информация */}
            <article className="mb-10 border-2 border-gray-500 rounded-lg p-6">
               <div className="flex flex-col md:flex-row justify-between items-center w-full mb-4">
                  <h2 className="font-bold text-2xl text-slate-700 mb-4 md:mb-0">Личная информация</h2>
                  <button className="border-orange-500 border-2 rounded-md hover:bg-orange-300 transition duration-300 py-2 px-8 font-600 text-gray-700 text-xl w-full md:w-auto">
                     Редактировать
                  </button>
               </div>

               <table className="table-auto border-collapse mb-6 w-full">
                  <tbody>
                     <tr>
                        <td className="px-4 py-2 font-medium">Дата реестрации:</td>
                        <td className="px-4 py-2 font-bold text-gray-700"> - Не указано</td>
                     </tr>
                     <tr>
                        <td className="px-4 py-2 font-medium">Страна, город:</td>
                        <td className="px-4 py-2 font-bold text-gray-700"> - Не указано</td>
                     </tr>
                     <tr>
                        <td className="px-4 py-2 font-medium">Дата рождения:</td>
                        <td className="px-4 py-2 font-bold text-gray-700"> - Не указано</td>
                     </tr>
                     <tr>
                        <td className="px-4 py-2 font-medium">Email:</td>
                        <td className="px-4 py-2 font-bold text-gray-700">{userData.email}</td>
                     </tr>
                     <tr>
                        <td className="px-4 py-2 font-medium">Телефон:</td>
                        <td className="px-4 py-2 font-bold text-gray-700"> - Не указано</td>
                     </tr>
                  </tbody>
               </table>
            </article>

            {/* Платежная информация */}
            <article className="mb-10 border-2 border-gray-500 rounded-lg p-6 h-[60vh]">
               <h2 className="text-2xl text-gray-800">Платежная информация</h2>
            </article>
         </main>
      </MainLayout>
   );
}
