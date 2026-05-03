import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const getCountdownParts = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return {
    minutes,
    seconds,
    formatted: `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
  };
};

const useSharedFlightTimer = () => {
  const expiresAt = useSelector(
    (state: RootState) => state.flightSession?.expiresAt ?? null,
  );

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const totalSeconds = useMemo(() => {
    if (!expiresAt) return 0;

    return Math.max(0, Math.floor((expiresAt - now) / 1000));
  }, [expiresAt, now]);

  return {
    expiresAt,
    isExpired: totalSeconds <= 0,
    ...getCountdownParts(totalSeconds),
  };
};

export default useSharedFlightTimer;