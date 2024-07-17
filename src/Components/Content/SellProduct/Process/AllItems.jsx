import React from "react";
import SideBar from "../Items/SideBar";
import ItemsList from "../Items/ItemsList";
import { useParams } from "react-router-dom";

export default function AllItems() {
  const category = useParams();
  const cat = category.category;
  console.log(cat);
  return (
    <div className="">
      {/* Introduce */}
      <div className="w-full h-[35vh] -translate-y-7 flex">
        <div
          style={{
            backgroundImage: `url(${
              cat === "Rings"
                ? "https://www.cartier.com/on/demandware.static/-/Library-Sites-CartierSharedLibrary-BGTJ/default/dw8da3feb4/plp-banners/header_jwl_rings_VIEWALL.jpg"
                : cat === "Earrings"
                ? "https://www.cartier.com/on/demandware.static/-/Library-Sites-CartierSharedLibrary-BGTJ/default/dwe8ea5bee/plp/jewellery/earrings/grain-de-cafe/header/NEW%2001_HEADER_GDC_1920x800.jpg"
                : cat === "Bracelets"
                ? "https://www.cartier.com/on/demandware.static/-/Library-Sites-CartierSharedLibrary-BGTJ/default/dwee7fc95b/plp-banners/JEWELRY_BANNERS_1920x800_VIEW-ALL-BRACELETS.jpg"
                : cat === "Necklaces"
                ? "https://www.cartier.com/on/demandware.static/-/Library-Sites-CartierSharedLibrary-BGTJ/default/dwaad75773/plp/jewellery/necklaces/header/01_HEADER_CLASH_NECKLACES_PLP_1920x800.jpg"
                : cat === "products"
                ? "https://www.cartier.com/on/demandware.static/-/Library-Sites-CartierSharedLibrary-BGTJ/default/dw009b40c2/plp/High%20Jewellery/all-creations/le-voyage-recommence/header/1.%20TEST%20ONE%20PILEO_header.jpg"
                : ""
            })`,
          }}
          className="w-1/2 h-full bg-cover bg-center bg-no-repeat"
        ></div>
        <div className="w-1/2 h-full bg-black bg-opacity-5 flex justify-center items-center">
          <div className="w-[65%]">
            <div className="text uppercase text-[1.6em] mb-2">{cat}</div>
            <div className="font-serif">
              {`${
                cat === "Rings"
                  ? "Enternity jewelry is a unique expression of a creator's style and imagination. To learn more about these exceptional pieces, discover our collection of women’s and men's rings."
                  : cat === "Earrings"
                  ? "Enternity jewelry is a unique expression of the Maison's style, creativity, and savoir-faire. To learn more about these exceptional pieces, discover our collection of women’s earrings."
                  : cat === "Bracelets"
                  ? "A love child of '70s New York, the LOVE collection is a symbol of free-spirited love. Its binding closure and screw motif give it true permanence, while diverse interpretations allow for a unique expression of feelings. Lock in your love, forever."
                  : cat === "Necklaces"
                  ? "From the audacity of the Juste Un Clou, to the boldness of the Panthère and the charms of Amulette, our fine necklaces will take your breath away. Each model will add an elegant touch to your look, making unforgettable statements everywhere you go."
                  : cat === "products"
                  ? "Plunge into the magical world of Enternity and discover the Maison's signature collections, unique pieces, and one-of-a-kind creations."
                  : ""
              }`}
            </div>
          </div>
        </div>
      </div>
      <div className="w-screen flex justify-around">
        {/* SideBar */}
        <SideBar initialCategory={cat} />
        {/* Items */}
        <ItemsList />
      </div>
    </div>
  );
}
