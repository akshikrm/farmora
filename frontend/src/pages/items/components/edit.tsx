import { Dialog, DialogContent } from "@components/dialog";
import PurchaseForm from "./form";
import type { EditPurchaseRequest } from "@app-types/item.types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import purchase from "@api/item.api";

type Props = {
  selectedId: number | null;
  onClose: () => void;
};

const defaultValues: EditPurchaseRequest = {
  id: 0,
  total_price: 0,
  quantity: 0,
  vendor_id: null,
  season_id: null,
  discount_price: 0,
  price_per_unit: 0,
  category_id: null,
  batch_id: null,
  assign_quantity: 0,
  invoice_date: "",
  payment_type: "credit",
};

const EditItem = ({ selectedId, onClose }: Props) => {
  const isShow = selectedId !== null;

  const handleClose = () => {
    onClose();
    methods.reset();
  };

  const methods = useForm<EditPurchaseRequest>({
    defaultValues,
  });

  useEffect(() => {
    const handleFetchById = async (id: number) => {
      const res = await purchase.fetchById(id);

      if (res.status === "success") {
        if (res.data) {
          const data = res.data;
          console.log(data);
          methods.reset({
            id: data.id,
            assign_quantity: data.assign_quantity || 0,
            batch_id: data.batch.id,
            category_id: data.category.id,
            quantity: data.quantity,
            vendor_id: data.vendor.id,
            season_id: data.season.id,
            invoice_date: data.invoice_date,
            invoice_number: data.invoice_number,
            payment_type: data.payment_type,
            discount_price: parseFloat(data.discount_price),
            price_per_unit: parseFloat(data.price_per_unit),
            net_amount: parseFloat(data.net_amount),
            total_price: parseFloat(data.total_price),
          });
          return;
        }
      }
      methods.reset(defaultValues);
    };
    if (selectedId) {
      handleFetchById(selectedId);
    } else {
      methods.reset(defaultValues);
    }
    return () => methods.reset(defaultValues);
  }, [selectedId]);

  const onSubmit = async (inputData: EditPurchaseRequest) => {
    const res = await purchase.updateById(inputData.id, inputData);
    if (res.status === "success") {
      handleClose();
      return;
    }
    if (res.status === "validation_error") {
      res.error.forEach((error) => {
        methods.setError(error.name, { message: error.message });
      });
    }
  };

  return (
    <Dialog isOpen={isShow} headerTitle="Edit Purchase" onClose={handleClose}>
      <DialogContent>
        <PurchaseForm methods={methods} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default EditItem;
