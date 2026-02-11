const express = require("express");
const router = express.Router();
const filesController = require("../controllers/filesController");
const upload = require("../middleware/upload");

router.get("/", filesController.getFiles);
router.post("/", upload.single("file"), filesController.uploadFile);
router.get("/:blobName", filesController.downloadFile);
router.delete("/:blobName", filesController.deleteFile);

module.exports = router;
