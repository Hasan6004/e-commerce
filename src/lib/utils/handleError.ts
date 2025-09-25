import toast from "react-hot-toast";

function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as any).message === "string"
  );
}

export const handleError = (error: any) => {
  if (isErrorWithMessage(error)) {
    toast.error(error.message, {
      className: "font-vazir text-[16px] mt-10",
    });
  } else if (error instanceof Error) {
    toast.error(error.message, {
      className: "font-vazir text-[16px] mt-10",
    });
  } else {
    toast.error(error as string, {
      className: "font-vazir text-[16px] mt-10",
    });
  }
};
