import { Socket } from "socket.io";
import { validateJWT } from "../jwt/jwt.js";
import Order from "../models/order.js";
import Step from "../models/step.js";

const getAllMyOrders = async() => {
    const orders = await Order.findAll();
    
    return orders;
}

const getActuallyStep = async(orderId) => {
    const order = await Order.findByPk(orderId, { include: { model: Step } });
    
    return order.Step;
}

const saveOrderData = async({id, ...data}) => {
    data.stepId = (await getActuallyStep(id)).id + 1;
    return await Order.update(data, { where: { 'id': id } });
}

const socketController = async(socket = new Socket(), io) => {
    const user = await validateJWT(socket.handshake.headers['tkn']);

    if (!user) {
        return socket.disconnect();
    }

    // ! HOME PAGE SOCKETS:
    socket.on('get-all-my-orders', async() => {
        return socket.emit('set-all-my-orders', await getAllMyOrders());
    });
    //!

    // ! FORM PAGE SOCKETS:
    socket.on('get-actuallly-step', async(orderId) => {
        return socket.emit('set-actuallly-step', await getActuallyStep(orderId));
    });

    socket.on('send-order-data', async(data) => {
        const response = await saveOrderData(data);

        socket.emit('data-saved', response);
        socket.emit('set-actuallly-step', await getActuallyStep(data.id));
        return;
    });
    //!
}

export default socketController;