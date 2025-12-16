import type { NewSubscriptionRequest, EditSubscriptionRequest } from "@app-types/subscription.types";
import SelectList from "@components/select-list";
import useGetPackageNames from "@hooks/package/use-get-package-names";
import type { FieldValues, UseFormReturn } from "react-hook-form";

type EditMethod = UseFormReturn<EditSubscriptionRequest, any, FieldValues>;
type AddMethod = UseFormReturn<NewSubscriptionRequest, any, FieldValues>;

type Props = {
  methods: EditMethod | AddMethod;
  onSubmit: (payload: any) => void;
};

const SubscriptionForm = ({ methods, onSubmit }: Props) => {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const packageNames = useGetPackageNames();
  const values = methods.watch();

  return (
    <>
      <form {...methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <SelectList
            options={packageNames.data}
            value={values.package_id}
            onChange={(name, val) => {
              (setValue as any)(name, val);
            }}
            label="Package"
            name="package_id"
            error={Boolean(errors.package_id)}
            helperText={errors.package_id?.message}
          />
        </div>
        <div className="flex justify-end mt-6">
          <button
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
            type="submit"
          >
            submit
          </button>
        </div>
      </form>
    </>
  );
};

export default SubscriptionForm;
