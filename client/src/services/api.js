const API_BASE_URL = "http://localhost:3000/api/files";

export async function getFiles() {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error("Failed to fetch files");
    return await response.json();
  } catch (error) {
    console.error("Get files error:", error);
    throw error;
  }
}

export async function uploadFile(file) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(API_BASE_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Upload failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
}

export async function deleteFile(blobName) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/${encodeURIComponent(blobName)}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) throw new Error("Delete failed");
    return await response.json();
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
}

export function getDownloadUrl(blobName) {
  return `${API_BASE_URL}/${encodeURIComponent(blobName)}`;
}
