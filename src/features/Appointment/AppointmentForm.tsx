import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";
import { FormSections } from "../../controls/FormField";
import {
  appointmentDefaultValues,
  appointmentSchema,
  appointmentSections,
  type AppointmentFormValues,
  type AppointmentValues,
} from "../../schema/AppointmentField";
import { useSyncEndTime } from "./useSyncEndTime";

type AppointmentFormProps = {
  /** Lets a submit button outside the form (e.g. in DialogActions) submit it via `form={formId}` */
  formId: string;
  onSubmit: (values: AppointmentValues) => Promise<void>;
};

export function AppointmentForm({ formId, onSubmit }: AppointmentFormProps) {
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    subscribe,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm<AppointmentFormValues, unknown, AppointmentValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: appointmentDefaultValues,
    mode: "onTouched",
  });

  useSyncEndTime({ subscribe, setValue, getFieldState, trigger });

  const submit = async (values: AppointmentValues) => {
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
      id={formId}
      noValidate
      spacing={3}
      onSubmit={handleSubmit(submit)}
    >
      {errors.root && <Alert severity="error">{errors.root.message}</Alert>}
      <FormSections sections={appointmentSections} control={control} />
    </Stack>
  );
}
