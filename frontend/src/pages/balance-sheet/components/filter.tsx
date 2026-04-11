import { Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { type Dayjs } from "dayjs";
import { useState, useEffect } from "react";
import type { BalanceSheetFilterRequest } from "../types";

type Props = {
  onFilter: (filter: BalanceSheetFilterRequest) => void;
};

const BalanceSheetFilter = (props: Props) => {
  const now = dayjs()
  const startOfMonth = now.startOf("month")
  const endOfMonth = now.endOf("month")

  const [fromDate, setFromDate] = useState<Dayjs>(startOfMonth);
  const [toDate, setToDate] = useState<Dayjs>(endOfMonth);

  useEffect(() => {
    props.onFilter({
      from_date: startOfMonth.format("YYYY-MM-DD"),
      to_date: endOfMonth.format("YYYY-MM-DD"),
    })
  }, [])

  const handleApply = () => {
    const filter: BalanceSheetFilterRequest = {};

    if (fromDate) {
      filter.from_date = fromDate.format("YYYY-MM-DD");
    }
    if (toDate) {
      filter.to_date = toDate.format("YYYY-MM-DD");
    }

    props.onFilter(filter);
  };

  const handleReset = () => {
    setFromDate(startOfMonth);
    setToDate(endOfMonth);
    props.onFilter({
      from_date: startOfMonth.format("YYYY-MM-DD"),
      to_date: endOfMonth.format("YYYY-MM-DD"),
    });
  };

  return (
    <div className="flex items-center gap-4 bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="From Date"
          value={fromDate}
          onChange={(value) => setFromDate(value)}
          slotProps={{ textField: { size: "small" } }}
        />
        <DatePicker
          label="To Date"
          value={toDate}
          onChange={(value) => setToDate(value)}
          slotProps={{ textField: { size: "small" } }}
        />
      </LocalizationProvider>
      <Button variant="contained" onClick={handleApply}>
        Apply Filter
      </Button>
      <Button variant="outlined" onClick={handleReset}>
        Reset
      </Button>
    </div>
  );
};

export default BalanceSheetFilter;
