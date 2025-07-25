/*
Write a function that performs 10 external API calls in parallel.
The function should:

Return only the successful responses.

Ignore or log failed requests.
*/

async function apiCallsExecution(urls, timeout = 10000) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Request timed out'));
    }, timeout);
  });

  const fetchApiCallPromise = urls.map((url) => {
    const results = axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .then((data) => ({ status: 'fulfilled', value: data }))
      .catch((error) => {
        console.error(`Error fetching ${url}:`, error.message);
        return { status: 'rejected', reason: error };
      });
    return results;
  });

  // Race between the fetch and timeout

  try {
    const results = await Promise.race([
      Promise.allSettled(fetchApiCallPromise),
      timeoutPromise,
    ]);
    const successfulResponses = results
      .filter((result) => result.status === 'fulfilled')
      .map((result) => result.value);
    return successfulResponses;
  } catch (error) {}
}
