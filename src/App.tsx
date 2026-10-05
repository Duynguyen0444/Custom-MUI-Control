import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useState } from "react";
import { AppointmentDialog } from "./features/Appointment/AppointmentDialog";
import type { AppointmentValues } from "./schema/AppointmentField";

async function fakeSubmit(values: AppointmentValues) {
  await new Promise((r) => setTimeout(r, 1000));
  console.log(values);
}

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        Create appointment
      </Button>
      <AppointmentDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={async (values) => {
          await fakeSubmit(values);
          setOpen(false);
        }}
      />
    </Container>
  );
}
