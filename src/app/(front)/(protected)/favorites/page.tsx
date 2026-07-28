import { fetchFavorites } from "@/lib/favorites.ts/queries";
import { handleError } from "@/lib/utils/handleError";
import FavoritesUI from "./FavoritesUI";

const page = async () => {
  const response = await fetchFavorites();

  if (response.error) {
    handleError(response.error);
    return (
      <p className="text-center font-vazir text-[16px] mt-10">
        {response.error}
      </p>
    );
  }

  return (
    <>
      <FavoritesUI favorites={response.favorites!} />
    </>
  );
};

export default page;
