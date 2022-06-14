import { Vendor } from "../models/vendor.model";

export function updateSingleVendor(vendors: Vendor[] | undefined, vendor: Vendor) {
  return vendors?.map(innerVendor => {
    if (innerVendor.id == vendor.id) {
      return vendor;
    }
    return innerVendor;
  });
}
