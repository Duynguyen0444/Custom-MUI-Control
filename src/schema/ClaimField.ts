import { z } from 'zod';
import { FIELD_KIND } from '../constants/fieldKind';
import type { FieldConfig } from '../types';
// import { useWorkerOptions } from '../queries/useWorkerOptions';

export const REQUIRED_MESSAGE = 'This field is required';

export const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
});

/** Claim information shared by every form that references a claim (claim, appointment, ...) */
export const claimInfoSchemaShape = {
  claimReference: z.string().min(1, REQUIRED_MESSAGE),
  customerName: z.string().min(1, REQUIRED_MESSAGE),
  customerPhone: z.string().min(1, REQUIRED_MESSAGE),
  customerEmail: z.string().min(1, REQUIRED_MESSAGE).email('Invalid email address'),
  insuranceCompany: z.string().min(1, REQUIRED_MESSAGE),
};

export const claimInfoSchema = z.object(claimInfoSchemaShape);

export type ClaimInfoValues = z.infer<typeof claimInfoSchema>;

export const claimInfoFields: FieldConfig<ClaimInfoValues>[] = [
  { kind: FIELD_KIND.Text, name: 'claimReference', label: 'Claim reference', placeholder: 'Enter Claim Reference', required: true },
  { kind: FIELD_KIND.Text, name: 'customerName', label: 'Customer name', placeholder: 'Enter Customer Name', required: true },
  { kind: FIELD_KIND.Text, name: 'customerPhone', label: 'Customer phone number', placeholder: 'Enter Phone Number', type: 'tel', required: true },
  { kind: FIELD_KIND.Text, name: 'customerEmail', label: 'Customer email address', placeholder: 'Enter Customer Email Address', type: 'email', required: true, clearable: true },
  {
    kind: FIELD_KIND.Select,
    name: 'insuranceCompany',
    label: 'Insurance company name',
    placeholder: 'Select Insurance Company',
    required: true,
    options: [
      { label: 'Aviva', value: 'aviva' },
      { label: 'AXA', value: 'axa' },
      { label: 'Direct Line', value: 'direct-line' },
    ],
  },
];

export const claimInfoDefaultValues: ClaimInfoValues = {
  claimReference: '',
  customerName: '',
  customerPhone: '',
  customerEmail: '',
  insuranceCompany: '',
};

export const claimPriorityOptions = [
  { label: 'Low', value: 'low' },
  { label: 'Normal', value: 'normal' },
  { label: 'High', value: 'high' },
];

export const claimSchema = z.object({
  ...claimInfoSchemaShape,
  claimPriority: z.string().min(1, REQUIRED_MESSAGE),
  fieldWorkers: z.array(optionSchema).min(1, 'Please select at least one worker'),
  notes: z.string().optional(),
});

export type ClaimValues = z.infer<typeof claimSchema>;

// export const claimFields: FieldConfig<ClaimValues>[] = [
//   ...claimInfoFields,
//   {
//     kind: FIELD_KIND.RemoteAutocomplete,
//     name: 'fieldWorkers',
//     label: 'Field workers',
//     placeholder: 'Search workers',
//     required: true,
//     useOptions: useWorkerOptions,
//   },
//   {
//     kind: FIELD_KIND.Radio,
//     name: 'claimPriority',
//     label: 'Claim priority',
//     required: true,
//     options: claimPriorityOptions,
//   },
//   { kind: FIELD_KIND.Textarea, name: 'notes', label: 'Notes', placeholder: 'Enter notes', size: 12, rows: 4 },
// ];

export const claimDefaultValues: ClaimValues = {
  ...claimInfoDefaultValues,
  claimPriority: '',
  fieldWorkers: [],
  notes: '',
};
