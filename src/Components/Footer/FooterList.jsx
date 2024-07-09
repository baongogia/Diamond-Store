import React from "react";
export const footerLink = (title) => {
  return (
    <div className="inline-block">
      <li className="footer-link inline-block align-top">{title}</li>
    </div>
  );
};
export default function FooterList() {
  return (
    <div className="w-screen h-[50vh]">
      <div className="pl-24 flex w-full h-full justify-between border-y-[0.1em] border-y-zinc-300">
        <ul className="font-sans flex flex-col justify-between h-[30vh] mt-10 w-[70%] uppercase">
          <li className="text mb-3">customer care</li>
          {footerLink("contact us")}
          {footerLink("CALL NOW: 800 227 8437")}
          {footerLink("faq")}
          {footerLink("TRACK YOUR ORDER")}
          {footerLink("BOOK AN APPOINTMENT")}
        </ul>
        <ul className="font-sans flex flex-col justify-between h-[30vh] mt-10 w-[80%] uppercase ">
          <li className="text mb-3">our company</li>
          {footerLink("find a boutique")}
          {footerLink("carrer")}
          {footerLink("ETERNITY AND CORPORATE SOCIAL RESPONSIBILITY")}
          {footerLink("CREDITS")}
        </ul>
        <ul className="font-sans flex flex-col justify-between h-[40vh] mt-10 w-[80%]">
          <li className="text mb-3">LEGAL AREA</li>
          {footerLink("TERMS OF USE")}
          {footerLink("PRIVACY POLICY")}
          {footerLink("CONDITIONS OF SALE")}
          {footerLink("ACCESSIBILITY STATEMENT")}
          {footerLink("CALIFORNIA PRIVACY RIGHTS")}
          {footerLink("HUMAN RIGHTS STATEMENT")}
          {footerLink("DO NOT SELL OR SHARE MY PERSONAL INFORMATION")}
        </ul>
        <div className="relative font-sans flex flex-col justify-between h-[30vh] mt-10 w-full">
          <div className="uppercase text mb-3">follow us</div>
          <div className="absolute top-10 w-[74%] flex justify-between">
            <div className="hover:text-green-700 cursor-pointer">
              <ion-icon size="large" name="logo-instagram"></ion-icon>
            </div>
            <div className="hover:text-green-700 cursor-pointer">
              <ion-icon size="large" name="logo-twitter"></ion-icon>
            </div>
            <div className="hover:text-green-700 cursor-pointer">
              <ion-icon size="large" name="logo-facebook"></ion-icon>
            </div>
            <div className="hover:text-green-700 cursor-pointer">
              <ion-icon size="large" name="logo-youtube"></ion-icon>
            </div>
            <div className="hover:text-green-700 cursor-pointer">
              <ion-icon size="large" name="logo-pinterest"></ion-icon>
            </div>
          </div>
          <div className="absolute top-24 w-[22%] flex justify-between">
            <div className="hover:text-green-700 cursor-pointer">
              <ion-icon size="large" name="diamond-outline"></ion-icon>
            </div>
            <div className="hover:text-green-700 cursor-pointer">
              <ion-icon size="large" name="gift-outline"></ion-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
