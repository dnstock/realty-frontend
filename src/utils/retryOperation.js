const isRetryableError = (error) => {
  // Example of retryable errors: network issues, server unavailable
  return error.response?.status >= 500 && error.response?.status < 600; // Retry for 5xx errors
};

const retryOperation = async (operation, { retries = 3, delay = 1000 } = {}) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await operation();
      return;
    } catch (error) {
      if (!isRetryableError(error) || attempt === retries) throw error; // Stop retry if error is not retryable
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

export default retryOperation;
