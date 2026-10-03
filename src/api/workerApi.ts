import { API_ENDPOINTS } from './endpoints';
import { httpGet } from './httpClient';
import type { PagedParams, PagedResponse } from './types';

export type WorkerDto = {
	id: string;
	fullName: string;
	email: string;
	department: string;
};

export const workerApi = {
	getList: (params: PagedParams, signal?: AbortSignal): Promise<PagedResponse<WorkerDto>> =>
		httpGet<PagedResponse<WorkerDto>>(API_ENDPOINTS.workers, params, { signal }),
};
