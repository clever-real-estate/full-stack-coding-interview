const baseUrl = import.meta.env.VITE_API_URL;

export const safeAwait = async <T>(promise: Promise<T>): Promise<[T, never] | [never, Error]> => {
	try {
		const data = await promise;
		return [data, null] as [T, never];
	} catch (error) {
		return [null, error instanceof Error ? error : new Error(String(error))] as [never, Error];
	}
};
export async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
	const headers = new Headers();
	headers.append("Content-Type", "application/json");
	const bearer = localStorage.getItem("bearer");
	if (bearer) {
		headers.append("Authorization", `Bearer ${bearer}`);
	}
	const res = await fetch(`${baseUrl}${url}`, {
		headers,
		...options,
	});
	if (!res.ok) throw new Error("API error");
	return res.json();
}
