const multer = require('multer');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'images');
  },
  filename: (req, _file, callback) => {
    callback(null, req.params.id);
  },
});

const upload = multer({ storage });

const uploadWithMulter = () => upload.single('image');

module.exports = uploadWithMulter;
