import * as React from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Modal } from "antd";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "../Dropdown/Dropdown";
import { ShoppingCart, X } from "lucide-react";
import { Link } from "react-router-dom";

export function CartButtonTransition() {
  const isDesktop = useMediaQuery("(min-width: 990px)");
  //  TODO cart button

  if (isDesktop) {
    return <div className="">cart functin</div>;
  }
}
