function errorHandler(err, req, res, next) {
  console.error("Error:", err.message);
  console.error("Stack:", err.stack);

  // Multer file size error
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      error: "File too large. Maximum size is 10MB.",
    });
  }

  // Multer other errors
  if (err.name === "MulterError") {
    return res.status(400).json({
      error: `Upload error: ${err.message}`,
    });
  }

  // Custom status code or default to 500
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    error: message,
  });
}

module.exports = errorHandler;
