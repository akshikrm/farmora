type Props = {
  id: string;
  name: string;
};

const Label = ({ id, name }: Props) => {
  return (
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
      {name}
    </label>
  );
};

export default Label;
