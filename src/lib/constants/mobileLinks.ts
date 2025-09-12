import { IoPersonOutline } from "react-icons/io5";
import { GrCart } from "react-icons/gr";
import { MdOutlineCategory } from "react-icons/md";
import { MdOutlineHome } from "react-icons/md";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

type navLinks = {
  href: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  type: "general" | "loggedIn" | "admin";
  text: string;
};

export const mobileLinks: navLinks[] = [
  {
    href: "/admin",
    name: "adminPanel",
    icon: MdOutlineAdminPanelSettings,
    type: "admin",
    text: "پنل ادمین",
  },
  {
    href: "/account",
    name: "account",
    icon: IoPersonOutline,
    type: "general",
    text: "خساب من",
  },
  {
    href: "/orders",
    name: "orders",
    icon: MdOutlineLibraryBooks,
    type: "loggedIn",
    text: "سفارشات",
  },
  {
    href: "/cart",
    name: "cart",
    icon: GrCart,
    type: "general",
    text: "سبد خرید",
  },
  {
    href: "/categories",
    name: "category",
    icon: MdOutlineCategory,
    type: "general",
    text: "دسته‌بندی",
  },
  {
    href: "/home",
    name: "home",
    icon: MdOutlineHome,
    type: "general",
    text: "خانه",
  },
];
