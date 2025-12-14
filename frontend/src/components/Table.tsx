import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
}

const Table = ({ children }: Props) => {
	return (
		<div className="overflow-x-auto shadow-md rounded-lg">
			<table className="min-w-full bg-white border-collapse">
				<tbody>
					{children}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
