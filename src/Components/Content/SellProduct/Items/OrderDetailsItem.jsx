import React, { useContext, useEffect } from "react";
import AOS from "aos";
import OrderItem from "../Items/OrderItem";
import { OrderContext } from "../Order/OrderContext";
import { UserContext } from "../../../Header/Login/UserContext";

export default function OrderDetailsItem() {
  const { order } = useContext(OrderContext);
  const { userData } = useContext(UserContext);
<<<<<<< HEAD
  const date = new Date(order.OrderDate);

  // Cộng thêm 3 ngày
  date.setDate(date.getDate() + 3);

  // Định dạng lại ngày thành chuỗi
  const formattedDate = date.toISOString().slice(0, 10);

=======
  const date = order.OrderDate.slice(0, 10);
>>>>>>> 35e89b8 (Up)
  const product = order.products;

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 2000,
    });
  }, []);

  return (
    <div
      data-aos="fade-left"
      data-aos-duration="1500"
      className="w-1/3 h-[50vh] flex justify-center items-center rounded-2xl border-[0.1em]"
    >
      <div className="w-[90%] h-[90%] flex flex-col justify-between">
        <div className="text text-[1.4em] text-green-800 uppercase">
          Order Details
        </div>
        <div className="h-1/2 overflow-auto">
          {product.length > 0 ? (
            product.map((item) => (
              <OrderItem key={item.id} id={item.id} details={item} />
            ))
          ) : (
            <div className=""></div>
          )}
        </div>
<<<<<<< HEAD
        <div className="Mfont flex flex-col justify-between h-1/3">
=======
        <div className="font-serif flex flex-col justify-between h-1/3">
>>>>>>> 35e89b8 (Up)
          <div className="">
            Customer Name: {userData.FirstName} {userData.LastName}
          </div>
          <div className="">Phone: {userData.PhoneNumber}</div>
          <div className="">Address: {userData.Address}</div>
<<<<<<< HEAD
          <div className="">Expected Delivery Date: {formattedDate}</div>
=======
          <div className="">Expected Delivery Date: {date}</div>
>>>>>>> 35e89b8 (Up)
        </div>
      </div>
    </div>
  );
}
