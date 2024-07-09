import React, { useEffect, useRef } from "react";

export default function DiamonKnow() {
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
    <div className="relative w-full h-[180vh]">
      <div className="absolute -top-8 2xl:-top-[5vh] w-full h-full overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="overflow-hidden -translate-y-[33vh] 2xl:-translate-y-[20vh]"
        >
          <iframe
            src="https://www.ssplatinum.com/generalinfo/diamond-knowledge.aspx"
            width="110%"
            height="2000"
            className="overflow-hidden "
            title="know"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
