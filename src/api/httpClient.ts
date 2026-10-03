export type QueryParams = Record<string, string | number | boolean | null | undefined>;

type RequestOptions = {
	signal?: AbortSignal;
};

const buildUrl = (url: string, params?: QueryParams) => {
	if (!params) return url;

	const searchParams = new URLSearchParams();
	for (const [key, value] of Object.entries(params)) {
		if (value === undefined || value === null || value === '') continue;
		searchParams.set(key, String(value));
	}

	const query = searchParams.toString();
	return query ? `${url}?${query}` : url;
};

export async function httpGet<T>(url: string, params?: QueryParams, options?: RequestOptions): Promise<T> {
	const response = await fetch(buildUrl(url, params), {
		method: 'GET',
		headers: { Accept: 'application/json' },
		signal: options?.signal,
	});

	if (!response.ok) {
		throw new Error(`GET ${url} failed: ${response.status} ${response.statusText}`);
	}

	return (await response.json()) as T;
}
