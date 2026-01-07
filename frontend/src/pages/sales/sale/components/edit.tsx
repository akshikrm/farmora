import { Dialog, DialogContent } from "@components/dialog";
import useEditForm from "@hooks/use-edit-form";
import useGetById from "@hooks/use-get-by-id";
import sales from "@api/sales.api";
import type { EditSaleRequest } from "@app-types/sales.types";
import SaleForm from "./form";

type Props = {
  selectedId: number | null;
  onClose: () => void;
};

const defaultValues: EditSaleRequest = {
  id: 0,
  season_id: null,
  batch_id: null,
  date: "",
  buyer_id: null,
  vehicle_no: "",
  weight: 0,
  bird_no: 0,
  payment_type: null,
  price: 0,
  narration: "",
};

const EditSale = ({ selectedId, onClose }: Props) => {
  const isShow = selectedId !== null;

  const handleClose = () => {
    onClose();
    methods.reset();
  };

  const query = useGetById<EditSaleRequest>(selectedId, {
    defaultValues,
    queryKey: "sale:get-by-id",
    queryFn: sales.fetchById,
  });

  const { methods, onSubmit } = useEditForm<EditSaleRequest>({
    defaultValues: query.data as EditSaleRequest,
    mutationKey: "sales:edit",
    mutationFn: sales.updateById,
    onSuccess: () => {
      handleClose();
    },
  });

  return (
    <Dialog isOpen={isShow} headerTitle="Edit Sale" onClose={handleClose}>
      <DialogContent>
        <SaleForm methods={methods} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default EditSale;
