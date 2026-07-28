import { fetchAddresses } from "@/lib/addresses/queries";
import { handleError } from "@/lib/utils/handleError";
import AddressesUI from "./AddressesUI";

const Addresses = async () => {
  const response = await fetchAddresses();
  console.log(response.addresses);
  if (response.error) {
    handleError(response.error);
    return (
      <p className="text-center font-vazir text-[16px]">{response.error}</p>
    );
  }

  return (
    <>
      <AddressesUI addresses={response.addresses!} />
    </>
  );
};

export default Addresses;
