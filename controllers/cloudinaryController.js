import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv'
import Image from '../models/image.js';

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

export const deleteFiles = (req, res) => {
    const { images } = req.body;

    try {
        images.forEach(async image => {
            const result = await cloudinary.uploader.destroy(image);
            await Image.destroy({ where: { 'publicId': image } });
            
            if (result.result === 'ok') {
                return res.status(200).json({ response: 'Se ha eliminado la imágen' });
            } else {
                return res.status(400).json({ response: 'No se ha podido eliminar la imágen' });
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ response: 'Error interno del servidor -{ 500 }-' });
    }
}