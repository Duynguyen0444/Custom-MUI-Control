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

export type FieldConfig<T extends FieldValues> =
	| (BaseField<T> & { kind: typeof FIELD_KIND.Text; type?: AppInputProps['type']; clearable?: boolean })
	| (BaseField<T> & { kind: typeof FIELD_KIND.Textarea; rows?: number })
	| (BaseField<T> & { kind: typeof FIELD_KIND.Select; options: Option[] })
	| (BaseField<T> & { kind: typeof FIELD_KIND.RemoteAutocomplete; useOptions: UseRemoteOptions });
