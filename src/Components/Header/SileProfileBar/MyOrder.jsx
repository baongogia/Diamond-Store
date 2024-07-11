import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Login/UserContext";
import ProductCard from "../../Content/Product/ProductCard";
import { RingLoader } from "react-spinners";

export default function MyOrder() {
  const { userData } = useContext(UserContext);
  const username = userData?.UserName;
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://diamondstoreapi.azurewebsites.net/api/Order/OrderHistory?username=${username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOrderHistory(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };
    // Initial fetch
    fetchOrderHistory();
    return () => clearInterval();
  }, [username]);

  return (
    <div className="w-[72%] h-screen flex justify-center">
      <div className="w-full grid grid-cols-2 gap-4">
        {loading ? (
          <div className="w-[60vw] h-[60vh] flex justify-center items-center">
            <RingLoader size={85} color="#54cc26" />
          </div>
        ) : (
          orderHistory.map((order) =>
            order.products.map((product) => (
              <ProductCard
                key={product.OrderDetailID}
                id={product.ProductID}
                img={product.Image}
                hovimg={product.Image}
                name={product.ProductName}
                material={product.Material}
                price={parseFloat(product.Price).toFixed(2)}
                mini={false}
              />
            ))
          )
        )}
      </div>
    </div>
  );
}
