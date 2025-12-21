import type {
  NewVendorRequest,
  EditVendorRequest,
} from "@app-types/vendor.types";
import { TextField, MenuItem, Button } from "@mui/material";
import type { FieldValues, UseFormReturn } from "react-hook-form";

type EditMethod = UseFormReturn<EditVendorRequest, any, FieldValues>;
type AddMethod = UseFormReturn<NewVendorRequest, any, FieldValues>;

type Props = {
  methods: EditMethod | AddMethod;
  onSubmit: (payload: any) => void;
};

const VendorForm = ({ methods, onSubmit }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  return (
    <>
      <form {...methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <TextField
            label="Name"
            {...(register as any)("name")}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            size="small"
          />

          <TextField
            label="Address"
            {...(register as any)("address")}
            fullWidth
            error={Boolean(errors.address)}
            helperText={errors.address?.message}
            size="small"
          />

          <TextField
            label="Opening Balance"
            {...(register as any)("opening_balance")}
            fullWidth
            error={Boolean(errors.opening_balance)}
            helperText={errors.opening_balance?.message}
            size="small"
          />

          <TextField
            label="Vendor Type"
            select
            {...(register as any)("vendor_type")}
            fullWidth
            error={Boolean(errors.vendor_type)}
            helperText={errors.vendor_type?.message}
            size="small"
          >
            <MenuItem value="seller">Seller</MenuItem>
            <MenuItem value="buyer">Buyer</MenuItem>
          </TextField>
        </div>
        <div className="flex justify-end mt-6">
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default VendorForm;
