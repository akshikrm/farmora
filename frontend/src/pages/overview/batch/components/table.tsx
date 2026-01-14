import batchOverview from "@api/batch-overview.api";
import type { BatchOverviewFilterRequest } from "@app-types/batch-overview.types";
import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import FilterBatchOverview from "./filter";
import { useForm } from "react-hook-form";
import { useState, useMemo } from "react";
import DataNotFound from "@components/data-not-found";
import DataLoading from "@components/data-loading";
import Ternary from "@components/ternary";
import { useQuery } from "@tanstack/react-query";

// TODO: Update headers based on backend response
const headers = ["Season", "Batch", "Data 1", "Data 2", "Data 3"];

const BatchOverviewTable = () => {
  const [filter, setFilter] = useState<BatchOverviewFilterRequest>({
    season_id: null,
    batch_id: null,
  });

  const [hasFiltered, setHasFiltered] = useState(false);

  const methods = useForm<BatchOverviewFilterRequest>({
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
    name: keyof BatchOverviewFilterRequest,
    value: number | null
  ) => {
    setValue(name, value as any);
  };

  const overviewQuery = useQuery({
    queryKey: ["batch-overview", filter],
    queryFn: () => batchOverview.fetchOverview(filter),
    enabled: hasFiltered && filter.season_id !== null && filter.batch_id !== null,
  });

  const onFilter = async () => {
    if (values.season_id && values.batch_id) {
      setFilter(values);
      setHasFiltered(true);
    }
  };

  const isEmpty = useMemo(() => {
    return overviewQuery.data?.data.length === 0;
  }, [overviewQuery.data]);

  const isFirstLoading = useMemo(() => {
    return overviewQuery.isLoading || (isEmpty && !overviewQuery.isFetched);
  }, [overviewQuery.isLoading, isEmpty, overviewQuery.isFetched]);

  return (
    <>
      <FilterBatchOverview
        register={register}
        errors={errors}
        values={values}
        onChange={onChange}
        onFilter={onFilter}
      />
      {!hasFiltered ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-lg">
            Please select a season and batch, then click "Apply Filters" to view
            overview
          </p>
        </div>
      ) : (
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
                {/* TODO: Update table rows based on backend response */}
                {overviewQuery.data?.data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell content={item.season_name} />
                    <TableCell content={item.batch_name} />
                    <TableCell content="-" />
                    <TableCell content="-" />
                    <TableCell content="-" />
                  </TableRow>
                ))}
              </Table>
              <Ternary
                when={isEmpty}
                then={
                  <DataNotFound
                    title="No data found"
                    description="No overview data found for the selected season and batch"
                  />
                }
              />
            </>
          }
        />
      )}
    </>
  );
};

export default BatchOverviewTable;
