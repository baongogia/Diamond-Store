import React, { useEffect, useRef } from "react";

export default function Intro() {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const maxScrollY = 1000;
      if (scrollContainerRef.current.scrollTop > maxScrollY) {
        scrollContainerRef.current.scrollTop = maxScrollY;
      }
    };

    const scrollContainer = scrollContainerRef.current;
    scrollContainer.addEventListener("scroll", handleScroll);

    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full h-[160vh]">
      <div className="absolute -top-[45vh] 2xl:-top-[35vh] w-full h-full overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="overflow-hidden -translate-y-[25vh]"
        >
          <iframe
            src="https://www.serendipitydiamonds.com/blog/eternity-rings-origin-history-meaning/"
            width="105%"
            height="2000"
            className="overflow-hidden "
            title="know"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
