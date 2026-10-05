import Grid, { type GridProps } from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Control, FieldValues } from "react-hook-form";
import { FIELD_KIND } from "../constants/fieldKind";
import { FormDatePicker } from "./FormDatePicker";
import { FormRadioGroup } from "./FormRadioGroup";
import { FormRemoteAutocomplete } from "./FormRemoteAutocomplete";
import { FormSelect } from "./FormSelect";
import { FormTextField } from "./FormTextField";
import type { FieldConfig, FormSection } from "../types";

const DEFAULT_FIELD_SIZE: GridProps["size"] = { xs: 12, md: 6 };
/** Fields inside a group share the row equally unless they set their own size */
const DEFAULT_GROUP_FIELD_SIZE: GridProps["size"] = "grow";

type FormFieldsProps<T extends FieldValues> = {
  fields: FieldConfig<T>[];
  control: Control<T>;
  columnSpacing?: GridProps["columnSpacing"];
  rowSpacing?: GridProps["rowSpacing"];
  defaultSize?: GridProps["size"];
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
    case FIELD_KIND.Radio: {
      const { kind: _kind, size: _size, ...props } = field;
      return <FormRadioGroup control={control} {...props} />;
    }
    case FIELD_KIND.Date: {
      // The field shows the format (dd/mm/yyyy) as its placeholder
      const { kind: _kind, size: _size, placeholder: _placeholder, ...props } =
        field;
      return <FormDatePicker control={control} {...props} />;
    }
    case FIELD_KIND.Group:
      return (
        <FormFields
          fields={field.fields}
          control={control}
          columnSpacing={2}
          defaultSize={DEFAULT_GROUP_FIELD_SIZE}
        />
      );
  }
};

const getFieldKey = <T extends FieldValues>(field: FieldConfig<T>) =>
  field.kind === FIELD_KIND.Group ? field.key : field.name;

export const FormFields = <T extends FieldValues>({
  fields,
  control,
  columnSpacing = 3,
  rowSpacing = 2.5,
  defaultSize = DEFAULT_FIELD_SIZE,
}: FormFieldsProps<T>) => {
  return (
    <Grid container columnSpacing={columnSpacing} rowSpacing={rowSpacing}>
      {fields.map((field) => (
        <Grid key={getFieldKey(field)} size={field.size ?? defaultSize}>
          {renderField(field, control)}
        </Grid>
      ))}
    </Grid>
  );
};

type FormSectionsProps<T extends FieldValues> = {
  sections: FormSection<T>[];
  control: Control<T>;
};

export const FormSections = <T extends FieldValues>({
  sections,
  control,
}: FormSectionsProps<T>) => {
  return (
    <Stack spacing={4}>
      {sections.map((section) => (
        <Stack key={section.title} component="section" spacing={2}>
          <Typography
            variant="h6"
            component="h3"
            sx={{ fontWeight: "fontWeightBold" }}
          >
            {section.title}
          </Typography>
          <FormFields fields={section.fields} control={control} />
        </Stack>
      ))}
    </Stack>
  );
};
