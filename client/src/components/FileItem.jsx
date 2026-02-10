import { formatFileSize, formatDate } from "../utils/formatters";
import { getDownloadUrl } from "../services/api";

export default function FileItem({ file, onDelete, isNew }) {
  const handleDelete = () => {
    if (window.confirm(`Delete "${file.name}"?`)) {
      onDelete(file.name);
    }
  };

  return (
    <div
      className={`
        flex items-center justify-between p-4 rounded-lg
        bg-white/40 backdrop-blur-md border border-white/60
        shadow-lg hover:bg-white/50 transition-all
        ${isNew ? 'animate-pop-in' : ''}
      `}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {file.name}
        </p>
        <p className="text-xs text-gray-500">
          {formatFileSize(file.size)} • {formatDate(file.lastModified)}
        </p>
      </div>
      <div className="flex gap-2 ml-4">
        <a
          href={getDownloadUrl(file.name)}
          download
          className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
        >
          Download
        </a>
        <button
          onClick={handleDelete}
          className="px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
