import React from "react";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const Pagination = ({ page, setPage, totalPages }: PaginationProps) => {
  return (
    <div className="flex gap-2 justify-center mt-4">
      <button
        className="font-vazir text-[14px] font-medium border-1 px-2 py-1 border-gray-400 rounded-xl cursor-pointer"
        disabled={page === 1}
        onClick={() => setPage((p) => p - 1)}
      >
        قبل
      </button>

      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          className={`font-vazir text-[14px] border-1 px-2 py-1  rounded-xl cursor-pointer ${
            page === i + 1
              ? "font-bold border-black"
              : "font-medium border-gray-400"
          }`}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      <button
        className="font-vazir text-[14px] font-medium border-1 px-2 py-1 border-gray-400 rounded-xl cursor-pointer"
        disabled={page === totalPages}
        onClick={() => setPage((p) => p + 1)}
      >
        بعدی
      </button>
    </div>
  );
};

export default Pagination;
