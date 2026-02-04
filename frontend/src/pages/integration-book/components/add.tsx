import { Dialog, DialogContent } from "@components/dialog";
import useAddForm from "@hooks/use-add-form";
import integrationBook from "@api/integration-book.api";
import type { NewIntegrationBookRequest } from "@app-types/integration-book.types";
import IntegrationBookForm from "./form";
import dayjs from "dayjs";

const defaultValues: NewIntegrationBookRequest = {
	farm_id: null,
	amount: "",
	date: dayjs().toISOString(),
	payment_type: "credit",
};

type Props = {
	isShow: boolean;
	onClose: () => void;
};

const AddIntegrationBook = ({ isShow, onClose }: Props) => {
	const handleClose = () => {
		onClose();
		methods.reset();
	};

	const { methods, onSubmit } = useAddForm<NewIntegrationBookRequest>({
		defaultValues,
		mutationFn: integrationBook.create,
		mutationKey: "integration-book:add",
		onSuccess: () => {
			handleClose();
		},
	});

	return (
		<Dialog isOpen={isShow} headerTitle="Add Integration Book Entry" onClose={handleClose}>
			<DialogContent>
				<IntegrationBookForm methods={methods} onSubmit={onSubmit} />
			</DialogContent>
		</Dialog>
	);
};

export default AddIntegrationBook;
