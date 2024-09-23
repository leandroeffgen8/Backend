import multer from 'multer';
import path from 'path';

//destination to store image
export const imageStorage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
})

export const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) { 
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new Error('Por favor, envie apenas png ou jpg'))
        }

        cb(undefined, true)
    }
})


