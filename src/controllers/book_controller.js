const Book = require('../models/book');
const api_service = require('../services/api_service');
const multer = require('multer');
const path = require('path');
const storagePath = path.join(__dirname, '../../storage');
const PDFImage = require('pdf-image').PDFImage;
const fs = require('fs');

const getAll = async (req, res) => {
    const user = req.user;
    const access_token = req.access_token;

    const books =  await Book.find({});
    
    return api_service.response(res, 200, 'Success', {books});
};

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(file.mimetype == 'application/pdf' && req.body.title != null) {
            return cb(null, storagePath + '/books');
        } 
        cb('Invalid pdf or title');
    },
    filename: function (req, file, cb) {
        var rand = Math.round(1000 + Math.random() * (9999 - 1000));
        cb(null, `${Date.now()}${rand}.pdf`);
    }
  });
  
var upload = multer({ storage }).single('pdf');

const create = async (req, res) => {
    upload(req, res, (error) => {
        if(error) {
            return api_service.response(res, 401, 'Error', {error});
        }
        const pdfImage = new PDFImage(`${storagePath}/books/${req.file.filename}`);

        pdfImage.convertPage(0).then( (imagePath) => {
                const book = new Book({
                    title: req.body.title,
                    author: req.body.author,
                    filename: req.file.filename,
                    cover: path.parse(req.file.filename).name + '-0.png'
                });
                book.save();
                return api_service.response(res, 200, 'Success', {book});
            }),
            (error) => api_service.response(res, 401, 'Error', {error});
    });
}

const request = async (req, res) => {
    try{
        var data = fs.readFileSync(`${storagePath}/books/${req.query.file}`);
        // res.contentType("application/pdf");
        res.send(data);
    }
    catch (error) {
        return api_service.response(res, 401, 'Error', {error});
    }
}

module.exports = { getAll, create, request };