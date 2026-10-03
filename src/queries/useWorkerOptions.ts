import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { workerQueries } from './workerQueries';

const PAGE_SIZE = 20;

/**
 * Fetches workers page by page and maps them to `{ label, value }` options
 * so UI components never deal with the raw WorkerDto shape.
 */
export function useWorkerOptions(search: string) {
	const { data, isFetching, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
		...workerQueries.infiniteList({ search, pageSize: PAGE_SIZE }),
		placeholderData: keepPreviousData,
		select: (data) =>
			data.pages.flatMap((page) => page.items).map((worker) => ({ label: worker.fullName, value: worker.id })),
	});

	return {
		options: data ?? [],
		loading: isFetching,
		hasMore: hasNextPage,
		loadMore: () => {
			if (hasNextPage && !isFetchingNextPage) fetchNextPage();
		},
	};
}
