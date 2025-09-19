import multer from "multer";
import { imageStorage } from "../config/multer.js";

export const imageUpload = multer({
    storage: imageStorage,
    fileFilter: (request, file, cb) => {
        if (!file.originalname.match(/\.(png|jpg|jpeg|webp)$/i)) {
            return cb(new Error('Por favor, envie apenas arquivos em formato png, jpg, jpeg ou webp.'))
        }

        cb(null, true)
    },
});
