const express = require("express");
const router = express.Router();
const filesController = require("../controllers/filesController");
const upload = require("../middleware/upload");

// GET /api/files
router.get("/", filesController.getFiles);

// POST /api/files
router.post("/", upload.single("file"), filesController.uploadFile);

// GET /api/files/:blobName
router.get("/:blobName", filesController.downloadFile);

// DELETE /api/files/:blobName
router.delete("/:blobName", filesController.deleteFile);

module.exports = router;
