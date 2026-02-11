# ☁️ Cloud File Storage

A full-stack cloud file storage application built with React, Express, and Azure Blob Storage. Features containerized deployment with Docker and automated CI/CD pipeline.

## 🚀 Tech Stack

### Frontend

- **React 19** with hooks (useState, useEffect)
- **Vite 7** for lightning-fast development
- **TailwindCSS v4** with glassmorphism design
- **nginx** for production serving

### Backend

- **Node.js 20** with Express.js
- **Azure Blob Storage** for file persistence
- **Multer** for file upload handling
- **CORS** configured for cross-origin requests

### DevOps

- **Docker** multi-stage builds (<200MB total)
- **Docker Compose** for local orchestration
- **GitHub Actions** for CI/CD automation
- **Health checks** and monitoring

---

## ✨ Features

- ✅ **File Upload** - Drag-and-drop or click to upload (max 10MB)
- ✅ **File Management** - View, download, and delete files
- ✅ **Cloud Storage** - All files stored in Azure Blob Storage
- ✅ **Responsive UI** - Glassmorphism design with animations
- ✅ **Stateless Architecture** - Horizontally scalable
- ✅ **Containerized** - Production-ready Docker images
- ✅ **Automated Testing** - CI/CD pipeline with GitHub Actions

---

## 📁 Project Structure

```
cloud-file-storage/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # FileUpload, FileList, FileItem
│   │   ├── services/      # API client
│   │   ├── utils/         # Formatters
│   │   ├── App.jsx        # Main app component
│   │   └── index.css      # Tailwind + custom styles
│   ├── Dockerfile         # Multi-stage build (Vite → nginx)
│   └── nginx.conf         # SPA routing + caching
│
├── server/                # Express backend
│   ├── controllers/       # Files request handlers
│   ├── middleware/        # Upload, error handling
│   ├── routes/            # Files API routes
│   ├── services/          # Azure Blob Storage
│   ├── app.js             # Express setup
│   ├── server.js          # Server entry point
│   └── Dockerfile         # Multi-stage build (production deps only)
│
├── .github/
│   └── workflows/
│       └── ci.yml         # CI/CD pipeline
│
└── docker-compose.yml     # Multi-container orchestration
```

---

## 🏃 Quick Start

### Prerequisites

- **Docker Desktop** installed and running
- **Azure Storage Account** with connection string

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/cloud-file-storage.git
cd cloud-file-storage
```

### 2. Configure Environment Variables

```bash
# Create .env file in root directory
AZURE_STORAGE_CONNECTION_STRING=your_connection_string_here
AZURE_CONTAINER_NAME=files
```

### 3. Build and Run with Docker

```bash
# Build images and start containers
docker compose up --build -d

# Check container status
docker ps
```

### 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api/files
- **Health Check**: http://localhost:3000/health

---

## 🛠️ Development

### Run Without Docker

#### Backend

```bash
cd server
npm install
npm run dev
```

#### Frontend

```bash
cd client
npm install
npm run dev
```

### Docker Commands

```bash
# Stop containers
docker compose down

# View logs
docker logs -f cloud-storage-server
docker logs -f cloud-storage-client

# Rebuild specific service
docker compose build server
docker compose up -d

# Check image sizes
docker images | grep cloud-file-storage
```

---

## 🏗️ Architecture

### API Endpoints

| Method | Endpoint               | Description                       |
| ------ | ---------------------- | --------------------------------- |
| GET    | `/api/files`           | List all files                    |
| GET    | `/api/files/:filename` | Download file                     |
| POST   | `/api/files`           | Upload file (multipart/form-data) |
| DELETE | `/api/files/:filename` | Delete file                       |
| GET    | `/health`              | Health check                      |

### Data Flow

```
Browser → nginx (port 5173) → React App
          ↓
       API calls → Express (port 3000) → Azure Blob Storage
```

---

## 🐳 Docker Details

### Image Sizes

- **Client**: ~26 MB compressed (nginx Alpine + React build)
- **Server**: ~61 MB compressed (Node Alpine + production deps)
- **Total**: ~87 MB compressed (57% under 200MB target)

### Multi-Stage Builds

**Client Dockerfile**:

1. **Build stage**: Node 20 Alpine → `npm run build` → Vite compilation
2. **Production stage**: nginx Alpine → Copy `/dist` → Serve static files

**Server Dockerfile**:

1. **Deps stage**: Install all dependencies
2. **Production stage**: Production deps only → Non-root user → Health check

---

## 🔄 CI/CD Pipeline

GitHub Actions automatically runs on every push:

1. ✅ **Build** Docker images for client and server
2. ✅ **Test** image sizes (<400MB uncompressed)
3. ✅ **Verify** health endpoints respond correctly
4. ✅ **Test** frontend serves properly

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---
