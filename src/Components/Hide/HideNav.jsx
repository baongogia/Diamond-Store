import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

export default function HideNav({ children }) {
  const location = useLocation();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (
      location.pathname === "/CheckOutPage" ||
      location.pathname === "/ReviewOrder" ||
      location.pathname === "/OrderSuccess"
    ) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [location]);

  return <div>{show && children}</div>;
}
