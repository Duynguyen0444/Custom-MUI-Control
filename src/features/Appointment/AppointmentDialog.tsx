import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useId, useState } from "react";
import type { AppointmentValues } from "../../schema/AppointmentField";
import { AppointmentForm } from "./AppointmentForm";

const FORM_ID = "appointment-form";

type AppointmentDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: AppointmentValues) => Promise<void>;
};

export function AppointmentDialog({
  open,
  onClose,
  onSubmit,
}: AppointmentDialogProps) {
  const titleId = useId();
  // Tracks only the async save (runs after validation passed), so Save shows a spinner exactly while saving
  const [saving, setSaving] = useState(false);

  const handleClose = () => {
    if (!saving) onClose();
  };

  const handleSubmit = async (values: AppointmentValues) => {
    setSaving(true);
    try {
      await onSubmit(values);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
      aria-labelledby={titleId}
    >
      <DialogTitle component="div" sx={{ px: 3, pt: 3, pb: 2 }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography
            id={titleId}
            variant="h5"
            component="h2"
            sx={{ fontWeight: "fontWeightBold" }}
          >
            Add Appointment
          </Typography>
          <IconButton
            aria-label="Close"
            edge="end"
            onClick={handleClose}
            disabled={saving}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      {/* Dialog unmounts its children after closing, so the form remounts with default values on every open */}
      <DialogContent sx={{ px: 3, pb: 3 }}>
        <AppointmentForm formId={FORM_ID} onSubmit={handleSubmit} />
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button variant="outlined" onClick={handleClose} disabled={saving}>
          Cancel
        </Button>
        <Button
          type="submit"
          form={FORM_ID}
          variant="contained"
          startIcon={<CheckIcon />}
          loading={saving}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
