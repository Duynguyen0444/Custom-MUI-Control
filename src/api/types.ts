export type PagedResponse<T> = {
	items: T[];
	totalCount: number;
	pageIndex: number;
	pageSize: number;
};

export type PagedParams = {
	/** Zero-based page index */
	pageIndex: number;
	pageSize: number;
	search?: string;
};
