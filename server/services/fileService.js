const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const fs = require('fs');
const asyncHandler = require("express-async-handler");
const path = require('path');
const { format } = require('date-fns');

const Sequelize = require('sequelize');
const db = require('../dbrep');



exports.downloadFile = asyncHandler(async (req, res, next) => {
    console.log('downloadFile')
    console.log('req.params.id', req.params)
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

})

exports.getFileInfo = asyncHandler(async (req, res, next) => {
    console.log('getFileInfo')

    const fileInfo = await db.files.findOne({
        where: {
            id: req.params.id
        }
    });
    if (fileInfo?.dataValues) {
        res = fileInfo.dataValues
    } else {
        res = {msg: 'файл отсутсвует'}
    }
    return res;
})

exports.listFiles = asyncHandler(async (req, res, next) => {
    console.log('listFiles')
    try {
        const listSize = parseInt(req.query.list_size) || 10;
        const page = parseInt(req.query.page) || 1;

        const offset = (page - 1) * listSize;

        const files = await db.files.findAll({
            offset,
            limit: listSize,
           // attributes: ['id']
        });
        res = []
        files.forEach(item => res.push(item.dataValues) )
    } catch (error) {
        console.error(error);
        res = { error: 'Internal Server Error' }
    }
    return res;

})

exports.uploadFile = asyncHandler(async (file ) => {

    const fileExtensionWithoutDot = path.extname(file.originalname).slice(1);
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'yyyy-MM-dd');

    console.log(`Обработка файла: ${file.originalname}`);
    console.log(`mimetype: ${file.mimetype}`);
    console.log(`file.size: ${file.size}`);
    console.log(`fileExtensionWithoutDot: ${fileExtensionWithoutDot}`);
    console.log(`formattedDate: ${formattedDate}`);


    const newFile = await db.files.create({
        name: file.originalname,
        extension: fileExtensionWithoutDot,
        mimetype:  file.mimetype,
        size: file.size,
        date: formattedDate
    });

    console.log('Новый файл загружен:', newFile);

})
