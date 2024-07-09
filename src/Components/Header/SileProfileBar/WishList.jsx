import React, { useContext } from "react";
import { WishlistContext } from "./WishlistContext";
import ProductCard from "../../Content/Product/ProductCard";

export default function WishList() {
  const { wishlist } = useContext(WishlistContext);
  return (
    <div className="w-[72%] h-[73vh] grid grid-cols-2 font-serif">
      <div className="">
        {wishlist.length > 0 ? (
          wishlist.map((wishlist, index) => (
            <ProductCard
              key={index}
              id={wishlist.productID}
              img={wishlist.image}
              hovimg={wishlist.image}
              name={wishlist.name}
              material={wishlist.material}
              price={parseFloat(wishlist.price).toFixed(2)}
              mini={false}
            />
          ))
        ) : (
          <div className="w-[60vw] h-[63vh] flex justify-center items-center">
            Please add products to your wish list {`:>`}
          </div>
        )}
      </div>
    </div>
  );
}
