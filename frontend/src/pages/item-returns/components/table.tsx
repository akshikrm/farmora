import itemReturn from "@api/item-return.api";
import type { ItemReturn, ItemReturnFilterRequest } from "@app-types/item-return.types";
import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import useGetAll from "@hooks/use-get-all";
import { EditIcon } from "lucide-react";
import FilterItemReturns from "./filter";
import { useForm } from "react-hook-form";
import { useState, useEffect, useMemo } from "react";
import DataNotFound from "@components/data-not-found";
import DataLoading from "@components/data-loading";
import Ternary from "@components/ternary";
import dayjs from "dayjs";

const headers = [
  "Return Type",
  "Category",
  "From Batch",
  "To Batch/Vendor",
  "Date",
  "Quantity",
  "Rate",
  "Total Amount",
  "Status",
  "Action",
];

type Props = {
  onEdit: (selectedId: number) => void;
};

const ItemReturnTable = ({ onEdit }: Props) => {
  const getWeekStartEnd = () => {
    const today = dayjs();
    const startOfWeek = today.startOf("week");
    const endOfWeek = today.endOf("week");
    return {
      start_date: startOfWeek.toISOString(),
      end_date: endOfWeek.toISOString(),
    };
  };

  const weekDates = getWeekStartEnd();

  const [filter, setFilter] = useState<ItemReturnFilterRequest>({
    return_type: "",
    item_category_id: null,
    from_batch: null,
    to_batch: null,
    to_vendor: null,
    status: "",
    start_date: weekDates.start_date,
    end_date: weekDates.end_date,
  });

  const methods = useForm<ItemReturnFilterRequest>({
    defaultValues: filter,
  });

  const {
    setValue,
    register,
    formState: { errors },
    watch,
  } = methods;

  const values = watch();

  const onChange = (name: keyof ItemReturnFilterRequest, value: string | number) => {
    setValue(name, value);
  };

  const itemReturnList = useGetAll<ItemReturn>({
    queryFn: () => itemReturn.fetchAll(filter),
    queryKey: ["item-return:all", filter],
  });

  useEffect(() => {
    itemReturnList.refetch();
  }, [filter]);

  const isEmpty = useMemo(() => {
    return itemReturnList.data?.data.length === 0;
  }, [itemReturnList.data]);

  const isFirstLoading = useMemo(() => {
    return (
      itemReturnList.isLoading || (isEmpty && !itemReturnList.isFetched)
    );
  }, [itemReturnList.isLoading, isEmpty, itemReturnList.isFetched]);

  return (
    <>
      <FilterItemReturns
        register={register}
        errors={errors}
        values={values}
        onChange={onChange}
        onFilter={async () => {
          setFilter(values);
        }}
      />
      <Ternary
        when={isFirstLoading}
        then={<DataLoading />}
        otherwise={
          <>
            <Table>
              <TableRow>
                {headers.map((header) => (
                  <TableHeaderCell key={header} content={header} />
                ))}
              </TableRow>
              {itemReturnList.data.data.map((returnItem) => (
                <TableRow key={returnItem.id}>
                  <TableCell content={returnItem.return_type} />
                  <TableCell content={returnItem.category?.name || "-"} />
                  <TableCell content={returnItem.from_batch_data?.name || "-"} />
                  <TableCell
                    content={
                      returnItem.return_type === "batch"
                        ? returnItem.to_batch_data?.name || "-"
                        : returnItem.to_vendor_data?.name || "-"
                    }
                  />
                  <TableCell
                    content={dayjs(returnItem.date).format("DD-MM-YYYY")}
                  />
                  <TableCell content={returnItem.quantity} />
                  <TableCell content={returnItem.rate_per_bag} />
                  <TableCell content={returnItem.total_amount} />
                  <TableCell content={returnItem.status} />
                  <TableCell
                    content={
                      <EditIcon
                        className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer"
                        onClick={() => {
                          onEdit(returnItem.id);
                        }}
                      />
                    }
                  />
                </TableRow>
              ))}
            </Table>
            <Ternary
              when={isEmpty}
              then={
                <DataNotFound
                  title="No returns found"
                  description="Try adjusting your filters or create a new return"
                />
              }
            />
          </>
        }
      />
    </>
  );
};

export default ItemReturnTable;
