import { validatePassword } from '../helpers/bcrypt.js';
import { generateJWT } from '../jwt/jwt.js';
import User from '../models/user.js'

export const login = async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ error: 'Correo y/o contraseña incorrectos.' });
        }

        if (!user.status) {
            return res.status(403).json({ error: 'Cuenta inactiva.' });
        }

        const validPass = validatePassword(password, user.password);
        if(!validPass) {
            return res.status(400).json({ error: 'Correo y/o contraseña incorrectos.' });
        }

        const tkn = await generateJWT(user.id);

        res.json({
            uid: user.id,
            ur: user.roleId,
            tkn
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error with the server ( error: 500 )'});       
    }
}

export const renewToken = async(req, res) => {
    const { user } = req;

    const token = await generateJWT(user.id);
    
    res.json({ user, token });
}