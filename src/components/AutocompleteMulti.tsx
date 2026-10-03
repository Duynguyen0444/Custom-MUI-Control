import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import type { Ref, UIEvent } from "react";
import type { Option } from "../types";

const SCROLL_THRESHOLD = 20;

const uncheckedIcon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const isOptionEqualToValue = (option: Option, value: Option) =>
  option.value === value.value;
const getOptionLabel = (option: Option) => option.label;
const getOptionKey = (option: Option) => option.value;
const passthroughFilter = (options: Option[]) => options;

export type AutocompleteMultiProps = {
  id?: string;
  value: Option[];
  options: Option[];
  onChange: (value: Option[]) => void;
  onBlur?: () => void;
  inputRef?: Ref<HTMLInputElement>;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  loading?: boolean;
  /** `false` when options are already filtered by the server */
  filterLocally?: boolean;
  /** Controlled input text (optional) */
  inputValue?: string;
  onInputChange?: (value: string) => void;
  hasMore?: boolean;
  onLoadMore?: () => void;
};

export function AutocompleteMulti({
  id,
  value,
  options,
  onChange,
  onBlur,
  inputRef,
  placeholder,
  disabled,
  error,
  loading = false,
  filterLocally = true,
  inputValue,
  onInputChange,
  hasMore = false,
  onLoadMore,
}: AutocompleteMultiProps) {
  const handleListboxScroll = (event: UIEvent<HTMLElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (
      hasMore &&
      scrollTop + clientHeight >= scrollHeight - SCROLL_THRESHOLD
    ) {
      onLoadMore?.();
    }
  };

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      fullWidth
      size="small"
      limitTags={2}
      id={id}
      value={value}
      options={options}
      disabled={disabled}
      loading={loading}
      onChange={(_event, newValue) => {
        console.log("onChange", newValue);
        return onChange(newValue);
      }}
      onBlur={onBlur}
      inputValue={inputValue}
      onInputChange={(_event, newInputValue, reason) => {
        // 'reset' fires after each selection; keep the search text so users can tick several items
        if (reason === "reset") return;
        onInputChange?.(newInputValue);
      }}
      isOptionEqualToValue={isOptionEqualToValue}
      getOptionLabel={getOptionLabel}
      getOptionKey={getOptionKey}
      filterOptions={filterLocally ? undefined : passthroughFilter}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={uncheckedIcon}
              checkedIcon={checkedIcon}
              checked={selected}
              size="small"
              sx={{ mr: 1, p: 0.5 }}
            />
            {option.label}
          </li>
        );
      }}
      slotProps={{
        listbox: { onScroll: handleListboxScroll },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          inputRef={inputRef}
          variant="outlined"
          error={error}
          placeholder={value.length === 0 ? placeholder : undefined}
          slotProps={{
            ...params.slotProps,
            input: {
              ...params.slotProps.input,
              endAdornment: (
                <>
                  {loading && <CircularProgress color="inherit" size={18} />}
                  {params.slotProps.input.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
    />
  );
}
