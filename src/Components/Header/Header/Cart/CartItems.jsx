import { useContext, useState } from "react";
import { CartContext } from "./CartContext";

export default function CartItems({ id, product }) {
  const { removeFromCart } = useContext(CartContext);
  const [remove, setRemove] = useState(false);
  return (
    <div className="relative mt-3 flex justify-between items-center w-full h-[30%]">
      {/* Background */}
      <div
        style={{
          backgroundImage: `url(${product.image})`,
        }}
        className="w-[37%] h-[100%] bg-cover bg-center rounded-md"
      ></div>
      {/* Information */}
      <div className="ml-3 w-[58%]">
        <div className="text uppercase w-[90%]">{product.name}</div>
        <div className="font-serif">{product.material}</div>
        <div className="font-serif">Size: {product.size}</div>
        <div className="font-serif">Quantity: {product.quantity}</div>
        <div className="text uppercase">
          ${parseFloat(product.price).toFixed(2)}
        </div>
      </div>
      {/* Cancel */}
      <div
        onClick={() => setRemove(true)}
        className="absolute top-0 right-2 opacity-40 hover:opacity-80 cursor-pointer"
      >
        <ion-icon size="large" name="close-circle-outline"></ion-icon>
      </div>
      {/* Alert when cancel product */}
      <div
        className={`absolute w-full h-full bg-white bg-opacity-85 ${
          remove
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } flex justify-center items-center `}
      >
        <div className="w-full flex flex-col justify-center items-center">
          <div className="text-center flex flex-col items-center">
            <div className="text text-[1.2em]">Remove product?</div>
            <div className="font-serif w-[70%]">
              Are you sure you want to remove the following product from the
              cart?
            </div>
          </div>
          <div className="flex justify-around items-center w-[80%] mt-2">
            <div
              onClick={() => setRemove(false)}
              className="bg-white text-center text-black w-[40%] font-semibold px-4 py-2 text uppercase
                 hover:bg-black hover:text-white border-black border-solid border-[0.08em] cursor-pointer transition-colors duration-500"
            >
              cancel
            </div>
            <div
              onClick={() => removeFromCart(id, product.size)}
              className="bg-black text-center text-white w-[40%] font-semibold px-6 py-2 text uppercase
                 hover:bg-white hover:text-black border-black border-solid border-[0.08em] cursor-pointer transition-colors duration-500"
            >
              yes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
