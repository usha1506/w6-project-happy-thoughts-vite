import { fetchData, HEADER_CONTENT_TYPE_JSON, HttpMethod } from "./fetchData";

const URL = "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts";
// https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/THOUGHT_ID/like

export const getThoughts = async () => {
  return await fetchData(URL);
};

export const postThought = async (thought) => {
  const init = {
    method: HttpMethod.POST,
    body: JSON.stringify(thought),
    headers: HEADER_CONTENT_TYPE_JSON,
  };

  await fetchData(URL, init);
};

export const postLike = async (thoughtId) => {
  const init = {
    method: HttpMethod.POST,
    headers: HEADER_CONTENT_TYPE_JSON,
  };

  await fetchData(`${URL}/${thoughtId}/like`, init);
};
