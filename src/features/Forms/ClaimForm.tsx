import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { FormFields } from "../../controls/FormField";
import {
  claimSchema,
  claimFields,
  claimDefaultValues,
  type ClaimValues,
} from "../../schema/ClaimField";

type ClaimFormProps = { onSubmit: (values: ClaimValues) => Promise<void> };

export function ClaimForm({ onSubmit }: ClaimFormProps) {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ClaimValues>({
    resolver: zodResolver(claimSchema),
    defaultValues: claimDefaultValues,
    mode: "onTouched",
  });

  const submit = async (values: ClaimValues) => {
    try {
      await onSubmit(values);
    } catch (e) {
      setError("root", {
        message: e instanceof Error ? e.message : "Submit failed",
      });
    }
  };

  return (
    <Stack
      component="form"
      noValidate
      spacing={3}
      onSubmit={handleSubmit(submit)}
    >
      {errors.root && <Alert severity="error">{errors.root.message}</Alert>}
      <FormFields fields={claimFields} control={control} />
      <Button
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{ alignSelf: "flex-start" }}
      >
        Submit
      </Button>
    </Stack>
  );
}
