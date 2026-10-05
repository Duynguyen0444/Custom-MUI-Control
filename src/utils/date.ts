import dayjs, { type Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

// Needed for strict parsing (`dayjs(value, format, true)`)
dayjs.extend(customParseFormat);

/** Format dates are stored in form state (and sent to the API) */
export const DATE_VALUE_FORMAT = 'YYYY-MM-DD';
/** Format the user sees and types */
export const DATE_DISPLAY_FORMAT = 'DD/MM/YYYY';
/** Stored while the typed date is incomplete or impossible (e.g. 31/02/2026) so validation can flag it */
export const INVALID_DATE_VALUE = 'invalid';

/** Strictly parses a stored 'YYYY-MM-DD' string ('2026-02-31' and 'invalid' give an invalid Dayjs) */
export const parseDateValue = (value: string): Dayjs => dayjs(value, DATE_VALUE_FORMAT, true);

export const isValidDateValue = (value: string) => parseDateValue(value).isValid();

/** Stored string -> picker value ('' -> null) */
export const fromDateValue = (value: string | null | undefined): Dayjs | null =>
	value ? parseDateValue(value) : null;

/** Picker value -> stored string (null -> '', invalid -> INVALID_DATE_VALUE) */
export const toDateValue = (date: Dayjs | null): string => {
	if (date === null) return '';
	return date.isValid() ? date.format(DATE_VALUE_FORMAT) : INVALID_DATE_VALUE;
};
