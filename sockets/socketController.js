import { Socket } from "socket.io";
import { validateJWT } from "../jwt/jwt.js";
import Order from "../models/order.js";

const getAllOrders = async() => {
    const orders = await Order.findAll();
    
    return orders;
}

const socketController = async(socket = new Socket(), io) => {
    const user = await validateJWT(socket.handshake.headers['tkn']);

    if (!user) {
        return socket.disconnect();
    }

    // ! HOME PAGE SOCKETS:
    socket.on('get-all-my-orders', async() => {
        return socket.emit('set-all-my-orders', await getAllOrders());
    });
    //!
}

export default socketController;