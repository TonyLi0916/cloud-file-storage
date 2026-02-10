import { useState, useEffect } from "react";
import FileUpload from "./components/FileUpload";
import FileList from "./components/FileList";
import * as api from "./services/api";

export default function App() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  // Load files on mount
  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getFiles();
      // Sort by lastModified, newest first
      const sortedFiles = data.sort(
        (a, b) => new Date(b.lastModified) - new Date(a.lastModified),
      );
      setFiles(sortedFiles);
    } catch (err) {
      setError("Failed to load files");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file) => {
    try {
      setUploading(true);
      setError(null);
      await api.uploadFile(file);
      await loadFiles();
    } catch (err) {
      setError(err.message || "Upload failed");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (blobName) => {
    try {
      setError(null);
      await api.deleteFile(blobName);
      await loadFiles();
    } catch (err) {
      setError("Delete failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            Cloud File Storage
          </h1>
          <p className="text-white/90 mt-2">
            Upload and manage your files in the cloud
          </p>
        </header>

        {error && (
          <div className="mb-4 p-4 bg-red-500/20 backdrop-blur-md border border-red-400/50 rounded-lg text-white shadow-lg">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <FileUpload onUpload={handleUpload} uploading={uploading} />

          {loading ? (
            <div className="text-center py-8 text-white/80">
              Loading files...
            </div>
          ) : (
            <FileList files={files} onDelete={handleDelete} />
          )}
        </div>
      </div>
    </div>
  );
}
