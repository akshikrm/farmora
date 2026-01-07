import generalExpense from "@api/general-expense.api";
import type { GeneralExpenseFilterRequest } from "@app-types/general-expense.types";
import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import FilterGeneralExpense from "./filter";
import { useForm } from "react-hook-form";
import { useState, useMemo } from "react";
import DataNotFound from "@components/data-not-found";
import DataLoading from "@components/data-loading";
import Ternary from "@components/ternary";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { EditIcon } from "lucide-react";

const headers = ["Date", "Season", "Purpose", "Amount", "Action"];

type Props = {
  onEdit: (selectedId: number) => void;
};

const GeneralExpenseTable = ({ onEdit }: Props) => {
  const [filter, setFilter] = useState<GeneralExpenseFilterRequest>({
    season_id: null,
    start_date: "",
    end_date: "",
  });

  const [hasFiltered, setHasFiltered] = useState(false);

  const methods = useForm<GeneralExpenseFilterRequest>({
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
    name: keyof GeneralExpenseFilterRequest,
    value: string | number | null,
  ) => {
    setValue(name, value as any);
  };

  const generalExpenseQuery = useQuery({
    queryKey: ["general-expense", filter],
    queryFn: () => generalExpense.fetchAll(filter as any),
    enabled: hasFiltered && filter.season_id !== null,
  });

  const onFilter = async () => {
    if (values.season_id) {
      setFilter(values);
      setHasFiltered(true);
    }
  };

  const isEmpty = useMemo(() => {
    return generalExpenseQuery.data?.length === 0;
  }, [generalExpenseQuery.data]);

  const isFirstLoading = useMemo(() => {
    return (
      generalExpenseQuery.isLoading || (isEmpty && !generalExpenseQuery.isFetched)
    );
  }, [generalExpenseQuery.isLoading, isEmpty, generalExpenseQuery.isFetched]);

  const calculateTotal = (items: any[]) => {
    if (!items || items.length === 0) return 0;

    const total = items.reduce((acc, item) => {
      return parseFloat(acc) + (parseFloat(item.amount.toString()) || 0);
    }, 0);

    return total;
  };

  const totalAmount = calculateTotal(generalExpenseQuery.data || []);

  return (
    <>
      <FilterGeneralExpense
        register={register}
        errors={errors}
        values={values}
        onChange={onChange}
        onFilter={onFilter}
      />
      {!hasFiltered ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-lg">
            Please select a season and click "Apply Filters" to view general expenses
          </p>
        </div>
      ) : (
        <Ternary
          when={isFirstLoading}
          then={<DataLoading />}
          otherwise={
            <div className="w-full">
              <Table>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeaderCell key={header} content={header} />
                  ))}
                </TableRow>
                {generalExpenseQuery.data?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell content={dayjs(item.date).format("DD-MM-YYYY")} />
                    <TableCell content={item.season?.name || `Season ${item.season_id}`} />
                    <TableCell content={item.purpose} />
                    <TableCell content={item.amount || 0} />
                    <TableCell
                      content={
                        <EditIcon
                          className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer"
                          onClick={() => {
                            onEdit(item.id);
                          }}
                        />
                      }
                    />
                  </TableRow>
                ))}
              </Table>
              {isEmpty && (
                <DataNotFound
                  title="No general expense records found"
                  description="No general expense items found for the selected season and date range"
                />
              )}
              {!isEmpty && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
                  <h5 className="text-md font-semibold text-gray-800">
                    Total Amount: ₹{totalAmount.toFixed(2)}
                  </h5>
                </div>
              )}
            </div>
          }
        />
      )}
    </>
  );
};

export default GeneralExpenseTable;
