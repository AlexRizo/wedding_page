import { encrypt } from "../helpers/bcrypt.js";
import User from "../models/user.js";

const adminRoleId = 2;

export const getUsers = async(req, res) => {
    const response = await User.findAll();

    if (req.user.roleId != 3) {
        return res.status(403).json({ error: 'Faltan permisos.' });
    }
    
    res.json({ 
        response
    });
}

export const createUser = async(req, res) => {
    const { password, ...user } = req.body;

    if (!req.user || req.user.roleId != adminRoleId) {
        return res.status(403).json({ error: 'Faltan permisos.' });
    }

    user.password = encrypt(password);

    const response = await User.create(user);
    
    res.json({ 
        message: 'Usuario creado correctamente.', 
        response
    });
}

export const updateUser = async(req, res) => {
    const { name, email, password, roleId, teamId, status } = req.body;
    const { id } = req.params;

    if (!req.user || req.user.roleId != adminRoleId) {
        return res.status(403).json({ error: 'Faltan permisos.' });
    }

    const user = {};

    const $userDB = await User.findByPk(id);

    if (!$userDB) {
        return res.status(401).json({ 
            error: 'El usuario no existe.' 
        });
    }

    if (name) {
        user.name = name;
    }

    if (email) {
        let emailExist = await User.findOne({ where: { 'email': email } });

        if(emailExist && emailExist.id != id) {
            return res.status(401).json({error: 'El correo ya existe.'});
        } else if (emailExist && emailExist.id === id) {
            console.log('Autorizado');
        }else {
            user.email = email;
        }
    }

    if (password) {
        user.password = encrypt(password);
    }

    if (roleId) {
        user.roleId = roleId;
    }

    if (status) {
        user.status = status;
    }
    
    await User.update(user, { where: { 'id': id } });
    
    res.json({ 
        message: 'Usuario actualizado correctamente.',
    });
}

export const deleteUser = async(req, res) => {
    const { id } = req.params;

    if (req.user.roleId != adminRoleId) {
        return res.status(403).json({ error: 'Faltan permisos.' });
    }

    await User.update({ status: 0, teamId: null }, { where: { 'id': id } });

    res.status(200).json({ message: `El usuario ${ id } fue desactivado.` });
} 