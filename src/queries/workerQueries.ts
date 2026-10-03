import { infiniteQueryOptions } from '@tanstack/react-query';
import type { PagedParams } from '../api/types';
import { workerApi } from '../api/workerApi';

export type WorkerListParams = Omit<PagedParams, 'pageIndex'>;

const all = ['workers'] as const;

export const workerQueries = {
	all,
	infiniteList: (params: WorkerListParams) =>
		infiniteQueryOptions({
			queryKey: [...all, 'infinite', params] as const,
			queryFn: ({ pageParam, signal }) => workerApi.getList({ ...params, pageIndex: pageParam }, signal),
			initialPageParam: 0,
			getNextPageParam: (last) =>
				(last.pageIndex + 1) * last.pageSize < last.totalCount ? last.pageIndex + 1 : undefined,
		}),
};
