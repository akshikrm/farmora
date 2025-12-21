import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent } from "@components/dialog";
import Input from "@components/form/input";
import auth from "@api/auth.api";
import type { ManagerRegistrationPayload } from "@app-types/auth.types";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  packageId: number;
  packageName: string;
};

const ManagerRegistrationDialog = ({
  isOpen,
  onClose,
  packageId,
  packageName,
}: Props) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const methods = useForm<ManagerRegistrationPayload>({
    defaultValues: {
      name: "",
      username: "",
      password: "",
      status: 1,
      package_id: packageId,
    },
  });

  const mutation = useMutation({
    mutationFn: auth.registerManager,
    onSuccess: () => {
      setSuccess(true);
      setError(null);
      setTimeout(() => {
        onClose();
        methods.reset();
        setSuccess(false);
        navigate("/login");
      }, 2000);
    },
    onError: (error: any) => {
      setError(error?.message || "Registration failed. Please try again.");
    },
  });

  const onSubmit = (data: ManagerRegistrationPayload) => {
    setError(null);
    mutation.mutate({
      ...data,
      package_id: packageId,
      status: 1,
    });
  };

  const handleClose = () => {
    if (!mutation.isPending) {
      onClose();
      methods.reset();
      setError(null);
      setSuccess(false);
    }
  };

  return (
    <Dialog isOpen={isOpen} headerTitle="Register for Farm Management" onClose={handleClose}>
      <DialogContent>
        <div className="mb-4">
          <p className="text-gray-700 mb-2">
            Complete the registration to get started with the{" "}
            <span className="font-semibold text-green-600">{packageName}</span> package.
          </p>
        </div>

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-sm font-medium">
              Registration successful! Redirecting to login...
            </p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              name="name"
              label="Full Name"
              placeholder="Enter your full name"
              type="text"
              methods={methods}
            />
            {methods.formState.errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {methods.formState.errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Input
              name="username"
              label="Username"
              placeholder="Choose a username"
              type="text"
              methods={methods}
            />
            {methods.formState.errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {methods.formState.errors.username.message}
              </p>
            )}
          </div>

          <div>
            <Input
              name="password"
              label="Password"
              placeholder="Create a password"
              type="password"
              methods={methods}
            />
            {methods.formState.errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {methods.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={mutation.isPending}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {mutation.isPending ? (
                <>
                  <CircularProgress size={16} sx={{ color: "white" }} />
                  <span>Registering...</span>
                </>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ManagerRegistrationDialog;
