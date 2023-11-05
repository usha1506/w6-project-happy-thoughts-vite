export const fetchData = async (
  url,
  requestInit = undefined,
  jsonResponse = false
) => {
  let init = requestInit;
  if (!init) {
    init = {
      headers: HEADER_CONTENT_TYPE_JSON,
    };
  }

  const response = await fetch(url, init);

  if (!response.ok) {
    const errorCause = await response.text();
    throw new Error(errorCause);
  }

  if (
    init.method === undefined ||
    init.method === HttpMethod.GET ||
    jsonResponse
  ) {
    return response.json();
  }
};

export const HttpMethod = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const CONTENT_TYPE_JSON = "application/json";
export const HEADER_CONTENT_TYPE_JSON = { "Content-Type": CONTENT_TYPE_JSON };
