import SelectList from "@components/select-list";
import useGetSellerNameList from "@hooks/use-get-vendor-name-list";
import { Stack, TextField, Button, MenuItem } from "@mui/material";
import { useForm, type DefaultValues } from "react-hook-form";
import type { ItemFormValues } from "../types";
import type { ValidationError } from "@errors/api.error";
import { useEffect, useMemo } from "react";

type Props = {
  defaultValues: DefaultValues<ItemFormValues>;
  onSubmit: (payload: any) => void;
  apiError: ValidationError[];
};

const ItemForm = ({ onSubmit, defaultValues, apiError }: Props) => {
  const methods = useForm<ItemFormValues>({
    defaultValues: defaultValues,
  });
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
    setError,
    setValue,
  } = methods;

  const sellerList = useGetSellerNameList();
  const vendorID = watch("vendor_id");

  useEffect(() => {
    if (apiError.length > 0) {
      apiError.forEach(({ name, message }) => {
        setError(name, { message });
      });
    }
  }, [apiError]);

  return (
    <>
      <form {...methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label="Name"
            {...register("name")}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            size="small"
          />
          <TextField
            label="Base Price"
            {...register("base_price")}
            fullWidth
            error={Boolean(errors.base_price)}
            helperText={errors.base_price?.message}
            size="small"
          />

          <SelectList
            label="Choose Vendor"
            name="vendor_id"
            options={sellerList.data}
            value={vendorID}
            onChange={(v) => setValue("vendor_id", v ? v : "")}
            error={Boolean(errors.vendor_id)}
            helperText={errors.vendor_id?.message}
          />

          <TextField
            label="Type"
            {...register("type")}
            fullWidth
            error={Boolean(errors.type)}
            helperText={errors.type?.message}
            select
            size="small"
            value={watch("type")}
          >
            <MenuItem value="regular">Regular</MenuItem>
            <MenuItem value="integration">Integration</MenuItem>
            <MenuItem value="working">Working</MenuItem>
          </TextField>
          <div className="flex justify-end">
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </Stack>
      </form>
    </>
  );
};

export default ItemForm;
