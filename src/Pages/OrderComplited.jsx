import { Link, useParams } from "react-router-dom";
import MainLayout from "../layouts/main";
import { ButtonL } from "../components/buttons/button";

export function OrderCompleted() {
   const { idOrder } = useParams();


   return (
      <MainLayout body="flex flex-col min-h-screen">
         <main className="flex justify-center items-center gap-4 flex-col my-10 mt-40 lg:mt-10">
            <div>
               <img src="/marketplace/images/main/variable/basket/BasketCompleted.svg" alt="Иконка с галочкой" className="w-50 h-50 object-contain" />
            </div>
            <h1 className="text-2xl font-bold mb-5">Поздравляем</h1>
            <h2 className="text-xl font-normal mb-2">Ваш заказ принят</h2>
            <div className=" text-gray-600 px-4 py-2 rounded-lg text-lg mb-5">
               Номер заказа: <span className="font-bold">{idOrder}</span>
            </div>
            <p className="text-base text-gray-400 mb-8 mx-4">
               Спасибо вам за покупку! Вся детальная информация о заказе уже отправлена вам на почту.
            </p>
            <Link to='/'>
               <ButtonL name={'Продолжить покупки'} />
            </Link>
         </main>
      </MainLayout>
   )
}