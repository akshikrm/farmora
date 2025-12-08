export type Vendor = {
  name: string;
  status: number;
  address: string;
  opening_balance: string;
  vendor_type: string;
};

export type NewVendorRequest = {
  name: string;
  address: string;
  opening_balance: string;
  vendor_type: string;
};

export type EditVendorRequest = Partial<NewVendorRequest> & { id: number };

export type EditVendorPayload = Omit<EditVendorRequest, "id">;
