export function generateDates() {
  return Array.from({ length: 10 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      day: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      label:
        i === 0
          ? "Today"
          : date.toLocaleDateString("en-US", { weekday: "short" }),
      full: date.toISOString().split("T")[0],
    };
  });
}

export function toTimeString(date: [number, number]): string {
  return `${String(date[0]).padStart(2, "0")}:${String(date[1]).padStart(
    2,
    "0"
  )}`;
}
