import type { NameResponse } from "@app-types/gen.types";
import { Autocomplete, TextField } from "@mui/material";
import { useMemo } from "react";

const SelectList = ({
  options = [],
  name,
  label,
  value,
  onChange,
  error,
  helperText,
}: {
  options?: NameResponse[];
  name: string;
  label: string;
  value?: number | null;
  onChange: (name: string, v: number) => void;
  error?: boolean;
  helperText?: string;
}) => {
  const selected = useMemo(() => {
    if (value) {
      return options.find(({ id }) => {
        return id === value;
      });
    }
    return null;
  }, [value, options]);

  return (
    <Autocomplete
      options={options}
      value={selected}
      getOptionLabel={(v) => v.name}
      onChange={(_, v) => {
        if (v) {
          onChange(name, v.id);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          name={name}
          error={error}
          helperText={helperText}
          size="small"
        />
      )}
    />
  );
};

export default SelectList;
