import { delay, http, HttpResponse } from 'msw';
import { API_ENDPOINTS } from '../api/endpoints';
import type { PagedResponse } from '../api/types';
import type { WorkerDto } from '../api/workerApi';

const FIRST_NAMES = ['Anna', 'Ben', 'Chloe', 'Daniel', 'Emma', 'Felix', 'Grace', 'Henry', 'Isla', 'Jack'];
const LAST_NAMES = ['Nguyen', 'Smith', 'Tran', 'Johnson', 'Le', 'Brown', 'Pham', 'Taylor', 'Hoang', 'Wilson'];
const DEPARTMENTS = ['Claims', 'Field Operations', 'Inspection', 'Customer Service', 'Finance'];

const workers: WorkerDto[] = Array.from({ length: 100 }, (_, i) => {
  const firstName = FIRST_NAMES[i % FIRST_NAMES.length];
  const lastName = LAST_NAMES[Math.floor(i / FIRST_NAMES.length) % LAST_NAMES.length];

  return {
    id: `w-${String(i + 1).padStart(3, '0')}`,
    fullName: `${firstName} ${lastName}`,
    email: `${firstName}.${lastName}@example.com`.toLowerCase(),
    department: DEPARTMENTS[i % DEPARTMENTS.length],
  };
});

const toInt = (value: string | null, fallback: number) => {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

export const handlers = [
  http.get(API_ENDPOINTS.workers, async ({ request }) => {
    const url = new URL(request.url);
    const pageIndex = Math.max(0, toInt(url.searchParams.get('pageIndex'), 0));
    const pageSize = Math.min(100, Math.max(1, toInt(url.searchParams.get('pageSize'), 20)));
    const search = (url.searchParams.get('search') ?? '').trim().toLowerCase();

    const filtered = search
      ? workers.filter(
        (w) => w.fullName.toLowerCase().includes(search) || w.email.toLowerCase().includes(search),
      )
      : workers;

    const start = pageIndex * pageSize;

    await delay(500);

    return HttpResponse.json<PagedResponse<WorkerDto>>({
      items: filtered.slice(start, start + pageSize),
      totalCount: filtered.length,
      pageIndex,
      pageSize,
    });
  }),
];
