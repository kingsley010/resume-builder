// config/env.ts
export const JWT_SECRET = (() => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET missing");
  }
  return process.env.JWT_SECRET;
})();
