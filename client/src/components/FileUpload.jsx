import { useState } from "react";

export default function FileUpload({ onUpload, uploading }) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`
        relative border-2 border-dashed rounded-lg p-8 text-center
        bg-white/40 backdrop-blur-md shadow-lg transition-all
        ${dragActive
          ? "border-blue-400 bg-blue-100/50 scale-105"
          : "border-white/60 hover:bg-white/50"
        }
      `}
    >
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleChange}
        disabled={uploading}
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer"
      >
        <div className="space-y-2">
          <p className="text-white font-medium">
            {uploading ? "Uploading..." : "Drag and drop a file here, or click to select"}
          </p>
          <p className="text-xs text-white/80">Maximum file size: 10MB</p>
        </div>
      </label>
    </div>
  );
}
