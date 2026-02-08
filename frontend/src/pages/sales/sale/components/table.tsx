import sales from "@api/sales.api";
import { DatePicker } from "@mui/x-date-pickers";
import type { Sale } from "@app-types/sales.types";
import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import useGetAll from "@hooks/use-get-all";
import { EditIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import DataNotFound from "@components/data-not-found";
import DataLoading from "@components/data-loading";
import Ternary from "@components/ternary";
import dayjs from "dayjs";
import SelectList from "@components/select-list";
import { useQuery } from "@tanstack/react-query";
import type { Vendor } from "@app-types/vendor.types";
import vendors from "@api/vendor.api";
import { useForm } from "react-hook-form";
import seasons from "@api/seasons.api";
import type { SeasonName } from "@app-types/season.types";
import batches from "@api/batches.api";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const headers = [
  "ID",
  "Date",
  "Season",
  "Batch",
  "Buyer",
  "Vehicle No",
  "Weight (kg)",
  "Birds",
  "Avg Weight",
  "Price",
  "Amount",
  "Payment",
  "Action",
];

type Props = {
  onEdit: (selectedId: number) => void;
};

const useBuysList = () => {
  const vendorsList = useQuery<{ data: Vendor[] }>({
    queryKey: ["vendors:all"],
    queryFn: vendors.fetchAll,
  });

  const buyersList = useMemo(() => {
    if (!vendorsList.data?.data) return [];
    return vendorsList.data.data
      .filter((v) => v.vendor_type === "buyer")
      .map((v) => ({ id: v.id, name: v.name }));
  }, [vendorsList.data]);

  return buyersList;
};

const useGetSeasonNameList = () => {
  const [state, setState] = useState<SeasonName[]>([]);

  useEffect(() => {
    seasons
      .getNames()
      .then((data) => setState(data))
      .catch((err) => {
        console.log(err);
        setState([]);
      });
  }, []);

  return { data: state };
};

type GenericFilter = Record<string, string>;

const serialize = (argument: GenericFilter): GenericFilter => {
  return Object.entries(argument).reduce<GenericFilter>((acc, curr) => {
    const [k, v] = curr;
    if (v !== "") {
      acc[k] = v;
    }
    return acc;
  }, {});
};

const useGetBatchNameList = () => {
  const [state, setState] = useState<SeasonName[]>([]);

  useEffect(() => {
    batches
      .getNames()
      .then((data) => setState(data))
      .catch((err) => {
        console.log(err);
        setState([]);
      });
  }, []);

  return { data: state };
};

export type PaginatedResponse<T> = {
  page: number;
  limit: number;
  total: number;
  data: T[];
};

export type LoadingStatus = "idle" | "loading" | "success" | "failed";

const defaultState = {
  data: [],
  limit: 0,
  page: 1,
  total: 0,
};

const useGetPaginatedData = () => {
  const [status, setStatus] = useState<LoadingStatus>("idle");
  const [pagindatedData, setPaginatedData] =
    useState<PaginatedResponse<Sale>>(defaultState);
  const [error, setError] = useState(null);

  const handleFetch = async (filter?: GenericFilter) => {
    setStatus("loading");
    const res = await sales.fetchAll(filter);
    const { status, data, error } = res;
    if (status === "success") {
      setPaginatedData(data ? data : defaultState);
      setStatus("success");
    } else {
      setStatus("failed");
      setError(error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return { pagindatedData, status, handleFetch, error };
};

const SalesTable = ({ onEdit }: Props) => {
  const { pagindatedData, status, handleFetch } = useGetPaginatedData();

  const isEmpty = useMemo(() => {
    if (status === "success") {
      return pagindatedData.data.length === 0;
    }
    return false;
  }, [pagindatedData.data, status]);

  const seasonList = useGetSeasonNameList();
  const batchList = useGetBatchNameList();

  type SaleFilter = {
    season_id: string;
    batch_id: string;
    buyer_name: string;
    start_date: string;
    end_date: string;
  };

  const defaultValues: SaleFilter = {
    batch_id: "",
    season_id: "",
    buyer_name: "",
    start_date: "",
    end_date: "",
  };

  const methods = useForm<SaleFilter>({
    defaultValues: defaultValues,
  });

  const {
    setValue,
    watch,
    formState: { errors },
    register,
    handleSubmit,
  } = methods;

  const onFilter = handleSubmit(async (data) => {
    handleFetch(serialize(data));
  });

  return (
    <>
      <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
          <SelectList
            label="Season"
            name="season_id"
            options={seasonList.data}
            value={watch("season_id")}
            onChange={(k, v) => {
              setValue(k, v);
            }}
          />

          <SelectList
            label="Batch"
            name="batch_id"
            options={batchList.data}
            value={watch("batch_id")}
            onChange={(k, v) => {
              setValue(k, v);
            }}
          />
          <TextField
            label="buyer name"
            size="small"
            {...register("buyer_name")}
          />

          <DatePicker
            label="From Date"
            value={watch("start_date") ? dayjs(watch("start_date")) : null}
            format="DD-MM-YYYY"
            onChange={(v) => {
              methods.setValue("start_date", v ? dayjs(v).toISOString() : "");
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small",
                error: Boolean(errors.start_date),
                helperText: errors.start_date?.message,
              },
            }}
          />
          <DatePicker
            label="To Date"
            value={watch("end_date") ? dayjs(watch("end_date")) : null}
            format="DD-MM-YYYY"
            onChange={(v) => {
              methods.setValue("end_date", v ? dayjs(v).toISOString() : "");
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small",
                error: Boolean(errors.end_date),
                helperText: errors.end_date?.message,
              },
            }}
          />

          <Button size="small" variant="contained" onClick={onFilter}>
            search
          </Button>
        </div>
      </div>

      <Ternary
        when={status === "loading"}
        then={<DataLoading />}
        otherwise={
          <>
            <Table>
              <TableRow>
                {headers.map((header) => (
                  <TableHeaderCell key={header} content={header} />
                ))}
              </TableRow>
              {pagindatedData.data.map((sale, i) => (
                <TableRow key={sale.id}>
                  <TableCell content={i + 1} />
                  <TableCell content={dayjs(sale.date).format("DD-MM-YYYY")} />
                  <TableCell content={sale.season?.name} />
                  <TableCell content={sale.batch?.name} />
                  <TableCell content={sale.buyer?.name} />
                  <TableCell content={sale.vehicle_no || "-"} />
                  <TableCell content={sale.weight} />
                  <TableCell content={sale.bird_no} />
                  <TableCell content={sale.avg_weight} />
                  <TableCell content={`${sale.price}`} />
                  <TableCell content={`${sale.amount}`} />
                  <TableCell
                    content={
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          sale.payment_type === "cash"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {sale.payment_type.toUpperCase()}
                      </span>
                    }
                  />
                  <TableCell
                    content={
                      <EditIcon
                        className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer"
                        onClick={() => {
                          onEdit(sale.id);
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
                  title="No sales found"
                  description="Get started by creating a new sale"
                />
              }
            />
          </>
        }
      />
    </>
  );
};

export default SalesTable;
