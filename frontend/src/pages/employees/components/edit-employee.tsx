import { Dialog, DialogContent } from "@components/dialog";
import EmployeeForm from "./employee-form";
import type { EmployeeFormValues } from "@app-types/employees.types";
import employee from "@api/employees.api";
import { useCallback, useEffect, useState } from "react";
import Ternary from "@components/ternary";

type Props = {
  selectedId: number | null;
  refetch: () => void;
  onClose: () => void;
};

const EditEmployee = (props: Props) => {
  const { selectedId, onClose, refetch } = props;
  const isShow = selectedId !== null;
  const [dataLoaded, setdataLoaded] = useState(false);
  const [selectedData, setSelectedData] = useState<EmployeeFormValues>({
    name: "",
    username: "",
  });

  useEffect(() => {
    const handleGetEmployeeById = async (id: number) => {
      const res = await employee.fetchById(id);
      if (res.status === "success") {
        if (res.data) {
          const { name, username } = res.data;
          setSelectedData({
            name,
            username,
          });
          setdataLoaded(true);
        }
      }
    };

    if (selectedId) {
      handleGetEmployeeById(selectedId);
    }
  }, [selectedId]);

  const onSubmit = useCallback(
    async (inputData: EmployeeFormValues) => {
      if (!selectedId) return;
      const res = await employee.updateById(selectedId, inputData);
      if (res.status === "success") {
        onClose();
        refetch();
      }
    },
    [selectedId],
  );

  return (
    <>
      <Dialog headerTitle="Edit Employee" isOpen={isShow} onClose={onClose}>
        <DialogContent>
          <Ternary
            when={dataLoaded}
            then={
              <EmployeeForm
                onSubmit={onSubmit}
                defaultValues={selectedData}
                hidePassword
              />
            }
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditEmployee;
