import type { NewUserRequest } from "@app-types/users.types";
import Label from "@components/form/label";
import type { UseFormReturn } from "react-hook-form";

type Props = {
  methods: UseFormReturn<NewUserRequest>;
  onSubmit: (payload: NewUserRequest) => void;
};

const UserForm = ({ methods, onSubmit }: Props) => {
  return (
    <div>
      <form {...methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Label id="name" name="Name" />
          <input
            type="text"
            id="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="name"
            {...methods.register("name")}
          />
        </div>
        <div className="mb-4">
          <Label id="username" name="Username" />
          <input
            type="text"
            id="username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="username"
            {...methods.register("username")}
          />
        </div>
        <div className="mb-4">
          <Label id="password" name="Password" />
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="password"
            {...methods.register("password")}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
            type="submit"
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
