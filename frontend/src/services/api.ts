const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

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
	const data = await res.json();
	if (!res.ok) {
		if (res.status === 401) {
			localStorage.clear();
			window.location.href = "/auth/login";
			return Promise.reject(new Error("Unauthorized. Redirecting to login."));
		}
		throw new Error(data?.message || "An error ocurred");
	}
	return data;
}
