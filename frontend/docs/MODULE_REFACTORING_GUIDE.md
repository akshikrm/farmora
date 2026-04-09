# Frontend Module Refactoring Guide

This guide explains how to convert a frontend module to the standard code structure and directory pattern.

## Target Directory Structure

```
pages/{module-name}/
├── index.tsx              # Page component
├── types.ts               # All type definitions
├── api.ts                 # API methods
├── hooks/                 # Custom React hooks
│   ├── use-get-{module}.ts
│   ├── use-add-{module}.ts
│   ├── use-get-{module}-by-id.ts
│   └── use-edit-{module}.ts
└── components/
    ├── add.tsx
    ├── edit.tsx
    ├── form.tsx
    ├── filter.tsx          # Optional (if module needs filtering)
    └── table.tsx
```

---

## Step 1: Create types.ts

**Location:** `pages/{module}/types.ts`

### Type Naming Convention

| Type | Purpose | Example |
|------|---------|---------|
| `*FormValues` | Form input values (strings) | `{ name: string, amount: string }` |
| `*Request` | API request payload | `{ name: string, amount: number }` |
| `*Record` | Database entity | `{ id: number, name: string, ... }` |
| `*ListResponse` | API list response | `{ data: *Record[], total: number }` |
| `*FilterRequest` | Filter/search params | `{ status: string, date: string }` |

### Template

```typescript
import type { ListResponse } from "@app-types/response.types";

// Record type (database entity)
export type {Module}Record = {
  id: number;
  name: string;
};

// Form values (form inputs - strings)
export type {Module}FormValues = {
  name: string;
  amount: string;
};

// API request payload
export type New{Module}Request = {
  name: string;
  amount: number | string;
};

// Edit request (partial + id)
export type Edit{Module}Request = Partial<New{Module}Request> & {
  id: number;
};

// List response
export type {Module}ListResponse = ListResponse<{Module}Record>;

// Filter request
export type {Module}FilterRequest = {
  status: string | null;
};
```

---

## Step 2: Create api.ts

**Location:** `pages/{module}/api.ts`

### Template

```typescript
import type {
  {Module}FormValues,
  {Module}ListResponse,
  New{Module}Request,
} from "./types";
import fetcherV2 from "@utils/fetcherV2";

const {module} = {
  fetchAll: (filter?: { key: string }) => {
    const opts = {
      method: "GET" as const,
      filter: filter,
    };
    return fetcherV2<{Module}ListResponse>("{endpoint}", null, opts);
  },
  
  fetchById: (id: number) => {
    return fetcherV2<{Module}FormValues>(`{endpoint}/${id}`);
  },
  
  create: async (payload: New{Module}Request) => {
    return await fetcherV2("{endpoint}", JSON.stringify(payload), {
      method: "POST",
    });
  },
  
  updateById: async (id: number, updatedData: New{Module}Request) => {
    const payload = { /* map fields */ };
    return await fetcherV2(`{endpoint}/${id}`, JSON.stringify(payload), {
      method: "PUT",
    });
  },
};

export default {module};
```

### Key Points
- Use `fetcherV2` (not `fetcher`)
- Always use `JSON.stringify()` for payload
- Include `method: "POST"` or `method: "PUT"`
- Use `as const` for method type

---

## Step 3: Create Hooks

### 3.1 use-get-{module}.ts

```typescript
import { useCallback, useRef, useState } from "react";
import type { {Module}ListResponse, {Module}FilterRequest } from "../types";
import {module} from "../api";

const defaultValues: {Module}FilterRequest = { /* defaults */ };

const useGet{Module} = () => {
  const currentFilter = useRef<{Module}FilterRequest>(defaultValues);
  const [{module}List, set{Module}List] = useState<{Module}ListResponse>({
    data: [], total: 0, limit: 0, page: 0,
  });

  const handleFetchAll{Module} = useCallback(
    async (filter?: {Module}FilterRequest) => {
      currentFilter.current = filter ? filter : currentFilter.current;
      const res = await {module}.fetchAll(filter ? filter : currentFilter.current);
      if (res.status === "success" && res.data) {
        set{Module}List(res.data);
      }
    }, []
  );

  return { {module}List, handleFetchAll{Module} };
};

export default useGet{Module};
```

### 3.2 use-add-{module}.ts

```typescript
import { useState } from "react";
import type { {Module}FormValues } from "../types";
import type { ValidationError } from "@errors/api.error";
import {module} from "../api";

const useAdd{Module} = (onSuccess: () => void) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const clearErrors = () => setErrors([]);

  const onSubmit = async (inputData: {Module}FormValues) => {
    const res = await {module}.create(inputData);
    if (res.status === "success") {
      onSuccess();
      clearErrors();
    } else if (res.status === "validation_error") {
      setErrors(res.error);
    }
  };

  return { errors, onSubmit, clearErrors };
};

export default useAdd{Module};
```

### 3.3 use-get-{module}-by-id.ts

```typescript
import type { {Module}FormValues } from "../types";
import {module} from "../api";
import { useEffect, useState } from "react";

const defaultValues: {Module}FormValues = { /* empty defaults */ };

const useGet{Module}ById = (selectedId: number | null) => {
  const [selectedData, setSelectedData] = useState<{Module}FormValues>(defaultValues);

  useEffect(() => {
    const fetch{Module}ById = async (id: number) => {
      const res = await {module}.fetchById(id);
      if (res.status === "success" && res.data) {
        setSelectedData({ /* map response */ });
      }
    };
    if (selectedId) {
      fetch{Module}ById(selectedId);
    } else {
      setSelectedData(defaultValues);
    }
  }, [selectedId]);

  return { selectedData };
};

export default useGet{Module}ById;
```

### 3.4 use-edit-{module}.ts

```typescript
import { useState } from "react";
import type { {Module}FormValues } from "../types";
import type { ValidationError } from "@errors/api.error";
import {module} from "../api";

const useEdit{Module} = (selectedId: number | null, onSuccess: () => void) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const clearErrors = () => setErrors([]);

  const onSubmit = async (inputData: {Module}FormValues) => {
    if (!selectedId) return;
    const res = await {module}.updateById(selectedId, inputData);
    if (res.status === "success") {
      onSuccess();
      clearErrors();
    } else if (res.status === "validation_error") {
      setErrors(res.error);
    }
  };

  return { errors, onSubmit, clearErrors };
};

export default useEdit{Module};
```

---

## Step 4: Create Components

### 4.1 form.tsx

```typescript
import { DatePicker } from "@mui/x-date-pickers";
import type { {Module}FormValues } from "../types";
import SelectList from "@components/select-list";
import useGetNames from "@hooks/{module}/use-get-names";
import { Button, MenuItem } from "@mui/material";
import { useForm, type DefaultValues } from "react-hook-form";
import { useEffect } from "react";
import { RHFTextField } from "@components/form/input";
import type { ValidationError } from "@errors/api.error";

type Props = {
  defaultValues: DefaultValues<{Module}FormValues>;
  onSubmit: (payload: {Module}FormValues) => void;
  apiErrors: ValidationError[];
};

const {Module}Form = ({ onSubmit, defaultValues, apiErrors }: Props) => {
  const methods = useForm<{Module}FormValues>({ defaultValues });
  const { handleSubmit, control, setError, setValue, reset, watch } = methods;

  useEffect(() => { reset(defaultValues); }, [defaultValues, reset]);
  useEffect(() => {
    if (apiErrors.length > 0) {
      for (const error of apiErrors) {
        setError(error.name as keyof {Module}FormValues, { message: error.message });
      }
    }
  }, [apiErrors, setError]);

  return (
    <form {...methods} onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-4">
        <RHFTextField label="Name" name="name" control={control} fullWidth size="small" />
        <SelectList options={names.data} value={watch("field")} onChange={(v) => setValue("field", v)} />
      </div>
      <div className="flex justify-end mt-6">
        <Button variant="contained" type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default {Module}Form;
```

### 4.2 add.tsx

```typescript
import { Dialog, DialogContent } from "@components/dialog";
import type { {Module}FormValues } from "../types";
import {Module}Form from "./form";
import useAdd{Module} from "../hooks/use-add-{module}";
import dayjs from "dayjs";

const defaultValues: {Module}FormValues = { /* defaults */ };

type Props = {
  isShow: boolean;
  onClose: () => void;
  refetch: () => void;
};

const Add{Module} = ({ isShow, onClose, refetch }: Props) => {
  const { errors, onSubmit, clearErrors } = useAdd{Module}(() => {
    onClose();
    refetch();
  });

  const handleClose = () => { onClose(); clearErrors(); };

  return (
    <Dialog isOpen={isShow} headerTitle="Add {Module}" onClose={handleClose}>
      <DialogContent>
        <{Module}Form onSubmit={onSubmit} defaultValues={defaultValues} apiErrors={errors} />
      </DialogContent>
    </Dialog>
  );
};

export default Add{Module};
```

### 4.3 edit.tsx

```typescript
import { Dialog, DialogContent } from "@components/dialog";
import {Module}Form from "./form";
import useGet{Module}ById from "../hooks/use-get-{module}-by-id";
import useEdit{Module} from "../hooks/use-edit-{module}";

type Props = {
  selectedId: number | null;
  onClose: () => void;
  refetch: () => void;
};

const Edit{Module} = ({ selectedId, onClose, refetch }: Props) => {
  const isShow = selectedId !== null;
  const { selectedData } = useGet{Module}ById(selectedId);
  const { clearErrors, errors, onSubmit } = useEdit{Module}(selectedId, () => {
    onClose();
    refetch();
  });

  const handleClose = () => { onClose(); clearErrors(); };

  return (
    <Dialog isOpen={isShow} headerTitle="Edit {Module}" onClose={handleClose}>
      <DialogContent>
        <{Module}Form onSubmit={onSubmit} defaultValues={selectedData} apiErrors={errors} />
      </DialogContent>
    </Dialog>
  );
};

export default Edit{Module};
```

### 4.4 table.tsx

```typescript
import type { {Module}ListResponse } from "../types";
import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import { EditIcon } from "lucide-react";
import { useMemo } from "react";
import DataNotFound from "@components/data-not-found";
import Ternary from "@components/ternary";
import Card from "@mui/material/Card";

type Props = {
  data: {Module}ListResponse;
  onEdit: (selectedId: number) => void;
};

const {Module}Table = ({ data, onEdit }: Props) => {
  const items = data?.data || [];
  const isEmpty = useMemo(() => items.length === 0, [items]);

  return (
    <Card>
      <Table>
        <TableRow>
          {["Column 1", "Column 2", "Action"].map((h) => (
            <TableHeaderCell key={h} content={h} />
          ))}
        </TableRow>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell content={item.field} />
            <TableCell content={<EditIcon onClick={() => onEdit(item.id)} />} />
          </TableRow>
        ))}
      </Table>
      <Ternary when={isEmpty} then={<DataNotFound title="No records found" />} />
    </Card>
  );
};

export default {Module}Table;
```

---

## Step 5: Update index.tsx

```typescript
import PageTitle from "@components/PageTitle";
import {Module}Table from "./components/table";
import Add{Module} from "./components/add";
import Edit{Module} from "./components/edit";
import Filter{Module} from "./components/filter";
import { Button } from "@mui/material";
import { useState } from "react";
import useGet{Module} from "./hooks/use-get-{module}";
import type { {Module}FilterRequest } from "./types";

const {Module}Page = () => {
  const [isOpen, setOpenAdd] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { {module}List, handleFetchAll{Module} } = useGet{Module}();

  const onFilter = async (inputData: {Module}FilterRequest) => {
    await handleFetchAll{Module}(inputData);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <PageTitle title="{Module}" />
        <Button variant="contained" onClick={() => setOpenAdd(true)}>Add {Module}</Button>
      </div>
      <Filter{Module} onFilter={onFilter} />
      <{Module}Table data={{module}List} onEdit={(id) => setSelectedId(id)} />
      <Add{Module} isShow={isOpen} onClose={() => setOpenAdd(false)} refetch={handleFetchAll{Module}} />
      <Edit{Module} selectedId={selectedId} onClose={() => setSelectedId(null)} refetch={handleFetchAll{Module}} />
    </>
  );
};

export default {Module}Page;
```

---

## Common Patterns Summary

| Pattern | Implementation |
|---------|----------------|
| API calls | Use `fetcherV2` from `@utils/fetcherV2` |
| Form fields | Use `RHFTextField` with `control` prop |
| Dropdowns | Use `SelectList` component |
| Error handling | Use `useEffect` to set errors from `apiErrors` prop |
| Form reset | Use `useEffect` to call `reset(defaultValues)` |
| State management | Use hooks for data fetching |
| Refetch after save | Pass `refetch` callback to dialogs |
| Edit mode | Use `useGet{Module}ById` to fetch data |

## Before vs After

| Before (Old) | After (Standard) |
|--------------|------------------|
| `TextField {...register("field")}` | `<RHFTextField name="field" control={control} />` |
| `useAddForm({ mutationFn, mutationKey })` | `useAdd{Module}(onSuccess)` |
| Internal `useState` for data | Hook returns data + refetch function |
| `filterButtonRef` for refresh | `refetch` callback prop |

## Checklist

- [ ] Create `types.ts` with all type definitions
- [ ] Create `api.ts` with fetcherV2
- [ ] Create 4 hooks (get, add, get-by-id, edit)
- [ ] Update `form.tsx` to use RHFTextField
- [ ] Update `add.tsx` to use hook + refetch
- [ ] Create `edit.tsx`
- [ ] Update `table.tsx` to receive data prop
- [ ] Update `index.tsx` to use hooks
- [ ] Run lint to verify changes

## Reference Implementation

See the `integration-book` module for a complete reference implementation following this guide.
