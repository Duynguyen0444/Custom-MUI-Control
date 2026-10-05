import { useEffect } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { AppointmentFormValues } from '../../schema/AppointmentField';
import { addMinutes, TIME_STEP_MINUTES } from '../../utils/timeOptions';

type SyncEndTimeForm = Pick<
	UseFormReturn<AppointmentFormValues>,
	'subscribe' | 'setValue' | 'getFieldState' | 'trigger'
>;

/**
 * Keeps the end time after the start time.
 * Subscribes to `startTime` changes only (no re-render, no effect on every value change):
 * - end <= start  -> move end to start + one slot
 * - end  > start  -> re-validate end so a stale "End time must be after start time" error clears
 */
export function useSyncEndTime({ subscribe, setValue, getFieldState, trigger }: SyncEndTimeForm) {
	useEffect(
		() =>
			subscribe({
				name: 'startTime',
				exact: true,
				formState: { values: true },
				callback: ({ values: { startTime, endTime } }) => {
					if (!startTime) return;
					if (!endTime || endTime <= startTime) {
						setValue('endTime', addMinutes(startTime, TIME_STEP_MINUTES), {
							shouldDirty: true,
							shouldValidate: true,
						});
					} else if (getFieldState('endTime').invalid) {
						void trigger('endTime');
					}
				},
			}),
		[subscribe, setValue, getFieldState, trigger],
	);
}
