import React from "react";
import ListItems from "./ListItems";
import News from "../Navbar/News";
export default function NavList({ currentItem }) {
  const Jtitles = [
    " rings",
    " earrings",
    " bracelet",
    " necklace",
    " watch face",
    " ring setting",
  ];
  const DJtitles = [
    " wedding rings",
    " earrings",
    " bracelet",
    " necklace",
    " watch face",
    " ring setting",
  ];
  return (
    <div className="relative w-full h-[50vh] flex justify-center items-center">
      {currentItem === "jewelry" && <ListItems titles={Jtitles} />}
      {currentItem === "Diamond jewelry" && <ListItems titles={DJtitles} />}
      {currentItem === "news" && <News />}
    </div>
  );
}
