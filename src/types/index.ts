import type { GridProps } from '@mui/material/Grid';
import type { FieldValues, Path } from 'react-hook-form';
import type { AppInputProps } from '../components/TextField';
import { type FIELD_KIND } from '../constants/fieldKind';

export type Option = { label: string; value: string };

export type FieldKind = (typeof FIELD_KIND)[keyof typeof FIELD_KIND];

export type RemoteOptionsResult = {
	options: Option[];
	loading: boolean;
	hasMore: boolean;
	loadMore: () => void;
};

export type UseRemoteOptions = (search: string) => RemoteOptionsResult;

type BaseField<T extends FieldValues> = {
	name: Path<T>;
	label: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	size?: GridProps['size'];
};

/** Lays several fields out side by side inside one grid cell (e.g. start / end / buffer time). */
export type GroupField<T extends FieldValues> = {
	kind: typeof FIELD_KIND.Group;
	/** Unique React key (groups have no `name`) */
	key: string;
	size?: GridProps['size'];
	fields: FieldConfig<T>[];
};

export type FieldConfig<T extends FieldValues> =
	| (BaseField<T> & {
			kind: typeof FIELD_KIND.Text;
			type?: AppInputProps['type'];
			clearable?: boolean;
			/** Text rendered after the input, e.g. a unit such as "Hours" */
			suffix?: string;
	  })
	| (BaseField<T> & { kind: typeof FIELD_KIND.Textarea; rows?: number })
	| (BaseField<T> & { kind: typeof FIELD_KIND.Select; options: Option[] })
	| (BaseField<T> & {
			kind: typeof FIELD_KIND.RemoteAutocomplete;
			useOptions: UseRemoteOptions;
			/** `true` (default): value is `Option[]`; `false`: value is `Option | null` */
			multiple?: boolean;
	  })
	| (BaseField<T> & { kind: typeof FIELD_KIND.Radio; options: Option[]; row?: boolean })
	| (BaseField<T> & {
			kind: typeof FIELD_KIND.Date;
			/** Earliest selectable date, 'YYYY-MM-DD' */
			minDate?: string;
			/** Latest selectable date, 'YYYY-MM-DD' */
			maxDate?: string;
	  })
	| GroupField<T>;

export type FormSection<T extends FieldValues> = {
	title: string;
	fields: FieldConfig<T>[];
};
