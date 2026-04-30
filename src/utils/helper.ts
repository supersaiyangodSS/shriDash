export const safeParse = <T>(val: string | undefined, fallback: T): T => {
  try {
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
};
