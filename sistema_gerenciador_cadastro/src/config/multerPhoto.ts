import multer from 'multer';
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new Error('Por favor, envie apenas png ou jpg'))
        }

        cb(undefined!, true)
    }
});

export default upload