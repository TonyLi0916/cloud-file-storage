import { useState, useEffect } from "react";
import FileItem from "./FileItem";

export default function FileList({ files, onDelete }) {
  const [newFileNames, setNewFileNames] = useState(new Set());
  const [prevFileCount, setPrevFileCount] = useState(0);

  useEffect(() => {
    if (files.length > prevFileCount) {
      const newestFile = files[0];
      setNewFileNames(new Set([newestFile.name]));

      // Remove "new" status after animation completes
      setTimeout(() => {
        setNewFileNames(new Set());
      }, 1000);
    }
    setPrevFileCount(files.length);
  }, [files]);

  if (files.length === 0) {
    return (
      <div className="text-center py-12 bg-white/40 backdrop-blur-md border border-white/60 rounded-lg shadow-lg">
        <p className="text-gray-500">No files uploaded yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-600 mb-3">
        {files.length} file{files.length !== 1 ? "s" : ""}
      </p>
      {files.map((file) => (
        <FileItem
          key={file.name}
          file={file}
          onDelete={onDelete}
          isNew={newFileNames.has(file.name)}
        />
      ))}
    </div>
  );
}
