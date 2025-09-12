import { MdOutlineBookmarkBorder } from "react-icons/md";
import { MdOutlineShoppingBasket } from "react-icons/md";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { MdLogout } from "react-icons/md";

type accountLinksType = {
  href: string;
  name: string;
  text: string;
  icon: React.ComponentType<{ className?: string }>;
};

export const accountLinks: accountLinksType[] = [
  {
    href: "/orders",
    name: "orders",
    text: "سفارشات",
    icon: MdOutlineShoppingBasket,
  },
  {
    href: "/addresses",
    name: "addresses",
    text: "آدرس‌ها",
    icon: MdOutlineAddLocationAlt,
  },
  {
    href: "/bookmarks",
    name: "bookmarks",
    text: "لیست علاقه‌مندی",
    icon: MdOutlineBookmarkBorder,
  },
  { href: "/logout", name: "logout", text: "خروج از حساب", icon: MdLogout },
];
