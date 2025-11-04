import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
}

const Table = ({ children }: Props) => {
	return (
		<div className="overflow-x-auto">
			<table className="w-full bg-white border-collapse">
				{children}
			</table>
		</div>
	);
};

export default Table;
