type Props = {
	content: React.ReactNode;
}

const TableCell = ({ content }: Props) => {
	return (
		<td className="px-6 py-4 text-sm text-gray-700">
			{content}
		</td>
	);
};

export default TableCell;
