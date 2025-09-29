"use client";
import { RootState } from "@/lib/redux/store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { MdOutlineWarning } from "react-icons/md";
import { useSelector } from "react-redux";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated) {
      toast(
        <span className="flex flex-row items-center gap-3">
          <MdOutlineWarning size={22} />
          لطفا ابتدا وارد حساب خود شوید
        </span>,
        {
          className: "font-vazir text-[16px] mt-10 border-1",
        }
      );
      router.push(`/auth/login/?redirect=${pathname}`);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
