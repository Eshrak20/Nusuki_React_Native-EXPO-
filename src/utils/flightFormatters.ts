export const formatMoney = (value?: number | string | null) => {
  const numberValue = Number(value ?? 0);

  return numberValue.toLocaleString("en-BD");
};

export const formatFlightTime = (value?: string | null) => {
  if (!value) return "--:--";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "--:--";

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};

export const formatFlightDate = (value?: string | null) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
};