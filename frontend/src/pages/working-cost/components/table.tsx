import workingCost from "@api/working-cost.api";
import type { WorkingCostFilterRequest } from "@app-types/working-cost.types";
import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import FilterWorkingCost from "./filter";
import { useForm } from "react-hook-form";
import { useState, useMemo } from "react";
import DataNotFound from "@components/data-not-found";
import DataLoading from "@components/data-loading";
import Ternary from "@components/ternary";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";

const headers = ["Date", "Purpose", "Amount", "Payment Type", "Status"];

const WorkingCostTable = () => {
  const [filter, setFilter] = useState<WorkingCostFilterRequest>({
    season_id: null,
    start_date: "",
    end_date: "",
  });

  const [hasFiltered, setHasFiltered] = useState(false);

  const methods = useForm<WorkingCostFilterRequest>({
    defaultValues: filter,
  });

  const {
    setValue,
    register,
    formState: { errors },
    watch,
  } = methods;

  const values = watch();

  const onChange = (
    name: keyof WorkingCostFilterRequest,
    value: string | number | null,
  ) => {
    setValue(name, value as any);
  };

  const workingCostQuery = useQuery({
    queryKey: ["working-cost", filter],
    queryFn: () => workingCost.fetchAll(filter as any),
    enabled: hasFiltered && filter.season_id !== null,
  });

  const onFilter = async () => {
    if (values.season_id) {
      setFilter(values);
      setHasFiltered(true);
    }
  };

  const isEmpty = useMemo(() => {
    return (
      workingCostQuery.data?.income?.length === 0 &&
      workingCostQuery.data?.expense?.length === 0
    );
  }, [workingCostQuery.data]);

  const isFirstLoading = useMemo(() => {
    return (
      workingCostQuery.isLoading || (isEmpty && !workingCostQuery.isFetched)
    );
  }, [workingCostQuery.isLoading, isEmpty, workingCostQuery.isFetched]);

  const calculateTotal = (items: any[]) => {
    if (!items || items.length === 0) return 0;

    const total = items.reduce((acc, item) => {
      return parseFloat(acc) + (parseFloat(item.amount.toString()) || 0);
    }, 0);

    return total;
  };

  const incomeTotal = calculateTotal(workingCostQuery.data?.income || []);
  const expenseTotal = calculateTotal(workingCostQuery.data?.expense || []);

  const balanceTotal = useMemo(() => {
    if (incomeTotal === null || expenseTotal === null) return 0;
    return incomeTotal - expenseTotal;
  }, [incomeTotal, expenseTotal]);

  const renderTable = (items: any[], title: string) => (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
      <Table>
        <TableRow>
          {headers.map((header) => (
            <TableHeaderCell key={header} content={header} />
          ))}
        </TableRow>
        {items?.map((item) => (
          <TableRow key={item.id}>
            <TableCell content={dayjs(item.date).format("DD-MM-YYYY")} />
            <TableCell content={item.purpose} />
            <TableCell content={item.amount || "-"} />
            <TableCell content={item.payment_type} />
            <TableCell content={item.status} />
          </TableRow>
        ))}
      </Table>
      {items?.length === 0 && (
        <DataNotFound
          title={`No ${title.toLowerCase()} records found`}
          description={`No ${title.toLowerCase()} items found for the selected season and date range`}
        />
      )}
    </div>
  );

  return (
    <>
      <FilterWorkingCost
        register={register}
        errors={errors}
        values={values}
        onChange={onChange}
        onFilter={onFilter}
      />
      {!hasFiltered ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-lg">
            Please select a season and click "Apply Filters" to view working
            costs
          </p>
        </div>
      ) : (
        <Ternary
          when={isFirstLoading}
          then={<DataLoading />}
          otherwise={
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {renderTable(workingCostQuery.data?.income || [], "Income")}
              {renderTable(workingCostQuery.data?.expense || [], "Expense")}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <TotalItem label="Total Income Amount" value={incomeTotal} />
                <TotalItem label="Total Expense Amount" value={expenseTotal} />
                <TotalItem label="Balance" value={balanceTotal} />
              </div>
            </div>
          }
        />
      )}
    </>
  );
};

const TotalItem = ({ label, value }: { label: string; value: number }) => {
  return (
    <h5 className="text-md font-semibold text-gray-800 mb-2">
      {label}: ₹{value.toFixed(2)}
    </h5>
  );
};

export default WorkingCostTable;
