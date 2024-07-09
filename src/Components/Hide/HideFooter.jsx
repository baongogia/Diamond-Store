import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

export default function HideFooter({ children }) {
  const location = useLocation();
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    if (
      location.pathname === "/CheckOutPage" ||
      location.pathname === "/ReviewOrder" ||
      location.pathname === "/OrderSuccess" ||
      location.pathname === "/ShoppingBag"
    ) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [location]);

  return <div>{showNav && children}</div>;
}
