type Props = {
	content: React.ReactNode;
}

const TableHeaderCell = ({ content }: Props) => {
	return (
		<th className="px-4 py-3 text-sm font-bold text-white bg-green-600 text-left whitespace-nowrap">
			{content}
		</th>
	);
};

export default TableHeaderCell;
