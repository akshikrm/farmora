import { Dialog, DialogContent } from "@components/dialog";
import useAddForm from "@hooks/use-add-form";
import sales from "@api/sales.api";
import type { NewSaleRequest } from "@app-types/sales.types";
import SaleForm from "./form";

const defaultValues: NewSaleRequest = {
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

type Props = {
  isShow: boolean;
  onClose: () => void;
};

const AddSale = ({ isShow, onClose }: Props) => {
  const handleClose = () => {
    onClose();
    methods.reset();
  };

  const { methods, onSubmit } = useAddForm<NewSaleRequest>({
    defaultValues,
    mutationFn: sales.create,
    mutationKey: "sales:add",
    onSuccess: () => {
      handleClose();
    },
  });

  return (
    <Dialog isOpen={isShow} headerTitle="Add New Sale" onClose={handleClose}>
      <DialogContent>
        <SaleForm methods={methods} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddSale;
