import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ClaimForm } from "./features/Forms/ClaimForm";
import type { ClaimValues } from "./schema/ClaimField";

async function fakeSubmit(values: ClaimValues) {
  await new Promise((r) => setTimeout(r, 1000));
  console.log(values);
}

export default function App() {
  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Claim details
      </Typography>
      <ClaimForm
        onSubmit={async (values) => {
          await fakeSubmit(values);
          alert("Submitted!");
        }}
      />
    </Container>
  );
}
