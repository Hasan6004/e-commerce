import { Toaster } from "react-hot-toast";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center p-6 border-2 rounded-lg border-black bg-[#fcfcfc]">
        {children}
        <Toaster position="top-center" />
      </div>
    </div>
  );
}
