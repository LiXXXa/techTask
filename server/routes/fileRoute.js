const express = require('express');
const router = express.Router();
const fileController = require('../controllers/filesController');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), fileController.uploadFile);
router.get('/list', fileController.listFiles);
router.delete('/delete/:id', fileController.deleteFile);
router.get('/:id', fileController.getFileInfo);
router.get('/download/:id', fileController.downloadFile);
router.put('/update/:id', fileController.updateFile);


module.exports = router;