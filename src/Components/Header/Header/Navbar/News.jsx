import React from "react";
import { footerLink } from "../../../Footer/FooterList";

export default function News() {
  return (
    <div className="flex w-full h-full justify-around">
      <div className="">
        <ul className="uppercase flex flex-col justify-between h-[34vh] translate-y-[26%]">
          <div className="text text-[1.2em]">stories</div>
          {footerLink("news")}
          {footerLink("Eternity party")}
          {footerLink("encounter")}
          {footerLink("know how")}
          {footerLink("the maison")}
          {footerLink("all stories")}
        </ul>
      </div>
      <div className="">
        <ul className="uppercase flex flex-col justify-between h-[40vh] translate-y-[21%]">
          <div className="text text-[1.2em]">commitments and culture</div>
          {footerLink("fondation Eternity pour l'art contemporain")}
          {footerLink("Eternity collection")}
          {footerLink("encounters")}
          {footerLink("Eternity women's initiative")}
          {footerLink("musical")}
          {footerLink("Eternity philanthropy")}
          {footerLink("commitments to our people")}
          {footerLink("all commitments and culture")}
        </ul>
      </div>
    </div>
  );
}
