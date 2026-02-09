import SelectList from "@components/select-list";
import useGetSellerNameList from "@hooks/use-get-vendor-name-list";
import { Stack, TextField, Button, MenuItem } from "@mui/material";

type Props = {
  methods: any;
  onSubmit: (payload: any) => void;
};

const ItemCategoryForm = ({ methods, onSubmit }: Props) => {
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
    setValue,
  } = methods;

  const sellerList = useGetSellerNameList();
  const vendorID = watch("vendor_id");

  return (
    <>
      <form {...methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label="Name"
            {...(register as any)("name")}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            size="small"
          />

          <SelectList
            label="Choose Vendor"
            name="vendor_id"
            options={sellerList.data}
            value={vendorID}
            onChange={(v) => setValue("vendor_id", v ? v : "")}
          />

          <TextField
            label="Type"
            {...(register as any)("type")}
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

export default ItemCategoryForm;
