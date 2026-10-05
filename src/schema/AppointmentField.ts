import { z } from 'zod';
import { FIELD_KIND } from '../constants/fieldKind';
import { useWorkerOptions } from '../queries/useWorkerOptions';
import type { FormSection } from '../types';
import { isValidDateValue } from '../utils/date';
import { TIME_OPTIONS } from '../utils/timeOptions';
import {
  claimInfoDefaultValues,
  claimInfoFields,
  claimInfoSchemaShape,
  claimPriorityOptions,
  optionSchema,
  REQUIRED_MESSAGE,
} from './ClaimField';

const timeRangeShape = {
  startTime: z.string().min(1, REQUIRED_MESSAGE),
  endTime: z.string().min(1, REQUIRED_MESSAGE),
};
const timeRangeSchema = z.object(timeRangeShape);

export const appointmentSchema = z
  .object({
    ...claimInfoSchemaShape,
    appointmentType: z.string().min(1, REQUIRED_MESSAGE),
    fieldWorker: optionSchema.nullable().refine((v) => v !== null, REQUIRED_MESSAGE),
    /** 'YYYY-MM-DD'; FormDatePicker stores INVALID_DATE_VALUE for incomplete or impossible input */
    date: z.string().min(1, REQUIRED_MESSAGE).refine(isValidDateValue, 'Invalid date'),
    ...timeRangeShape,
    /** Hours; empty or a non-negative number (e.g. '1', '0.5') */
    bufferTime: z
      .string()
      .regex(/^(\d+(\.\d+)?)?$/, 'Enter a valid number of hours')
      .optional(),
    addressLine1: z.string().min(1, REQUIRED_MESSAGE),
    addressLine2: z.string().optional(),
    claimPriority: z.string().min(1, REQUIRED_MESSAGE),
    notes: z.string().optional(),
  })
  // 'HH:mm' (24h, zero padded) compares correctly as a string
  .refine((v) => v.endTime > v.startTime, {
    path: ['endTime'],
    message: 'End time must be after start time',
    // Zod 4 skips object refinements when other fields have issues; run it as soon as the time range itself is valid
    when: (payload) => timeRangeSchema.safeParse(payload.value).success,
  });

/** Values while editing (fieldWorker may still be null) */
export type AppointmentFormValues = z.input<typeof appointmentSchema>;
/** Values after successful validation (fieldWorker is an Option) */
export type AppointmentValues = z.output<typeof appointmentSchema>;

export const appointmentTypeOptions = [
  { label: 'Casualty', value: 'casualty' },
  { label: 'Inspection', value: 'inspection' },
  { label: 'Repair', value: 'repair' },
];

export const appointmentSections: FormSection<AppointmentFormValues>[] = [
  { title: 'Claim information', fields: claimInfoFields },
  {
    title: 'Appointment information',
    fields: [
      {
        kind: FIELD_KIND.Select,
        name: 'appointmentType',
        label: 'Appointment type',
        placeholder: 'Select Appointment Type',
        required: true, 
        options: appointmentTypeOptions,
      },
      {
        kind: FIELD_KIND.RemoteAutocomplete,
        name: 'fieldWorker',
        label: 'Field worker',
        placeholder: 'Search worker',
        required: true,
        multiple: false,
        useOptions: useWorkerOptions,
      },
      { kind: FIELD_KIND.Date, name: 'date', label: 'Date', required: true, size: { xs: 12, md: 6 } },
      {
        kind: FIELD_KIND.Group,
        key: 'time',
        size: { xs: 12, md: 6 },
        fields: [
          { kind: FIELD_KIND.Select, name: 'startTime', label: 'Start time', required: true, options: TIME_OPTIONS, size: { xs: 6, sm: 4.5 } },
          { kind: FIELD_KIND.Select, name: 'endTime', label: 'End time', required: true, options: TIME_OPTIONS, size: { xs: 6, sm: 4.5 } },
          { kind: FIELD_KIND.Text, name: 'bufferTime', label: 'Buffer time', type: 'number', suffix: 'Hours', size: { xs: 6, sm: 3 } },
        ],
      },
      { kind: FIELD_KIND.Text, name: 'addressLine1', label: 'Address line 1', placeholder: 'Enter Address Line 1', required: true, size: { xs: 12, md: 6 } },
      { kind: FIELD_KIND.Text, name: 'addressLine2', label: 'Address line 2', placeholder: 'Enter Address Line 2', size: { xs: 12, md: 6 } },
      {
        kind: FIELD_KIND.Radio,
        name: 'claimPriority',
        label: 'Claim priority',
        required: true,
        options: claimPriorityOptions,
        size: 12,
      },
      { kind: FIELD_KIND.Textarea, name: 'notes', label: 'Notes', placeholder: 'Enter notes', size: 12, rows: 4 },
    ],
  },
];

export const appointmentDefaultValues: AppointmentFormValues = {
  ...claimInfoDefaultValues,
  appointmentType: '',
  fieldWorker: null,
  date: '',
  startTime: '07:00',
  endTime: '07:15',
  bufferTime: '',
  addressLine1: '',
  addressLine2: '',
  claimPriority: '',
  notes: '',
};
