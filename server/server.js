const app = require("./app");

const PORT = process.env.PORT || 3000;

console.log("Starting server...");
console.log("Environment:", {
  PORT,
  NODE_ENV: process.env.NODE_ENV,
  FRONTEND_URL: process.env.FRONTEND_URL,
  HAS_AZURE_CREDS: !!process.env.AZURE_STORAGE_CONNECTION_STRING,
});

app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ Health check: http://localhost:${PORT}/health`);
  console.log(`✓ API available at http://localhost:${PORT}/api/files`);
});
