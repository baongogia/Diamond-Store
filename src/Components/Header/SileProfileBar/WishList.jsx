import React, { useContext } from "react";
import { WishlistContext } from "./WishlistContext";
import ProductCard from "../../Content/Product/ProductCard";

export default function WishList() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  return (
    <div className="relative w-[72%] h-[73vh] grid grid-cols-2 font-serif">
      <div className="grid grid-cols-2 gap-10">
        {wishlist.length > 0 ? (
          wishlist.map((item, index) => (
            <div key={index} className="relative">
              <ProductCard
                id={item.productID}
                img={item.image}
                hovimg={item.image}
                name={item.name}
                material={item.material}
                price={parseFloat(item.price).toFixed(2)}
                mini={false}
              />
              <button
                onClick={() => removeFromWishlist(item.productID)}
                className="absolute border-black border bottom-26 px-[4.6em] py-1 bg-black text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                <div className="text-nowrap">Remove from wishlist</div>
              </button>
            </div>
          ))
        ) : (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            Please add products to your wish list {`:>`}
          </div>
        )}
      </div>
    </div>
  );
}
