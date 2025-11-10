import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
}

const TableRow = ({ children }: Props) => {
	return (
		<tr className="border-b border-gray-200 hover:bg-gray-50">
			{children}
		</tr>
	);
};

export default TableRow;
