import { useId, useState } from "react";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { FieldWrapper } from "../components/FieldWrapper";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { AutocompleteMulti } from "../components/AutocompleteMulti";
import type { Option, UseRemoteOptions } from "../types";

type FormRemoteAutocompleteProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  useOptions: UseRemoteOptions;
};

export function FormRemoteAutocomplete<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  required,
  disabled,
  useOptions,
}: FormRemoteAutocompleteProps<T>) {
  const { field, fieldState } = useController({ name, control, disabled });
  const inputId = useId();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search);
  const { options, loading, hasMore, loadMore } = useOptions(debouncedSearch);

  return (
    <FieldWrapper
      label={label}
      htmlFor={inputId}
      required={required}
      disabled={field.disabled}
      errorMessage={fieldState.error?.message}
    >
      <AutocompleteMulti
        id={inputId}
        value={(field.value as Option[] | undefined) ?? []}
        options={options}
        onChange={field.onChange}
        onBlur={field.onBlur}
        inputRef={field.ref}
        placeholder={placeholder}
        disabled={field.disabled}
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
