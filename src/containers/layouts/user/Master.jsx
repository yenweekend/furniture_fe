import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Header from "./Header";
import Footer from "./Footer";

let prevScrollpos = window.pageYOffset;
let resizeTimeout;

const Master = () => {
  const handleScroll = (event) => {
    let currentScrollPos = document.documentElement.scrollTop;

    if (
      document.body.classList.contains("locked-scroll") ||
      document.body.classList.contains("body-showmodal") ||
      document.body.classList.contains("body-resize")
    ) {
      event.preventDefault();
      event.stopPropagation();
      prevScrollpos = currentScrollPos;
      return;
    }
    if (currentScrollPos > 250 && currentScrollPos < prevScrollpos) {
      document.getElementById("extra-header").classList.add("show");
    } else {
      document.getElementById("extra-header").classList.remove("show");
    }
    prevScrollpos = currentScrollPos;
  };
  useEffect(() => {
    const handleResize = () => {
      document.body.classList.add("body-resize");
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        document.body.classList.remove("body-resize");
      }, 1000); // 1000ms delay after resize stops
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <>
      <div className="baya-container max-990:overflow-x-hidden pb-[60px]">
        <Header />
        <div className={`baya-collection `}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Master;
