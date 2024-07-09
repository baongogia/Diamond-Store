import React, { useEffect, useState, useMemo } from "react";
import NavList from "../Items/NavList";
import { NavLink, useLocation } from "react-router-dom";
import SearchList from "../../../Header/Search/SearchList";

export default function Menu() {
  const [showList, setShowList] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [onScroll, setOnScroll] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [search, setSearch] = useState(false);
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);
  const [isSearchOverlayVisible, setIsSearchOverlayVisible] = useState(false);
  const [isListFullyExpanded, setIsListFullyExpanded] = useState(false);

  const location = useLocation();
  const items = useMemo(() => ["Diamond jewelry", "jewelry", "news"], []);

  // Effect on menu bar

  const handleMouseEnter = (index) => {
    setShowList(true);
    setOverlay(true);
    setCurrentItem(items[index]);
    setSearch(false);
  };

  const handleMouseLeave = () => {
    setShowList(false);
    setOverlay(false);
    setCurrentItem(null);
  };

  const handleSearchButtonClick = () => {
    setIsSearchOverlayVisible(true);
    setSearch(!search);
    setIsScrollEnabled(search);
  };

  // Effect when scroll

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setOnScroll(currentScrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search overlay and enable scrolling on route change
  useEffect(() => {
    setIsSearchOverlayVisible(false);
    setSearch(false);
    setIsScrollEnabled(true);
  }, [location]);

  // When move to another route

  useEffect(() => {
    setIsSearchOverlayVisible(false);
    setShowList(false);
    setOverlay(false);
    window.scrollTo(0, 0);

    if (location.pathname === "/") {
      document.body.style.overflowX = "hidden";
    } else {
      document.body.style.overflowX = "";
    }

    return () => {
      document.body.style.overflowX = "";
    };
  }, [location]);

  // Toggle body scroll
  useEffect(() => {
    document.body.style.overflow = isScrollEnabled ? "auto" : "hidden";
  }, [isScrollEnabled]);

  // Handle list fully expanded
  useEffect(() => {
    if (showList) {
      const timer = setTimeout(() => {
        setIsListFullyExpanded(true);
      }, 500); // Adjust the delay time as needed
      return () => clearTimeout(timer);
    } else {
      setIsListFullyExpanded(false);
    }
  }, [showList]);

  return (
    <div className="absolute z-10 w-full h-[3em] ">
      {/* List menu */}
      <div onMouseLeave={handleMouseLeave} className="group">
        <ul
          className={`font-sans uppercase flex w-full justify-center pt-5 bg-white ${
            onScroll
              ? "fixed z-10 top-0 group-hover:border-b-[0.1em] group-hover:border-b-zinc-600 group-hover:border-opacity-30"
              : "border-b-[0.1em] border-b-zinc-600 border-opacity-30"
          }  transition-transform duration-700`}
        >
          {items.map((item, index) => (
            <li
              key={index}
              className={`relative Mfont z-10 list-link mb-3 hover:font-semibold pr-8 cursor-pointer ${
                showList && currentItem === item ? "active" : "unactive"
              }`}
              onMouseEnter={() => handleMouseEnter(index)}
            >
              {item}
            </li>
          ))}
          <NavLink
            to="/DiamonPrice"
            className="relative z-10 list-link mb-3 Mfont pb-1 hover:font-semibold pr-8 cursor-pointer"
            activeclassname="font-bold"
            onMouseEnter={() => {
              handleMouseLeave();
              setSearch(false);
            }}
          >
            Diamond price list
          </NavLink>
          <NavLink
            to="/DiamonKnow"
            className="relative z-10 list-link mb-3 Mfont pb-1 hover:font-semibold pr-8 cursor-pointer"
            activeclassname="font-bold"
            onMouseEnter={() => setSearch(false)}
          >
            Diamond knowledge
          </NavLink>
          <NavLink
            to="/JewelryKnow"
            className="relative z-10 list-link mb-3 Mfont pb-1 hover:font-semibold pr-8 cursor-pointer"
            activeclassname="font-bold"
            onMouseEnter={() => setSearch(false)}
          >
            Jewelry knowledge
          </NavLink>
          <NavLink
            to="/Intro"
            className="relative z-10 list-link Mfont mb-3 pb-1 hover:font-semibold pr-8 cursor-pointer"
            activeclassname="font-bold"
            onMouseEnter={() => setSearch(false)}
          >
            Introduction
          </NavLink>
          {/* Search */}
          <div
            onClick={handleSearchButtonClick}
            className="h-[50%] ml-2 mr-8 border-l-2 border-l-gray-600 cursor-pointer"
          >
            <div className="pl-8">
              {search && isSearchOverlayVisible ? (
                <div className="hover:text-red-500 scale-150 translate-y-1">
                  <ion-icon name="close-outline"></ion-icon>
                </div>
              ) : (
                <ion-icon name="search-outline"></ion-icon>
              )}
            </div>
          </div>
        </ul>
        {/* Search list */}
        <div
          className={`${
            search ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        >
          <div className={`${search ? "" : "hidden"}`}>
            {isSearchOverlayVisible && <SearchList />}
          </div>
        </div>
        {/* List items */}
        <div
          className={`z-[-1] w-screen bg-white top-0 opacity-100 ${
            showList ? "translate-y-0" : "-translate-y-full"
          } ${
            onScroll ? "fixed" : "absolute"
          } transition-all duration-500 pointer-events-auto`}
          onTransitionEnd={() => setIsListFullyExpanded(showList)}
        >
          <div className={``}>
            <NavList currentItem={currentItem} />
          </div>
        </div>
        {/* Overlay */}
        <div
          className={`-z-10 top-14 bg-black w-screen h-screen ${
            overlay && isListFullyExpanded ? "bg-opacity-40" : "bg-opacity-0"
          } ${
            onScroll ? "fixed" : "absolute"
          }  transition-all duration-300 pointer-events-none`}
        ></div>
      </div>
    </div>
  );
}
