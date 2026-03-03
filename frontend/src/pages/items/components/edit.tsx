import { Dialog, DialogContent } from "@components/dialog";
import ItemForm from "./form";
import type { EditItemRequest } from "@app-types/item-category.types";
import { useEffect } from "react";
import items from "@api/item-category.api";
import { useForm } from "react-hook-form";

type Props = {
  selectedId: number | null;
  onClose: () => void;
};

const defaultValues: EditItemRequest = {
  id: 0,
  name: "",
  base_price: "",
  vendor_id: "",
  type: "",
};

const EditItemCategory = ({ selectedId, onClose }: Props) => {
  const isShow = selectedId !== null;

  const handleClose = () => {
    onClose();
    methods.reset();
  };

  const methods = useForm<EditItemRequest>({
    defaultValues,
  });

  useEffect(() => {
    const handleFetchById = async (id: number) => {
      const res = await items.fetchById(id);
      if (res.status === "success") {
        if (res.data) {
          methods.reset({
            id: res.data.id,
            name: res.data.name,
            base_price: res.data.base_price,
            type: res.data.type,
            vendor_id: res.data.vendor_id,
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

  const onSubmit = async (inputData: EditItemRequest) => {
    const res = await items.updateById(inputData.id, inputData);
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
    <Dialog isOpen={isShow} headerTitle="Edit Item" onClose={handleClose}>
      <DialogContent>
        <ItemForm methods={methods} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default EditItemCategory;
