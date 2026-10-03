import { z } from 'zod';
import { FIELD_KIND } from '../constants/fieldKind';
import type { FieldConfig } from '../types';
import { useWorkerOptions } from '../queries/useWorkerOptions';

const required = 'This field is required';

export const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const claimSchema = z.object({
  claimReference: z.string().min(1, required),
  customerName: z.string().min(1, required),
  customerPhone: z.string().min(1, required),
  customerEmail: z.string().min(1, required).email('Invalid email address'),
  insuranceCompany: z.string().min(1, required),
  fieldWorkers: z.array(optionSchema).min(1, 'Please select at least one worker'),
  notes: z.string().optional(),
});

export type ClaimValues = z.infer<typeof claimSchema>;

export const claimFields: FieldConfig<ClaimValues>[] = [
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
  {
    kind: FIELD_KIND.RemoteAutocomplete,
    name: 'fieldWorkers',
    label: 'Field workers',
    placeholder: 'Search workers',
    required: true,
    useOptions: useWorkerOptions,
  },
  { kind: FIELD_KIND.Textarea, name: 'notes', label: 'Notes', placeholder: 'Enter notes', size: 12, rows: 4 },
];

export const claimDefaultValues: ClaimValues = {
  claimReference: '',
  customerName: '',
  customerPhone: '',
  customerEmail: '',
  insuranceCompany: '',
  fieldWorkers: [],
  notes: '',
};
