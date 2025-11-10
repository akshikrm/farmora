import APIError from "@errors/api.error";
import NetworkError from "@errors/network.error";
import { getSession } from "./session";

const genURI = (path: string) => {
	const BASE_URI: string =
		"http://localhost:3000";
	let serializedPath = path;
	if (serializedPath[0] === "/") {
		serializedPath = path.substring(1, path.length);
	}
	return new URL(`/api/${serializedPath}`, BASE_URI);
};

const fetcher = async (path: string, payload?: string) => {
	try {
		const URI = genURI(path);
		const options: RequestInit = {};
		const session = getSession();
		options.headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${session?.token || ""}`,
			"ngrok-skip-browser-warning": "true",
		};
		if (payload) {
			options.method = "POST";
			options.body = payload;
		} else {
			options.method = "GET";
		}
		const res = await fetch(URI.toString(), options);
		const json = await res.json();
		if (res.ok) {
			return json.data;
		}

		throw new APIError(json.error);
	} catch (error: Error) {
		if (error instanceof APIError) {
			throw error;
		}
		throw new NetworkError(error.message);
	}
};

export default fetcher;
