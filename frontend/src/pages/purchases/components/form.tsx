import batches from "@api/batches.api";
import type { BatchName } from "@app-types/batch.types";
import SelectList from "@components/select-list";
import Ternary from "@components/ternary";
import useGetSeasonNameList from "@hooks/use-get-season-names";
import useGetSellerNameList from "@hooks/use-get-vendor-name-list";
import { TextField, Button, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useForm, type DefaultValues } from "react-hook-form";
import type { PurchaseFormValues } from "../types";
import type { ValidationError } from "@errors/api.error";
import useGetItemsByVendorId from "@pages/items/hooks/use-get-items-by-vendor-id";
import purchase from "../api";
import { itemTypes } from "@pages/items";

type Props = {
  defaultValues: DefaultValues<PurchaseFormValues>;
  onSubmit: (payload: any) => void;
  apiError: ValidationError[];
};

const PurchaseForm = ({ onSubmit, defaultValues, apiError }: Props) => {
  const methods = useForm({ defaultValues });
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = methods;

  useEffect(() => {
    methods.reset(defaultValues);
  }, [defaultValues]);

  const sellerList = useGetSellerNameList();
  const values = methods.watch();

  const selectedCategoryId = watch("category_id") as number;
  const { handleGetItemsByVendorID, itemList } = useGetItemsByVendorId();

  const seasonNames = useGetSeasonNameList();
  const batchList = useGetBAtchBySeasonId(values.season_id);

  const selectedType = useMemo(() => {
    if (selectedCategoryId) {
      if (itemList) {
        const selected = itemList.find(
          (item) => item.id === selectedCategoryId,
        );
        if (selected) {
          const { type } = selected;
          return type;
        }
      }
    }
    return itemTypes.find((item) => item.value === "regular")?.value;
  }, [selectedCategoryId, itemList]);

  const [qty, pricePerUnit, discountPrice, totalPrice] = watch([
    "quantity",
    "price_per_unit",
    "discount_price",
    "total_price",
  ]);

  useEffect(() => {
    if (totalPrice && qty) {
      setValue("price_per_unit", totalPrice / qty);
    }
  }, [qty]);

  useEffect(() => {
    if (totalPrice && discountPrice) {
      setValue("net_amount", totalPrice + (discountPrice || 0));
    }
  }, [totalPrice, discountPrice]);

  useEffect(() => {
    if (selectedType === "working") {
      setValue("quantity", 1);
      setValue("payment_type", "paid");
    }
    if (selectedType === "integration") {
      setValue("quantity", 1);
      setValue("payment_type", "credit");
    }
  }, [selectedType]);

  useEffect(() => {
    if (values.vendor_id) {
      handleGetItemsByVendorID(values.vendor_id);
    }
  }, [values.vendor_id]);

  useEffect(() => {
    const handleGetInvoiceNumber = async () => {
      const invoiceNumber = await purchase.getInvoiceNumber();
      if (invoiceNumber) {
        setValue("invoice_number", invoiceNumber);
      }
    };
    if (!values.invoice_number) {
      handleGetInvoiceNumber();
    }
  }, [values.invoice_number]);

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectList
            options={seasonNames.data}
            value={values.season_id}
            onChange={(val) => {
              clearErrors("season_id");
              setValue("season_id", val);
            }}
            label="Season"
            name="season_id"
            error={Boolean(errors.season_id)}
            helperText={errors.season_id?.message}
          />
          <DatePicker
            label="Invoice Date"
            name="invoice_date"
            value={values.invoice_date ? dayjs(values.invoice_date) : null}
            format="DD-MM-YYYY"
            onChange={(v) => {
              clearErrors("invoice_number");
              setValue("invoice_date", dayjs(v).toISOString());
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                error: Boolean(errors.invoice_date),
                helperText: errors.invoice_date?.message,
                size: "small",
              },
            }}
          />
          <TextField
            label="Invoice Number"
            disabled
            {...(register as any)("invoice_number")}
            fullWidth
            error={Boolean(errors.invoice_number)}
            helperText={errors.invoice_number?.message}
            size="small"
          />
          <SelectList
            options={sellerList.data}
            value={values.vendor_id}
            onChange={(val) => {
              clearErrors("vendor_id");
              setValue("vendor_id", val);
            }}
            label="Supplier"
            name="vendor_id"
            error={Boolean(errors.vendor_id)}
            helperText={errors.vendor_id?.message}
          />
          <SelectList
            options={itemList}
            value={values.category_id}
            disabled={itemList.length === 0}
            onChange={(val) => {
              clearErrors("category_id");
              setValue("category_id", val);
            }}
            label="Type"
            name="category_id"
            error={Boolean(errors.category_id)}
            helperText={errors.category_id?.message}
          />
          then=
          {
            <SelectList
              options={batchList}
              disabled={batchList.length === 0}
              value={values.batch_id}
              onChange={(val) => {
                clearErrors("batch_id");
                setValue("batch_id", val);
              }}
              label="Batch"
              name="batch_id"
              error={Boolean(errors.batch_id)}
              helperText={errors.batch_id?.message}
            />
          }
          <TextField
            label="Quantity (Nos)"
            {...register("quantity")}
            fullWidth
            disabled={
              selectedType === "working" || selectedType === "integration"
            }
            error={Boolean(errors.quantity)}
            helperText={errors.quantity?.message}
            size="small"
          />
          <TextField
            label="Rate / Number"
            value={pricePerUnit}
            onChange={(e) => {
              const { value } = e.target;
              if (value === "") {
                setValue("price_per_unit", 0);
                return;
              }
              const parsedValue = parseFloat(value);
              if (isNaN(parsedValue)) {
                setValue("price_per_unit", 0);
                return;
              }
              setValue("price_per_unit", parsedValue);
              setValue("total_price", parsedValue * (qty || 1));
            }}
            fullWidth
            error={Boolean(errors.price_per_unit)}
            helperText={errors.price_per_unit?.message}
            size="small"
          />
          <TextField
            label="Total Amount"
            value={totalPrice}
            onChange={(e) => {
              const { value } = e.target;
              if (value === "") {
                setValue("total_price", 0);
                return;
              }
              const parsedValue = parseFloat(value);
              if (isNaN(parsedValue)) {
                setValue("total_price", 0);
                return;
              }
              setValue("total_price", parsedValue);
              setValue("price_per_unit", parsedValue / (qty || 1));
            }}
            fullWidth
            error={Boolean(errors.total_price)}
            helperText={errors.total_price?.message}
            size="small"
          />
          <TextField
            label="Discount / Round Off"
            name="discount_price"
            value={discountPrice}
            onChange={(e) => {
              const { value } = e.target;
              if (value === "") {
                setValue("discount_price", "");
                return;
              }
              const parsedValue = parseFloat(value);
              if (isNaN(parsedValue)) {
                setValue("discount_price", 0);
                return;
              }
              setValue("discount_price", parsedValue);
            }}
            fullWidth
            error={Boolean(errors.discount_price)}
            helperText={errors.discount_price?.message}
            size="small"
          />
          <TextField
            label="Net amount"
            {...register("net_amount")}
            fullWidth
            disabled
            error={Boolean(errors.net_amount)}
            helperText={errors.net_amount?.message}
            size="small"
          />
          <TextField
            label="Assign Quantity"
            {...register("assign_quantity")}
            fullWidth
            error={Boolean(errors.assign_quantity)}
            helperText={errors.assign_quantity?.message}
            size="small"
          />
          <TextField
            select
            label="Payment Type"
            {...register("payment_type")}
            value={values.payment_type || "credit"}
            fullWidth
            disabled={
              selectedType === "working" || selectedType === "integration"
            }
            error={Boolean(errors.payment_type)}
            helperText={errors.payment_type?.message}
            size="small"
          >
            <MenuItem value="credit">Credit</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
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

const useGetBAtchBySeasonId = (seasonId: number | null | undefined) => {
  const [batchList, setBatchList] = useState<BatchName[]>([]);
  useEffect(() => {
    const handleGetBatchBySeasonId = async (seasonId: number) => {
      const res = await batches.getBySeasonId(seasonId);

      if (res.status === "success") {
        if (res.data) {
          setBatchList(res.data);
          return;
        }
      }
      setBatchList([]);
    };

    if (seasonId) {
      handleGetBatchBySeasonId(seasonId);
    } else {
      setBatchList([]);
    }
  }, [seasonId]);

  return batchList;
};

export default PurchaseForm;
