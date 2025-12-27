import type {
  NewItemCategoryRequest,
  EditItemCategoryRequest,
} from "@app-types/item-category.types";
import { Stack, TextField, Button, MenuItem } from "@mui/material";
import type { FieldValues, UseFormReturn } from "react-hook-form";

type EditMethod = UseFormReturn<EditItemCategoryRequest, any, FieldValues>;
type AddMethod = UseFormReturn<NewItemCategoryRequest, any, FieldValues>;

type Props = {
  methods: EditMethod | AddMethod;
  onSubmit: (payload: any) => void;
};

const ItemCategoryForm = ({ methods, onSubmit }: Props) => {
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
            {...(register as any)("name")}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
          <TextField
            label="Type"
            fullWidth
            error={Boolean(errors.type)}
            helperText={errors.type?.message}
            value={methods.watch("type") || ""}
            name="type"
            onChange={(e) => methods.setValue(e.target.name, e.target.value)}
            select
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
