export async function withRetry(operation, { attempts = 3, baseDelay = 350, shouldRetry = () => true } = {}) {
  let lastError
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try { return await operation(attempt) } catch (error) {
      lastError = error
      if (attempt === attempts - 1 || !shouldRetry(error)) break
      await new Promise((resolve) => setTimeout(resolve, baseDelay * (2 ** attempt)))
    }
  }
  throw lastError
}
