import type { Option } from '../types';

export const TIME_STEP_MINUTES = 15;

const MINUTES_PER_DAY = 24 * 60;

const pad = (n: number) => String(n).padStart(2, '0');

/** 'HH:mm' (24h) -> minutes since midnight */
const toMinutes = (time: string) => {
	const [hours = 0, minutes = 0] = time.split(':').map(Number);
	return hours * 60 + minutes;
};

/** minutes since midnight -> 'HH:mm' (24h) */
const toTime = (totalMinutes: number) => `${pad(Math.floor(totalMinutes / 60))}:${pad(totalMinutes % 60)}`;

/** minutes since midnight -> 'h:mm AM/PM' */
const toLabel = (totalMinutes: number) => {
	const hours24 = Math.floor(totalMinutes / 60);
	const period = hours24 < 12 ? 'AM' : 'PM';
	const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
	return `${hours12}:${pad(totalMinutes % 60)} ${period}`;
};

/**
 * Time slots for one day: value is 'HH:mm' (24h, sortable as a string),
 * label is 'h:mm AM/PM'. Default step 15 -> 96 slots from '00:00' to '23:45'.
 */
export function buildTimeOptions(step = TIME_STEP_MINUTES): Option[] {
	const options: Option[] = [];
	for (let minutes = 0; minutes < MINUTES_PER_DAY; minutes += step) {
		options.push({ value: toTime(minutes), label: toLabel(minutes) });
	}
	return options;
}

/** Last selectable slot ('23:45' for a 15 min step) */
const LAST_SLOT_MINUTES = MINUTES_PER_DAY - TIME_STEP_MINUTES;

/**
 * Adds minutes to an 'HH:mm' time. The result is capped to the day
 * ('00:00'..'23:45') instead of wrapping past midnight, so an end time never
 * jumps before its start time; at the cap end === start and validation reports it.
 */
export function addMinutes(time: string, minutes: number): string {
	const total = Math.min(Math.max(toMinutes(time) + minutes, 0), LAST_SLOT_MINUTES);
	return toTime(total);
}

export const TIME_OPTIONS = buildTimeOptions();
