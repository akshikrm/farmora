import Label from "@components/form/label";
import type { UseFormReturn } from "react-hook-form";

const Input = ({
  name,
  label,
  methods,
  placeholder,
}: {
  name: string;
  label: string;
  placeholder: string;
  type: "text" | "password" | "select";
  methods: UseFormReturn<any>;
}) => {
  return (
    <>
      <Label id={name} name={label} />
      <input
        type="text"
        id={name}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder={placeholder || undefined}
        {...methods.register(name)}
      />
    </>
  );
};

export default Input;
