import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "../../../Header/SileProfileBar/WishlistContext";

export default function ShopingBagItems({ item }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useContext(WishlistContext);
  const [notification, setNotification] = useState("");

  const handleWishlistClick = () => {
    if (isInWishlist(item.productID)) {
      removeFromWishlist(item.productID);
      setNotification("Item removed from wishlist");
    } else {
      addToWishlist(item);
      setNotification("Item added to wishlist");
    }

    setTimeout(() => {
      setNotification("");
    }, 3000); // Clear the notification after 3 seconds
  };

  return (
    <div className="relative w-full mt-8 h-[50vh] bg-gray-500 bg-opacity-5 overflow-hidden">
      {notification && (
        <div className="absolute bottom-0 left-0 w-full bg-green-500 text-white text-center py-2">
          {notification}
        </div>
      )}
      <div
        style={{
          backgroundImage: `url(${item.image})`,
        }}
        className="absolute top-8 left-6 w-[29%] h-[60%] bg-cover bg-center bg-no-repeat"
      ></div>
      <div className="absolute top-8 right-20 w-[55%] h-full">
        <div className="w-full flex justify-between">
          <div className="text uppercase text-[1.2em]">{item.name}</div>
          <div className="text uppercase text-[1.2em]">
            {parseFloat(item.price).toFixed(2)}$
          </div>
        </div>
        <div className="grid grid-cols-2 gap-0">
          <div className="font-serif mt-3">Color: {item.color}</div>
          <div className="mt-3">Size: {item.size}</div>
          <div className="font-serif mt-3">
            Material: {item.material}, {item.carat} Carat
          </div>
          <div className="mt-3">Weight: {item.weight}g</div>
        </div>
        <div className="flex font-serif mt-3">
          <Link to="/" className="title-link h-10">
            Add Another Items
          </Link>
          <div
            className="ml-8 title-link h-10 cursor-pointer"
            onClick={handleWishlistClick}
          >
            {isInWishlist(item.productID)
              ? "Remove from Wishlist"
              : "Move to Wishlist"}
          </div>
        </div>
        <div className="flex items-center border-y-[0.1em] border-x-black border-opacity-20 w-full h-20 mt-3">
          <input
            type="checkbox"
            checked={true}
            readOnly
            className="pointer-events-none"
            name="wrap"
            id=""
          />
          <label htmlFor="wrap" className="ml-5 flex items-center">
            <div className="text mr-2">Select for {item.gender}</div>
            <ion-icon name="chevron-down-outline"></ion-icon>
          </label>
        </div>
      </div>
      <div className="absolute top-7 text-gray-500 opacity-75 hover:opacity-90 cursor-pointer right-2">
        <ion-icon size="large" name="close-circle-outline"></ion-icon>
      </div>
    </div>
  );
}
