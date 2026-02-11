import batches from "@api/batches.api";
import item from "@api/item.api";
import type { BatchName } from "@app-types/batch.types";
import type { ItemCategoryName } from "@app-types/item-category.types";
import SelectList from "@components/select-list";
import Ternary from "@components/ternary";
import useGetItemCategoryName from "@hooks/item-category/use-get-item-category-names";
import useGetSeasonNameList from "@hooks/use-get-season-names";
import useGetSellerNameList from "@hooks/use-get-vendor-name-list";
import { TextField, Button, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

type Props = {
  methods: any;
  onSubmit: (payload: any) => void;
};

const PurchaseForm = ({ methods, onSubmit }: Props) => {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  const itemCategoryName = useGetItemCategoryName();
  const sellerList = useGetSellerNameList();
  const values = methods.watch();

  const selectedCategoryId = watch("category_id") as number;

  const [hidePaymentType, setHidePaymentType] = useState<boolean>(false);

  const [itemList, setItemList] = useState<ItemCategoryName[]>([]);
  useEffect(() => {
    const handleGetItemsByVendorID = async (vendorId: number) => {
      const res = await item.getByVendorId(vendorId);
      if (res.status === "success") {
        if (res.data) {
          setItemList(res.data);
          return;
        }
      }
      setItemList([]);
    };
    if (values.vendor_id) {
      handleGetItemsByVendorID(values.vendor_id);
    } else {
      setItemList([]);
    }
  }, [values.vendor_id]);

  useEffect(() => {
    if (selectedCategoryId) {
      if (itemCategoryName.data) {
        const selected = itemCategoryName.data.find((item) => {
          return item.id === selectedCategoryId;
        });
        if (selected?.type === "integration") {
          setValue("payment_type", "credit");
          setHidePaymentType(true);
          return;
        }
      }
    }
    setHidePaymentType(false);
  }, [selectedCategoryId]);

  const seasonNames = useGetSeasonNameList();

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

    if (values.season_id) {
      handleGetBatchBySeasonId(values.season_id);
    } else {
      setBatchList([]);
    }
  }, [values.season_id]);

  return (
    <>
      <form {...methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectList
            options={seasonNames.data}
            value={values.season_id}
            onChange={(val) => {
              (setValue as any)("season_id", val);
            }}
            label="Season"
            name="season_id"
            error={Boolean(errors.season_id)}
            helperText={errors.season_id?.message}
          />

          <SelectList
            options={batchList}
            disabled={batchList.length === 0}
            value={values.batch_id}
            onChange={(val) => {
              (setValue as any)("batch_id", val);
            }}
            label="Batch"
            name="batch_id"
            error={Boolean(errors.batch_id)}
            helperText={errors.batch_id?.message}
          />

          <DatePicker
            label="Invoice Date"
            name="invoice_date"
            value={values.invoice_date ? dayjs(values.invoice_date) : null}
            format="DD-MM-YYYY"
            onChange={(v) => {
              (setValue as any)("invoice_date", dayjs(v).toISOString());
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
              (setValue as any)("vendor_id", val);
            }}
            label="Vendor"
            name="vendor_id"
            error={Boolean(errors.vendor_id)}
            helperText={errors.vendor_id?.message}
          />

          <SelectList
            options={itemList}
            value={values.category_id}
            disabled={itemList.length === 0}
            onChange={(val) => {
              (setValue as any)("category_id", val);
            }}
            label="Item"
            name="category_id"
            error={Boolean(errors.category_id)}
            helperText={errors.category_id?.message}
          />

          <TextField
            label="Total Price"
            {...(register as any)("total_price")}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            size="small"
          />
          <TextField
            label="Discount Price"
            {...(register as any)("discount_price")}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            size="small"
          />
          <TextField
            label="Net amount"
            {...(register as any)("net_amount")}
            fullWidth
            error={Boolean((errors as any).net_amount)}
            helperText={(errors as any).net_amount?.message}
            size="small"
          />
          <TextField
            label="Quantity"
            {...(register as any)("quantity")}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            size="small"
          />
          <TextField
            label="Price Per Unit"
            {...(register as any)("price_per_unit")}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            size="small"
          />

          <TextField
            label="Assign Quantity"
            {...(register as any)("assign_quantity")}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            size="small"
          />

          <Ternary
            when={!hidePaymentType}
            then={
              <TextField
                select
                label="Payment Type"
                {...(register as any)("payment_type")}
                value={values.payment_type || "credit"}
                fullWidth
                error={Boolean(errors.payment_type)}
                helperText={errors.payment_type?.message}
                size="small"
              >
                <MenuItem value="credit">Credit</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
              </TextField>
            }
          />
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

export default PurchaseForm;
