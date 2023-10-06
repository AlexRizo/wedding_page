import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv'

import Order from "../models/order.js";
import Ladie from "../models/ladie.js";
import Gentleman from "../models/gentleman.js";
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
    return res.render('home/order');
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
            return res.status(404).json({response: 'No se ha encontrado el usuario'});
        }
        
        if (!description) {
            order.description = 'Tu pedido aún se encuentra en estado pendiente. Completa el formulario para poder recibir tu pedido.';
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

// TODO: complete this method;
export const continueOrder = async(req, res) => {
    const { id, stepId, ...orderData } = req.body,
          values     = Object.values(orderData),
          extensions = ['jpg', 'jpeg', 'png'];

    let counter = 0;

    if (stepId == 5) {
        let LCounter = 1, GCounter = 1, ladies = [], gentlemen = [];

        for (const ladie of orderData.ladies) {
            if (ladie) {
                ladies.push({name: ladie, number: LCounter, orderId: id});
            }
            LCounter++;
        }

        for (const gentleman of orderData.gentlemen) {
            if (gentleman) {
                gentlemen.push({name: gentleman, number: GCounter, orderId: id});          
            }
            GCounter++;
        }

        try {
            await Ladie.bulkCreate(ladies);
            await Gentleman.bulkCreate(gentlemen);
            await Order.update({
                // ? Aumentamos el stepId;
                stepId: orderData.stepId = parseInt(stepId) + 1
            },
            { where: { id } })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Ha ocurrido un error en el servidor -{ 500 }-' })
        }

        return res.status(200).json({ response: 'La información ha sido enviada' });
    }

    // ? Aumentamos el stepId;
    // orderData.stepId = parseInt(stepId) + 1 >= 7 ? stepId++ : stepId;
    orderData.stepId = parseInt(stepId) + 1;

    for (const value of values) {
        if (!value) {
            return res.status(400).json({ error: 'Existen campos vacíos' });
        }
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        await Order.update(orderData, { where: { id } });

        return res.status(200).json({ response: 'La información ha sido enviada' });
    } else {
        const files = Object.values(req.files);
              
        for (const file of files) {
            const fileName      = file.name.split('.'),
                  fileExtension = fileName[fileName.length - 1];
    
            if (!extensions.includes(fileExtension)) {
                return res.status(400).json({ error: 'La extensión del archivo no es válida. Extensiones permitidas: JPG, JPEG, PNG' });
            } else if (file.size > process.env.MAX_FILE_SIZE) {
                return res.status(400).json({ error: 'El tamaño máximo permitido de los archivos es de 5 MB' });
            }
        }

        try {
            const filesName  = Object.keys(req.files);
            
            files.forEach(async file => {
                const cloudRes = await cloudinary.uploader.upload(file.tempFilePath);
    
                const image = {
                    name: filesName[counter],
                    url: cloudRes.secure_url,
                    orderId: id,
                    publicId: cloudRes.public_id
                };
    
                await Image.create(image);

                counter++;
            });     
        } catch (error) {
            console.log('ERROR: ', error);
            return res.status(500).json({ error: 'Ha ocurrido un error en el servidor -{ 500 }-' });
        }

        await Order.update(orderData, { where: { id } });

        return res.status(200).json({ response: 'La información ha sido enviada' });
    }
} 

export const uploadFiles = async (req, res) => {
    const { orderId, stepId, ...data } = req.body;
    let filePath = '', i = 0,  cloudRes, image, images = [];
    let status = true;

    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: 'No se han recibido archivos.' });
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

            const json = {
                name: image_key,
                url: cloudRes.secure_url,
                orderId,
                publicId: cloudRes.public_id
            };

            images.push(cloudRes.public_id);
            image = await Image.create(json);
            i++;
        }
    
        return res.status(200).json({ response: 'Información enviada correctamente.', images });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Ha ocurrido un error -CRÍTICO- { 500 }' });
    }
}