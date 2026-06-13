import { ProductDetailModal } from "./ProductDetailModal";
import { AddressSelector } from "./AddressSelector";
import { AddAddressModal } from "./AddAddressModal";
import { CrisisTriageModal } from "./CrisisTriageModal";

export function GlobalModals() {
  return (
    <>
      <ProductDetailModal />
      <AddressSelector />
      <AddAddressModal />
      <CrisisTriageModal />
    </>
  );
}
