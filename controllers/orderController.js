import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv'

import Order from "../models/order.js";
import User from "../models/user.js";
import Image from '../models/image.js';

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

export const orderHome = (req, res) => {
    return res.render('home/order')
}

export const createOrder = async(req, res) => {
    const { description, ...order } = await req.body;
    const apiKey = req.header('apiKey');
    const email = req.header('userEmail');

    try {
        if (apiKey != process.env.APIKEY) {
            return res.status(400).json({ response: 'Invalid APIKEY' });
        }
    
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            return res.status(404).json({response: 'No se ha encontrado el usuario'})
        }
        
        if (!description) {
            order.description = 'Tu pedido aún se encuentra en estado pendiente. Completa el formulario para poder recibir tu pedido.'
        }
        
        order.userId = user.id;

        const newOrder = await Order.create(order);
    
        return res.status(200).json({
            response: 'Orden creada correctamente',
            order: newOrder
        });
    } catch (error) {
        return console.log(error);
    }
}

export const completeOrder = async(req, res) => {
    const { uid, serial_number } = req.params;

    if (!uid || !serial_number) {
        return res.status(404).json({ response: 'Error : 404 | Error al obtener la información deseada' });
    }

    const order = await Order.findOne({ where: { serial_number } });

    if (!order) {
        return res.status(403).json({ response: 'Error : 400 | Ha ocurrido un error al generar la consulta' });
    } else if (uid != order.userId) {
        return res.status(403).json({ response: 'Error : 403 | Acceso no permitido' });
    }

    return res.render('home/form', { orderId: order.id });
}

export const uploadFiles = async (req, res) => {
    const { orderId, stepId, ...data } = req.body;
    let filePath = '', i = 0,  cloudRes, image;
    let status = true;

    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ response: 'No se han recibido archivos.' });
        }
            
        const files = Object.values(req.files);
        const image_name = Object.keys(data);

        files.forEach(file => {
            const fileName = file.name.split('.');
            const extension = fileName[fileName.length - 1];
            const validExtensions = ['jpg', 'jpeg', 'png'];

            if (!validExtensions.includes(extension)) {
                return status = false;
            }
        });
        
        if (!status) {
            return res.status(400).json({ 
                error: 'La extensión del archivo no es válida. Extensiones permitidas: JPG, JPEG, PNG'
            });
        }
        
        for (const file of files) {
            const image_key = image_name[i];
            
            filePath = file.tempFilePath;
            cloudRes = await cloudinary.uploader.upload(filePath);

            console.log(cloudRes);

            const json = {
                name: image_key,
                url: cloudRes.secure_url,
                orderId,
                publicId: cloudRes.public_id
            };

            image = await Image.create(json);
            i++;
        }
    
        return res.status(200).json('Información enviada correctamente.');
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Ha ocurrido un error -CRÍTICO- { 500 }' });
    }
}