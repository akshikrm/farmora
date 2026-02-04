import { Dialog, DialogContent } from "@components/dialog";
import useAddForm from "@hooks/use-add-form";
import workingCost from "@api/working-cost.api";
import type { NewWorkingCostRequest } from "@app-types/working-cost.types";
import WorkingCostForm from "./form";
import dayjs from "dayjs";

const defaultValues: NewWorkingCostRequest = {
	season_id: null,
	purpose: "",
	amount: "",
	date: dayjs().toISOString(),
	payment_type: "expense",
};

type Props = {
	isShow: boolean;
	onClose: () => void;
};

const AddWorkingCost = ({ isShow, onClose }: Props) => {
	const handleClose = () => {
		onClose();
		methods.reset();
	};

	const { methods, onSubmit } = useAddForm<NewWorkingCostRequest>({
		defaultValues,
		mutationFn: workingCost.create,
		mutationKey: "working-cost:add",
		onSuccess: () => {
			handleClose();
		},
	});

	return (
		<Dialog isOpen={isShow} headerTitle="Add Working Cost Entry" onClose={handleClose}>
			<DialogContent>
				<WorkingCostForm methods={methods} onSubmit={onSubmit} />
			</DialogContent>
		</Dialog>
	);
};

export default AddWorkingCost;
