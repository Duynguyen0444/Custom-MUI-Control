import Grid from "@mui/material/Grid";
import type { Control, FieldValues } from "react-hook-form";
import { FIELD_KIND } from "../constants/fieldKind";
import { FormRemoteAutocomplete } from "./FormRemoteAutocomplete";
import { FormSelect } from "./FormSelect";
import { FormTextField } from "./FormTextField";
import type { FieldConfig } from "../types";

type FormFieldsProps<T extends FieldValues> = {
  fields: FieldConfig<T>[];
  control: Control<T>;
};

const renderField = <T extends FieldValues>(
  field: FieldConfig<T>,
  control: Control<T>,
) => {
  switch (field.kind) {
    case FIELD_KIND.Text: {
      const { kind: _kind, size: _size, ...props } = field;
      return <FormTextField control={control} {...props} />;
    }
    case FIELD_KIND.Textarea: {
      const { kind: _kind, size: _size, rows = 3, ...props } = field;
      return (
        <FormTextField control={control} {...props} multiline rows={rows} />
      );
    }
    case FIELD_KIND.Select: {
      const { kind: _kind, size: _size, ...props } = field;
      return <FormSelect control={control} {...props} />;
    }
    case FIELD_KIND.RemoteAutocomplete: {
      const { kind: _kind, size: _size, ...props } = field;
      return <FormRemoteAutocomplete control={control} {...props} />;
    }
  }
};

export const FormFields = <T extends FieldValues>({
  fields,
  control,
}: FormFieldsProps<T>) => {
  return (
    <Grid container columnSpacing={3} rowSpacing={2.5}>
      {fields.map((field) => (
        <Grid key={field.name} size={field.size ?? { xs: 12, md: 6 }}>
          {renderField(field, control)}
        </Grid>
      ))}
    </Grid>
  );
};
