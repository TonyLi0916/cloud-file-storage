const azureStorage = require("../services/azureStorage");

exports.getFiles = async (req, res, next) => {
  try {
    const files = await azureStorage.listFiles();
    res.json(files);
  } catch (error) {
    next(error);
  }
};

exports.uploadFile = async (req, res, next) => {
  try {
    // Check if file exists in request
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload to Azure
    const fileData = await azureStorage.uploadFile(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype,
    );

    res.status(201).json({
      message: "File uploaded successfully",
      file: fileData,
    });
  } catch (error) {
    next(error);
  }
};

exports.downloadFile = async (req, res, next) => {
  try {
    const { blobName } = req.params;

    const fileData = await azureStorage.downloadFile(blobName);

    res.setHeader("Content-Type", fileData.contentType);
    res.setHeader("Content-Length", fileData.contentLength);
    res.setHeader("Content-Disposition", `attachment; filename="${blobName}"`);

    // Pipe the stream to response
    fileData.stream.pipe(res);
  } catch (error) {
    next(error);
  }
};

exports.deleteFile = async (req, res, next) => {
  try {
    const { blobName } = req.params;

    await azureStorage.deleteFile(blobName);

    res.json({ message: "File deleted successfully" });
  } catch (error) {
    next(error);
  }
};
