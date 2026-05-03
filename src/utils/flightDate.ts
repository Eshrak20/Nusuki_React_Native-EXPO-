export const pad2 = (value: number) => String(value).padStart(2, "0");

export const formatApiDate = (date: Date) => {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
};

export const parseApiDate = (date: string) => {
  return new Date(`${date}T00:00:00`);
};

export const isApiDateBefore = (first: string, second: string) => {
  return parseApiDate(first).getTime() < parseApiDate(second).getTime();
};

export const addDaysToApiDate = (date: string, days: number) => {
  const parsed = parseApiDate(date);
  parsed.setDate(parsed.getDate() + days);

  return formatApiDate(parsed);
};

export const formatDisplayDate = (dateString: string) => {
  if (!dateString) return "Select date";

  const date = parseApiDate(dateString);

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    weekday: "short",
  });
};

export const getMonthTitle = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

export const isSameDate = (first: Date, second: Date) => {
  return formatApiDate(first) === formatApiDate(second);
};

export const isBeforeDay = (first: Date, second: Date) => {
  const firstDate = new Date(first.getFullYear(), first.getMonth(), first.getDate());
  const secondDate = new Date(second.getFullYear(), second.getMonth(), second.getDate());

  return firstDate.getTime() < secondDate.getTime();
};

export const getNextMonths = (count = 4) => {
  const today = new Date();

  return Array.from({ length: count }, (_, index) => {
    return new Date(today.getFullYear(), today.getMonth() + index, 1);
  });
};

export const getCalendarDays = (monthDate: Date) => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const blanks = Array.from({ length: startDay }, () => null);
  const days = Array.from({ length: daysInMonth }, (_, index) => {
    return new Date(year, month, index + 1);
  });

  return [...blanks, ...days];
};