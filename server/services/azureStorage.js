const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config();

// Initialize Azure Blob Service Client
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.AZURE_CONTAINER_NAME;

if (!connectionString || !containerName) {
  throw new Error(
    "Azure Storage connection string or container name not configured",
  );
}

const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

async function uploadFile(fileBuffer, fileName, mimeType) {
  try {
    // Generate unique filename with timestamp to prevent collisions
    const uniqueFileName = `${Date.now()}-${fileName}`;
    const blockBlobClient = containerClient.getBlockBlobClient(uniqueFileName);

    // Upload file buffer with metadata
    await blockBlobClient.upload(fileBuffer, fileBuffer.length, {
      blobHTTPHeaders: { blobContentType: mimeType },
    });

    return {
      name: fileName,
      blobName: uniqueFileName,
      size: fileBuffer.length,
      contentType: mimeType,
      url: blockBlobClient.url,
      uploadedAt: new Date(),
    };
  } catch (error) {
    console.error("Azure upload error:", error);
    throw new Error(`Failed to upload file: ${error.message}`);
  }
}

async function listFiles() {
  try {
    const files = [];

    // Iterate through all blobs in the container
    for await (const blob of containerClient.listBlobsFlat()) {
      files.push({
        name: blob.name,
        size: blob.properties.contentLength,
        contentType: blob.properties.contentType,
        lastModified: blob.properties.lastModified,
      });
    }

    return files;
  } catch (error) {
    console.error("Azure list error:", error);
    throw new Error(`Failed to list files: ${error.message}`);
  }
}

async function downloadFile(blobName) {
  try {
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const downloadResponse = await blockBlobClient.download();

    return {
      stream: downloadResponse.readableStreamBody,
      contentType: downloadResponse.contentType,
      contentLength: downloadResponse.contentLength,
    };
  } catch (error) {
    console.error("Azure download error:", error);
    throw new Error(`Failed to download file: ${error.message}`);
  }
}

async function deleteFile(blobName) {
  try {
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.delete();
    return true;
  } catch (error) {
    console.error("Azure delete error:", error);
    throw new Error(`Failed to delete file: ${error.message}`);
  }
}

module.exports = {
  uploadFile,
  listFiles,
  downloadFile,
  deleteFile,
};
