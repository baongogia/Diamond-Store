import React, { useEffect, useState, useContext, useRef } from "react";
import { title } from "../../HomePage/HomePage";
import ProductShopCard from "../../Product/ProductShopCard";
import { RingLoader } from "react-spinners";
import { SortingContext } from "../Sort/SortingContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { DataContext } from "../Sort/DataContext";

export default function ItemsList() {
  const { dataFil, setDataFil, apiUrl } = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  const prevApiUrl = useRef("");
  const { sortOption } = useContext(SortingContext);
  const cache = useRef({});

  // AOS
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1500,
      offset: 0,
    });
  }, []);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (cache.current[apiUrl]) {
        setDataFil(
          Array.isArray(cache.current[apiUrl]) ? cache.current[apiUrl] : []
        );
        setLoading(false);
      } else {
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          cache.current[apiUrl] = data; // Cache the response
          setDataFil(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error("Failed to fetch data:", error);
          setDataFil([]);
        } finally {
          setLoading(false);
        }
      }
    };
    // Set loading when change api url
    if (apiUrl && apiUrl !== prevApiUrl.current) {
      fetchData();
      prevApiUrl.current = apiUrl;
    }
  }, [apiUrl, setDataFil]);

  // Sort items
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    if (sortOption === "price low to high") {
      setDataFil((prevItems) =>
        [...prevItems].sort((a, b) => a.ProductPrice - b.ProductPrice)
      );
    } else if (sortOption === "price high to low") {
      setDataFil((prevItems) =>
        [...prevItems].sort((a, b) => b.ProductPrice - a.ProductPrice)
      );
    } else if (sortOption === "recommended") {
      setDataFil((prevItems) => shuffleArray([...prevItems]));
    }
  }, [sortOption, setDataFil]);

  return (
    <div className="w-[70vw] h-max">
      <div className="w-full h-full grid grid-cols-4 gap-4 overflow-hidden">
        {loading ? (
          <div className="w-[63vw] h-[80vh] flex justify-center items-center">
            <RingLoader size={100} color="#54cc26" />
          </div>
        ) : (
          dataFil.map((item, index) => (
            <React.Fragment key={item.id}>
              {/* Banner */}
              {index === 6 && (
                <div className="col-span-2 w-full mt-2 ml-2">
                  <div
                    style={{
                      backgroundImage: `url('https://www.cartier.com/on/demandware.static/-/Library-Sites-CartierSharedLibrary-BGTJ/default/dw2ef41ab6/clp/2022/Beautes%20du%20Monde/1.%20CAMAIL_1920%20x%201494-NEW-2.jpg')`,
                    }}
                    className="w-full h-[50%] bg-cover bg-center mb-10"
                  ></div>
                  <div className="-translate-y-6">
                    {title(
                      "THE CAMAIL NECKLACE",
                      "A bird’s plumage becomes the abstract motif of a choker composed of the 42.44-carat ensemble of five Zambian emeralds.",
                      "Shop Gifts"
                    )}
                  </div>
                </div>
              )}
              {index === 14 && (
                <div className="col-span-2 w-full mt-2 ml-2">
                  <div
                    style={{
                      backgroundImage: `url('https://www.cartier.com/on/demandware.static/-/Library-Sites-CartierSharedLibrary-BGTJ/default/dw2c4e2d12/clp/2022/Beautes%20du%20Monde/3.%20COLLIER%20NM_CYCADA_1920x1494.jpg')`,
                    }}
                    className="w-full h-[50%] bg-cover bg-center mb-10"
                  ></div>
                  <div className="-translate-y-6">
                    {title(
                      "THE CYMBALE NECKLACE",
                      "Insects are a source of fascination for the Maison, thanks to an anatomy that concentrates a multitude of details into a miniature space.",
                      "Shop Gifts"
                    )}
                  </div>
                </div>
              )}
              {/* Products */}
              <ProductShopCard
                key={item.id}
                id={item.ProductId}
                img={item.Image}
                name={item.ProductName}
                material={item.Material}
                price={parseFloat(item.ProductPrice).toFixed(2)}
              />
            </React.Fragment>
          ))
        )}
      </div>
      <div className="mt-12 w-full h-[20vh]">
        <div className="w-full flex flex-col justify-center items-center">
          <img
            src="https://png.pngtree.com/png-vector/20220719/ourmid/pngtree-eternal-love-symbol-heart-infinity-sign-calligraphy-for-declarations-vector-png-image_37918768.png"
            alt=""
            className="w-1/4 mb-3"
          />
          <div className="font-serif">{`Showing ${dataFil.length} items`}</div>
        </div>
      </div>
    </div>
  );
}
