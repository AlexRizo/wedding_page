import Order from "../models/order.js";

export const orderHome = (req, res) => {
    return res.render('home/order')
}

export const createOrder = async(req, res) => {
    const { description, ...order } = await req.body;
    const apiKey= req.header('apiKey');

    if (apiKey != process.env.APIKEY) {
        return res.status(400).json({ response: 'Invalid APIKEY' });
    }

    if (!description) {
        order.description = 'Tu pedido aún se encuentra en estado pendiente. Completa el formulario para poder recibir tu pedido.'
    }
    
    const newOrder = await Order.create(order);
    
    return res.status(200).json({ response: 'Orden creada correctamente', order: newOrder });
}