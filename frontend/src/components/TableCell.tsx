type Props = {
	content: React.ReactNode;
}

const TableCell = ({ content }: Props) => {
	return (
		<td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
			{content}
		</td>
	);
};

export default TableCell;
