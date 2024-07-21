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
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
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
  const fetchData = async (url, page = 1, loadMore = false) => {
    if (loadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    const fullUrl = `${url}&PageNumber=${page}&PageSize=10`;

    if (cache.current[fullUrl]) {
      const cachedData = cache.current[fullUrl];
      setDataFil((prevData) =>
        loadMore ? [...prevData, ...cachedData.Products] : cachedData.Products
      );
      setTotalItems(cachedData.TotalRecords || 0);
      loadMore ? setLoadingMore(false) : setLoading(false);
    } else {
      try {
        const response = await fetch(fullUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        cache.current[fullUrl] = data;
        setTotalItems(data.TotalRecords || 0);
        setDataFil((prevData) =>
          loadMore ? [...prevData, ...data.Products] : data.Products
        );
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setDataFil([]);
      } finally {
        loadMore ? setLoadingMore(false) : setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (apiUrl && apiUrl !== prevApiUrl.current) {
      setDataFil([]); // Reset the data when the URL changes
      setCurrentPage(1); // Reset the current page
      setLoading(true);
      fetchData(apiUrl);
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

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchData(apiUrl, nextPage, true);
  };

  return (
    <div className="w-[70vw] h-max">
      <div className="w-full h-full grid grid-cols-4 gap-4 overflow-hidden">
        {loading && currentPage === 1 ? (
          <div className="w-[63vw] h-[80vh] flex justify-center items-center">
            <RingLoader size={100} color="#54cc26" />
          </div>
        ) : (
          Array.isArray(dataFil) &&
          dataFil.map((item, index) => (
            <React.Fragment key={item.ProductId}>
              {/* Banner */}
              {index === 6 && (
                <div className="col-span-2 w-full mt-2 ml-2">
                  <div
                    style={{
                      backgroundImage: `url('https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Library-Sites-CartierSharedLibrary-BGTJ/default/dw2ef41ab6/clp/2022/Beautes%20du%20Monde/1.%20CAMAIL_1920%20x%201494-NEW-2.jpg')`,
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
                      backgroundImage: `url('https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Library-Sites-CartierSharedLibrary-BGTJ/default/dw2c4e2d12/clp/2022/Beautes%20du%20Monde/3.%20COLLIER%20NM_CYCADA_1920x1494.jpg')`,
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
                key={item.ProductId}
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
      <div className="mt-12 w-[70vw] h-[20vh]">
        <div className="w-full flex flex-col justify-center items-center">
          <img
            src="https://png.pngtree.com/png-vector/20220719/ourmid/pngtree-eternal-love-symbol-heart-infinity-sign-calligraphy-for-declarations-vector-png-image_37918768.png"
            alt=""
            className="w-1/6 mb-3"
          />
          <div className="font-serif">{`Showing ${dataFil.length} of ${totalItems} items`}</div>
          {dataFil.length < totalItems && (
            <div className="relative mt-5 w-full flex flex-col items-center">
              <div className="absolute -top-[24vh]">
                {loadingMore && <RingLoader size={60} color="#54cc26" />}
              </div>
              {!loadingMore && (
                <button
                  onClick={handleLoadMore}
                  className="mt-2 Mfont px-8 py-2 bg-white text-black hover:bg-black hover:text-white border border-green-700 transition-all duration-300"
                  disabled={loadingMore}
                >
                  {"LOAD MORE"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
