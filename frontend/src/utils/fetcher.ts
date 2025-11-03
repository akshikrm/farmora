import APIError from "@errors/api.error";
import NetworkError from "@errors/network.error";

const genURI = (path: string) => {
  const BASE_URI: string = "http://localhost:3000";
  let serializedPath = path;
  if (serializedPath[0] === "/") {
    serializedPath = path.substring(1, path.length);
  }
  return new URL(`/api/${serializedPath}`, BASE_URI);
};

const fetcher = async (path: string, payload: string) => {
  try {
    const URI = genURI(path);
    const res = await fetch(URI.toString(), {
      method: "POST",
      body: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });

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
