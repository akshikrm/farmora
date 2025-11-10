type Props = {
	content: React.ReactNode;
}

const TableHeaderCell = ({ content }: Props) => {
	return (
		<th className="px-6 py-4 text-sm font-bold text-white bg-blue-600 text-left">
			{content}
		</th>
	);
};

export default TableHeaderCell;
