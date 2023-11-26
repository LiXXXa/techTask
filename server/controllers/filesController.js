
const asyncHandler = require('express-async-handler');
const fileService = require('../services/fileService.js');
const db = require("../dbrep");
const path = require("path");
const fs = require("fs");

exports.uploadFile = asyncHandler(async (req, res, next) => {
    try {
        const uploadedFile = req.file;
        const result = await fileService.uploadFile(uploadedFile );
        res.status(200).send('Файл успешно загружен и обработан.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Произошла ошибка при загрузке файла.');
    }

});

exports.listFiles = asyncHandler(async (req, res, next) => {
    const result = await fileService.listFiles(req);
    res.status(200).json(result);
});

exports.deleteFile = asyncHandler(async (req, res, next) => {
    try {
        const fileId = req.params.id;

        const file = await db.files.findByPk(fileId);

        if (!file) {
            return res.status(404).json({ error: 'Файл не найден' });
        }

        const filePath = path.join(__dirname, '..', 'uploads', file.name);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await db.files.destroy({ where: { id: fileId } });

        res.json({ success: 'Файл успешно удален' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

exports.getFileInfo = asyncHandler(async (req, res, next) => {
    const result = await fileService.getFileInfo(req);
    res.status(200).json(result);
});

exports.downloadFile = asyncHandler(async (req, res, next) => {
    try {
        const fileId = req.params.id;

        const file = await db.files.findByPk(fileId);
        console.log(file)

        if (!file) {
            return res.status(404).json({error: 'Файл не найден'});
        }
        const filePath = path.join(__dirname, '..', 'uploads', file.name);
        if (fs.existsSync(filePath)) {
            res.download(filePath, file.name);
        } else {
            res.status(404).json({error: 'Файл не найден на сервере'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

exports.updateFile = asyncHandler(async (req, res, next) => {
//обновление названия
    try {
        const fileId = req.params.id;
        const newName = req.body.newName;

        const updatedFile = await db.files.update(
            { name: newName },
            { where: { id: fileId } }
        );

        if (updatedFile[0] === 0) {
            return res.status(404).json({ error: 'Файл не найден' });
        }

        res.json({ success: 'Файл успешно обновлен' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});