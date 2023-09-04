import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const generateJWT = (id = '') => {
    return new Promise((resolve, reject) => {
        const payload = { id };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '48h'
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject('No se ha podido generar el token.');
            } else {
                resolve(token);
            }
        });
    });
}

export const validateJWT = async(tkn = '') => {
    try {
        if (tkn.length < 10) {
            return null;   
        }

        const { id } = jwt.verify(tkn, process.env.SECRETORPRIVATEKEY);
        const user = await User.findByPk(id);

        if (user && user.status) {
            return user;
        } else {
            return null;
        }
    } catch (error) {
        return new Error(error);
    }
}

export const jsonWebTokenMiddleware = async(req, res, next) => {
    const tkn = req.header('tkn');

    if (!tkn) {
        return res.status(400).json({ error: 'Token desconocido.' });
    }

    try {
        const { id } = jwt.verify(tkn, process.env.SECRETORPRIVATEKEY);
        const user = await User.findByPk(id, { include: { all: true } });

        if (!user || !user.status) {
            return res.status(403).json({ error: 'Token inválido.' });
        }

        req.user = user;
        return next();
    } catch (error) {
        console.log(error);
        console.log(tkn);
        res.status(401).json({ error: 'Error al validar el token.' });
    }
} 