export const envKeysToCheck = ["JWT_SECRET_TOKEN", "SMTP_PORT", "WEBAPP_BASE_URL", "SITE_NAME", "ROW_PER_PAGE_LIMIT"];

envKeysToCheck.map((key) => {
  if (!process.env[key]) throw new Error("No ENV present for " + key);
});
