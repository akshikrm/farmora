import { Dialog, DialogContent } from "@components/dialog";
import PurchaseForm from "./form";
import useEditForm from "@hooks/use-edit-form";
import useGetById from "@hooks/use-get-by-id";
import itemCategories from "@api/item.api";
import type { EditItemRequest } from "@app-types/item.types";

type Props = {
  selectedId: number | null;
  onClose: () => void;
};

const defaultValues: EditItemRequest = {
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

  const query = useGetById<EditItemRequest>(selectedId, {
    defaultValues,
    queryKey: "item:get-by-id",
    queryFn: itemCategories.fetchById,
  });

  const { methods, onSubmit } = useEditForm<EditItemRequest>({
    defaultValues: query.data as EditItemRequest,
    onSuccess: () => {
      handleClose();
    },
  });

  return (
    <Dialog isOpen={isShow} headerTitle="Edit Purchase" onClose={handleClose}>
      <DialogContent>
        <PurchaseForm methods={methods} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default EditItem;
