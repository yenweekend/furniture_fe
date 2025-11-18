import React from "react";
import { useRef, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MailCheck,
  Menu,
  PhoneCall,
  X,
} from "lucide-react";
import { Search as SearchDiv } from "@/containers/components";
import navigationComponents from "@/utils/navigation";
import {
  DropdownScreenUT,
  DropdownScreenUTContent,
  DropdownScreenUTTrigger,
} from "@/containers/components/Dropdown/DropdownFullScreenUT";

import { Separator } from "@/components/ui/separator";

import { CartButtonTransition } from "../../components/ButtonTransition/CartButton";
import { AccountButton } from "../../components/ButtonTransition/AccountButton";
import { SearchButton } from "../../components/ButtonTransition/SearchButton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Header = () => {
  const [openHamburger, setOpenHamburger] = React.useState(false);
  const [openHamburgerExtra, setOpenHamburgerExtra] = React.useState(false);

  return (
    <header className={` z-[50]  `} id="header">
      <div className="bg-primary 2md:py-[18px] 2md:pt-[14px]" id="main-header">
        <div className=" flex items-center justify-between  py-[10px] 2md:px-[15px] max-w-[1400px] mx-auto header-wrapper px-[6px]  2md:py-0 ">
          <DropdownScreenUT
            open={openHamburger}
            onOpenChange={setOpenHamburger}
          >
            <DropdownScreenUTTrigger
              className={"w-[30px] h-[30px] block 2md:hidden max-768:ml-[6px]"}
            >
              <X
                size={30}
                className={`text-[#fff] transition-all ease-linear duration-150 absolute inset-0  ${
                  openHamburger
                    ? " visible scale-100 opacity-100"
                    : "invisible opacity-0 scale-90"
                }`}
                strokeWidth={1.5}
              />
              <Menu
                size={30}
                className={`text-[#fff] transition-all ease-linear duration-150 absolute inset-0  ${
                  openHamburger
                    ? " invisible opacity-0 scale-90"
                    : "visible opacity-1 scale-100"
                }`}
                strokeWidth={1.5}
              />
            </DropdownScreenUTTrigger>
            <DropdownScreenUTContent className={"top-[80px] h-[81vh] z-[99]"}>
              <div className="absolute inset-0 overflow-hidden">
                <div className="w-full h-full overflow-y-auto pb-[30px]">
                  <ul className="flex flex-col items-start ">
                    {navigationComponents.map((nav, index) => (
                      <li
                        className="border-b border-solid border-[#eee] uppercase has-submenu flex-auto group flex items-center justify-between w-full cursor-pointer text-blacknihover:text-redichi pr-[8px]"
                        data-root-menu={index}
                        key={nav.link}
                        onClick={(e) => {
                          const exist = document.querySelector(".menu-open");
                          if (exist) {
                            exist.classList.remove("menu-open");
                          }
                          const id =
                            e.currentTarget.getAttribute("data-root-menu");
                          const element = document.getElementById(
                            `subNav-${id}`
                          );
                          element.classList.add("menu-open");
                        }}
                      >
                        <span className="p-[15px]  flex items-center text-inherit uppercase font-bold text-[14px] ">
                          {nav.title}
                        </span>
                        <ChevronRight
                          className="text-inherit "
                          size={18}
                          strokeWidth={1.5}
                        />
                      </li>
                    ))}
                  </ul>
                  <h2 className="text-redichi text-[14px] uppercase ml-[15px] font-bold mt-[20px]">
                    bạn cần hỗ trợ
                  </h2>
                  <div className="flex items-center p-[15px]">
                    <span className="w-6 h-6">
                      <PhoneCall size={24} stroke="#333" />
                    </span>
                    <span className="ml-[30px] text-[#333] text-[13px] font-bold">
                      1900 63 64 76
                    </span>
                  </div>
                  <div className="flex items-center p-[15px]">
                    <span className="w-6 h-6">
                      <MailCheck size={24} stroke="#333" />
                    </span>
                    <span className="ml-[30px] text-[#333] text-[13px] font-bold">
                      webshop@baya.vn
                    </span>
                  </div>
                </div>
                {navigationComponents.map((nav, index) => (
                  <div
                    className="list-child absolute inset-0 bg-[#fff] p-[15px] transition-transform ease-linear duration-150 translate-x-[100%]"
                    id={`subNav-${index}`}
                    key={`subnav-${index}`}
                  >
                    <div
                      className="uppercase text-blackni border-b border-solid border-[#eee] flex items-center py-[15px] pl-[6px] cursor-pointer"
                      onClick={() => {
                        const parent = document.getElementById(
                          `subNav-${index}`
                        );
                        parent.classList.remove("menu-open");
                      }}
                    >
                      <span className="w-5 h-5 mr-2">
                        <ChevronLeft size={20} strokeWidth={2} />
                      </span>
                      quay về
                    </div>
                    <Link
                      onClick={() => setOpenHamburger(false)}
                      to={nav.link}
                      className="text-blackni font-bold text-[13px] border-b border-solid border-[#eee] py-[15px] block pl-[10px] hover:text-redichi cursor-pointer"
                    >
                      Xem tất cả "{nav.title}"
                    </Link>
                    <ul>
                      {nav.subNav.map((sub) => (
                        <li
                          className="p-[15px] w-full border-b border-solid border-[#eee] group"
                          key={sub.title}
                        >
                          <Link
                            onClick={() => {
                              setOpenHamburger(false);
                              const parent = document.getElementById(
                                `subNav-${index}`
                              );
                              parent.classList.remove("menu-open");
                            }}
                            to={sub.link}
                            className="text-blackni font-normal text-[13px] group-hover:text-redichi hhh"
                          >
                            - {sub.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </DropdownScreenUTContent>
          </DropdownScreenUT>
          <div className="px-[15px]">
            <Link
              to="/"
              className="text-[#fff] md:w-[99px] md:h-[70px] w-[84px] overflow-hidden block"
            >
              <img
                src="https://theme.hstatic.net/200000796751/1001266995/14/logo.png?v=82"
                alt="BAYA"
                className="w-full h-full object-cover"
              />
            </Link>
          </div>

          <div className="md:px-[15px] px-2 flex items-start justify-between flex-auto ">
            <div className="flex-auto hidden flex-col gap-3 max-w-[680px] mx-auto  2md:flex search-div  main-search">
              <SearchDiv />
              <div className=" items-center gap-5 hidden 2md:flex">
                <div className="flex items-center gap-2">
                  <div className="w-[25px] h-5 overflow-hidden">
                    <img
                      src="https://theme.hstatic.net/200000796751/1001266995/14/header_03_policy_1_ico.png?v=82"
                      alt="Giao hàng"
                    />
                  </div>
                  <span className="text-[12px] text-[#fff]">
                    {" "}
                    Giao hàng toàn quốc
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-[25px] h-5 overflow-hidden">
                    <img
                      src="https://theme.hstatic.net/200000796751/1001266995/14/header_03_policy_2_ico.png?v=82"
                      alt="Giao hàng"
                    />
                  </div>
                  <span className="text-[12px] text-[#fff]">
                    {" "}
                    Hệ thống cửa hàng BAYA
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-[25px] h-5 overflow-hidden">
                    <img
                      src="https://theme.hstatic.net/200000796751/1001266995/14/header_03_policy_3_ico.png?v=82"
                      alt="Giao hàng"
                    />
                  </div>
                  <span className="text-[12px] text-[#fff]">
                    {" "}
                    Hotline: 1900 63 64 76 (9-21h)
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-stretch ml-auto ">
              <AccountButton className={"top-[72px] h-[82vh]"} />
              <Separator
                orientation="vertical"
                className={"my-auto hidden 2md:block h-[25px] bg-[#ffffff33]"}
              />
              <CartButtonTransition />
            </div>
          </div>
        </div>
        <div className="border-t border-solid border-[rgba(255,255,255,0.2)] block 2md:hidden mx-1 2md:mx-[20px] py-1 2md:py-[10px] second-searchDiv">
          <SearchDiv />
        </div>
      </div>
      <div
        className="px-[15px] bg-[#f2f2f2]  hidden 2md:block "
        id="main-navMenu"
      >
        <nav>
          <ul className="text-center">
            {navigationComponents.map((nav) => (
              <li
                className="mx-[15px] uppercase has-submenu relative group inline-block"
                key={nav.link}
              >
                <Link
                  to={nav.link}
                  className="py-[15px] px-[4px] text-st flex items-center text-redichi"
                >
                  {nav.title}
                  <ChevronDown
                    className="text-redichi group-hover:rotate-180 transition-transform duration-100 ease-linear"
                    size={16}
                  />
                </Link>
                <ul className="absolute submenu z-[99] shadow-st min-w-[220px] bg-[#fff] invisible opacity-0 transition-all ease-linear duration-300 top-[150%]  group-hover:visible group-hover:opacity-100 group-hover:top-[100%]">
                  {nav.subNav.map((subnav) => (
                    <li key={subnav.link}>
                      <Link
                        to={subnav.link}
                        className="text-blackniopacity-[0.85] text-left text-[14px] px-[18px] py-[9px] border-b border-solid border-[--shop-color-border] block w-full normal-case font-normal hover:text-redichi"
                      >
                        {subnav.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div
        className="bg-primary fixed  w-full z-50 invisible opacity-0 top-0 py-[10px] 2md:py-0"
        id="extra-header"
      >
        <div className=" flex items-center justify-between  2md:py-[10px] md:px-[15px] max-w-[1400px] mx-auto header-wrapper px-[6px] t 2 ne ">
          <DropdownScreenUT
            open={openHamburgerExtra}
            onOpenChange={setOpenHamburgerExtra}
          >
            <DropdownScreenUTTrigger
              className={"w-[30px] h-[30px] block 2md:hidden max-768:ml-[6px]"}
            >
              <X
                size={30}
                className={`text-[#fff] transition-all ease-linear duration-150 absolute inset-0  ${
                  openHamburgerExtra
                    ? " visible scale-100 opacity-100"
                    : "invisible opacity-0 scale-90"
                }`}
                strokeWidth={1.5}
              />
              <Menu
                size={30}
                className={`text-[#fff] transition-all ease-linear duration-150 absolute inset-0  ${
                  openHamburgerExtra
                    ? " invisible opacity-0 scale-90"
                    : "visible opacity-1 scale-100"
                }`}
                strokeWidth={1.5}
              />
            </DropdownScreenUTTrigger>
            <DropdownScreenUTContent
              className={"top-[calc(100%-1px)] h-[82vh] z-[99]"}
            >
              <div className="absolute inset-0 ">
                <div className="w-full h-full overflow-y-auto pb-[30px]">
                  <ul className="flex flex-col items-start ">
                    {navigationComponents.map((nav, index) => (
                      <li
                        className="border-b border-solid border-[#eee] uppercase has-submenu flex-auto group flex items-center justify-between w-full cursor-pointer text-blacknihover:text-redichi pr-[8px]"
                        data-root-menu={index}
                        key={nav.link}
                        onClick={(e) => {
                          const exist = document.querySelector(".menu-open");
                          if (exist) {
                            exist.classList.remove("menu-open");
                          }
                          const id =
                            e.currentTarget.getAttribute("data-root-menu");
                          const element = document.getElementById(id);
                          element.classList.add("menu-open");
                        }}
                      >
                        <span className="p-[15px]  flex items-center text-inherit uppercase font-bold text-[14px] ">
                          {nav.title}
                        </span>
                        <ChevronRight
                          className="text-inherit "
                          size={18}
                          strokeWidth={1.5}
                        />
                      </li>
                    ))}
                  </ul>
                  <h2 className="text-redichi text-[14px] uppercase ml-[15px] font-bold mt-[20px]">
                    bạn cần hỗ trợ
                  </h2>
                  <div className="flex items-center p-[15px]">
                    <span className="w-6 h-6">
                      <PhoneCall size={24} stroke="#333" />
                    </span>
                    <span className="ml-[30px] text-[#333] text-[13px] font-bold">
                      1900 63 64 76
                    </span>
                  </div>
                  <div className="flex items-center p-[15px]">
                    <span className="w-6 h-6">
                      <MailCheck size={24} stroke="#333" />
                    </span>
                    <span className="ml-[30px] text-[#333] text-[13px] font-bold">
                      webshop@baya.vn
                    </span>
                  </div>
                </div>
                {navigationComponents.map((nav, index) => (
                  <div
                    className="list-child absolute inset-0 bg-[#fff] p-[15px] transition-transform ease-linear duration-150 translate-x-[100%]"
                    id={index}
                    key={`nav-2-${index}`}
                  >
                    <div
                      className="uppercase text-blackniborder-b border-solid border-[#eee] flex items-center py-[15px] pl-[6px] cursor-pointer"
                      onClick={() => {
                        const parent = document.getElementById(index);
                        parent.classList.remove("menu-open");
                      }}
                    >
                      <span className="w-5 h-5 mr-2">
                        <ChevronLeft size={20} strokeWidth={2} />
                      </span>
                      quay về
                    </div>
                    <Link
                      onClick={() => setOpenHamburgerExtra(false)}
                      to={nav.link}
                      className="text-blackni font-bold text-[13px] border-b border-solid border-[#eee] py-[15px] block pl-[10px] hover:text-redichi cursor-pointer"
                    >
                      Xem tất cả "{nav.title}"
                    </Link>
                    <ul>
                      {nav.subNav.map((sub) => (
                        <li
                          className="p-[15px] w-full border-b border-solid border-[#eee] group"
                          key={sub.title}
                        >
                          <Link
                            onClick={() => {
                              setOpenHamburger(false);
                              const parent = document.getElementById(index);
                              parent.classList.remove("menu-open");
                            }}
                            to={sub.link}
                            className="text-blackni font-normal text-[13px] group-hover:text-redichi"
                          >
                            - {sub.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </DropdownScreenUTContent>
          </DropdownScreenUT>
          <div className="px-[15px]">
            <Link
              to="/"
              className="text-[#fff] md:w-[99px] md:h-[70px] w-[84px] overflow-hidden block"
            >
              <img
                src="https://theme.hstatic.net/200000796751/1001266995/14/logo.png?v=82"
                alt="BAYA"
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
          <nav className=" second-menu desktop max-990:hidden ">
            <ul className="flex flex-wrap items-center justify-center">
              {navigationComponents.map((nav) => (
                <li
                  className="mx-[15px] uppercase has-submenu relative group "
                  key={nav.link}
                >
                  <Link
                    to={nav.link}
                    className="py-[25px] px-[4px]  flex items-center text-[#fff] normal-case opacity-85 text-[13px]"
                  >
                    {nav.title}
                    <ChevronDown
                      className="text-[#fff] group-hover:rotate-180 transition-transform duration-100 ease-linear"
                      size={16}
                    />
                  </Link>
                  <ul className="absolute submenu z-[99] shadow-st min-w-[220px] bg-[#fff] invisible opacity-0 transition-all ease-linear duration-300 top-[150%]  group-hover:visible group-hover:opacity-100 group-hover:top-[100%]">
                    {nav.subNav.map((subnav) => (
                      <li key={subnav.link}>
                        <Link
                          to={subnav.link}
                          className="text-blackniopacity-[0.85] text-left text-[14px] px-[18px] py-[9px] border-b border-solid border-[--shop-color-border] block w-full normal-case font-normal hover:text-redichi"
                        >
                          {subnav.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:px-[15px] px-2 flex items-start justify-between flex-auto ">
            <div className="flex items-stretch ml-auto ">
              <div className="search-box hidden items-center justify-center">
                <SearchButton className={"top-[78px] h-[82vh]"} />
              </div>
              <Separator
                orientation="vertical"
                className={"my-auto hidden 2md:block h-[25px] bg-[#ffffff33]"}
              />
              <AccountButton className={"h-[82vh] top-[calc(100%-6px)]"} />
              <Separator
                orientation="vertical"
                className={"my-auto hidden 2md:block h-[25px] bg-[#ffffff33]"}
              />
              <CartButtonTransition />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
