const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config();

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.AZURE_CONTAINER_NAME;

let blobServiceClient = null;
let containerClient = null;

if (connectionString && containerName) {
  blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  containerClient = blobServiceClient.getContainerClient(containerName);
}

async function uploadFile(fileBuffer, fileName, mimeType) {
  if (!containerClient) {
    throw new Error("Azure Storage not configured");
  }

  try {
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
  if (!containerClient) {
    throw new Error("Azure Storage not configured");
  }

  try {
    const files = [];

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
  if (!containerClient) {
    throw new Error("Azure Storage not configured");
  }

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
  if (!containerClient) {
    throw new Error("Azure Storage not configured");
  }

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
