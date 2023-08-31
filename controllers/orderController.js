import Order from "../models/order.js";
import User from "../models/user.js";

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
        return res.status(404).json({ response: 'Error : 404 | Error al obtener la información deseada' })
    }

    const order = await Order.findOne({ where: { serial_number } });

    if (!order) {
        return res.status(403).json({ response: 'Error : 400 | Ha ocurrido un error al generar la consulta' })
    } else if (uid != order.userId) {
        return res.status(403).json({ response: 'Error : 403 | Acceso no permitido' })
    }

    return res.render('home/form', { orderId: order.id });
}