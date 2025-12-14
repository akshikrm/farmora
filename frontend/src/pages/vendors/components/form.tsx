import type {
  NewVendorRequest,
  EditVendorRequest,
} from "@app-types/vendor.types";
import { Stack, TextField, Typography } from "@mui/material";
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
        <Stack spacing={2}>
          <TextField
            label="Name"
            {...register("name")}
            fullWidth
            j
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />

          <TextField
            label="Address"
            {...register("address")}
            fullWidth
            j
            error={Boolean(errors.address)}
            helperText={errors.address?.message}
          />

          <TextField
            label="Opening Balance"
            {...register("opening_balance")}
            fullWidth
            j
            error={Boolean(errors.opening_balance)}
            helperText={errors.opening_balance?.message}
          />

          <TextField
            label="Vendor Type"
            select
            {...register("vendor_type")}
            fullWidth
            slotProps={{
              select: {
                native: true,
              },
            }}
            error={Boolean(errors.vendor_type)}
            helperText={errors.vendor_type?.message}
          >
            <option value="seller">
              <Typography>Seller</Typography>
            </option>
            <option value="buyer">
              <Typography>Buyer</Typography>
            </option>
          </TextField>

          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
              type="submit"
            >
              submit
            </button>
          </div>
        </Stack>
      </form>
    </>
  );
};

export default VendorForm;
