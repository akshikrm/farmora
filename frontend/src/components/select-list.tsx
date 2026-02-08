import type { NameResponse } from "@app-types/gen.types";
import { Autocomplete, TextField } from "@mui/material";
import { useMemo } from "react";

type Props = {
  options?: NameResponse[];
  name: string;
  label: string;
  value?: number | null | "";
  onChange: (name: string, v: number | null) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
};

const SelectList = (props: Props) => {
  const {
    options = [],
    name,
    label,
    value,
    onChange,
    error,
    helperText,
    disabled,
  } = props;

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
        onChange(name, v ? v.id : null);
      }}
      disabled={disabled}
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
