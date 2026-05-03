import { useEffect, useState } from "react";

const MAX_RETRY_COUNT = 7;
const RETRY_DELAY = 2000;

type UseRateLimitRetryParams = {
  isRateLimitError: boolean;
  onRetry?: () => void;
};

export const useRateLimitRetry = ({
  isRateLimitError,
  onRetry,
}: UseRateLimitRetryParams) => {
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!isRateLimitError || !onRetry) return;
    if (retryCount >= MAX_RETRY_COUNT) return;

    const timeout = setTimeout(() => {
      setRetryCount((prev) => prev + 1);
      onRetry();
    }, RETRY_DELAY);

    return () => clearTimeout(timeout);
  }, [isRateLimitError, onRetry, retryCount]);

  useEffect(() => {
    if (!isRateLimitError) {
      setRetryCount(0);
    }
  }, [isRateLimitError]);

  return {
    retryCount,
    maxRetryCount: MAX_RETRY_COUNT,
    isRetrying: isRateLimitError && retryCount < MAX_RETRY_COUNT,
  };
};