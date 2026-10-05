import { useId, useState } from "react";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { FieldWrapper } from "../components/FieldWrapper";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import {
  AppAutocomplete,
  type AutocompleteValue,
} from "../components/AppAutocomplete";
import type { UseRemoteOptions } from "../types";

type FormRemoteAutocompleteProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  /** Field value is `Option[]` when `true` (default), `Option | null` when `false` */
  multiple?: boolean;
  useOptions: UseRemoteOptions;
};

export function FormRemoteAutocomplete<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  required,
  disabled,
  multiple = true,
  useOptions,
}: FormRemoteAutocompleteProps<T>) {
  const {
    field: { ref, value, onChange, onBlur, disabled: fieldDisabled },
    fieldState,
  } = useController({ name, control, disabled });
  const inputId = useId();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search);
  const { options, loading, hasMore, loadMore } = useOptions(debouncedSearch);

  const emptyValue: AutocompleteValue<boolean> = multiple ? [] : null;

  return (
    <FieldWrapper
      label={label}
      htmlFor={inputId}
      required={required}
      disabled={fieldDisabled}
      errorMessage={fieldState.error?.message}
    >
      <AppAutocomplete
        multiple={multiple}
        id={inputId}
        value={(value as AutocompleteValue<boolean> | undefined) ?? emptyValue}
        options={options}
        onChange={onChange}
        onBlur={onBlur}
        inputRef={ref}
        placeholder={placeholder}
        disabled={fieldDisabled}
        error={!!fieldState.error}
        loading={loading}
        filterLocally={false}
        inputValue={search}
        onInputChange={setSearch}
        hasMore={hasMore}
        onLoadMore={loadMore}
      />
    </FieldWrapper>
  );
}
