import item from "@api/item.api";
import type { Item, ItemFilterRequest } from "@app-types/item.types";
import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import useGetAll from "@hooks/use-get-all";
import { EditIcon } from "lucide-react";
import FilterItems from "./filter";
import { useForm } from "react-hook-form";
import { useState, useEffect, useMemo } from "react";
import DataNotFound from "@components/data-not-found";
import DataLoading from "@components/data-loading";
import Ternary from "@components/ternary";
import dayjs from "dayjs";

const headers = [
  "Type",
  "Invoice Number",
  "Invoice Date",
  "Supplier Name",
  "Total Amount",
  "Total Discount",
  "Net Amount",
  "Action",
];

type Props = {
  onEdit: (selectedId: number) => void;
};

const ItemTable = ({ onEdit }: Props) => {
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

  const [filter, setFilter] = useState<ItemFilterRequest>({
    name: "",
    vendor_id: null,
    category_id: null,
    batch_id: null,
    start_date: weekDates.start_date,
    end_date: weekDates.end_date,
  });

  const methods = useForm<ItemFilterRequest>({
    defaultValues: filter,
  });

  const {
    setValue,
    register,
    formState: { errors },
    watch,
  } = methods;

  const values = watch();

  const onChange = (name: keyof ItemFilterRequest, value: string | number | null) => {
    setValue(name, value as any);
  };

  const itemCategoryList = useGetAll<Item>({
    queryFn: () => item.fetchAll(filter),
    queryKey: ["item:all", filter],
  });

  useEffect(() => {
    itemCategoryList.refetch();
  }, [filter]);

  const isEmpty = useMemo(() => {
    return itemCategoryList.data?.data.length === 0;
  }, [itemCategoryList.data]);

  const isFirstLoading = useMemo(() => {
    return (
      itemCategoryList.isLoading || (isEmpty && !itemCategoryList.isFetched)
    );
  }, [itemCategoryList.isLoading, isEmpty, itemCategoryList.isFetched]);

  console.log(itemCategoryList.data?.data);
  return (
    <>
      <FilterItems
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
              {itemCategoryList.data.data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell content={item.category.name} />
                  <TableCell content={item.invoice_number} />
                  <TableCell
                    content={dayjs(item.invoice_date).format("DD-MM-YYYY")}
                  />
                  <TableCell content={item.vendor.name} />
                  <TableCell content={item.total_price} />
                  <TableCell content={item.discount_price} />
                  <TableCell content={item.net_amount || "-"} />
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
            <Ternary
              when={isEmpty}
              then={
                <DataNotFound
                  title="No purchases found"
                  description="Try adjusting your filters or create a new purchase"
                />
              }
            />
          </>
        }
      />
    </>
  );
};

export default ItemTable;
