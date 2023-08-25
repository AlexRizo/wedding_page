import express from "express";
import cors from "cors";
import path from "path";
import http from 'http';
import { fileURLToPath, URL } from 'url';
import { Server as socketServer } from 'socket.io';

import socketController from "../sockets/socketController.js";
import expressLayouts from "express-ejs-layouts";

import database from "../database/database.js";

import homeRouter from "../routes/home.js";
import authRouter from "../routes/auth.js";
import userRouter from "../routes/user.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Server {
    constructor() {
        this.app = express();
        this._port = process.env.PORT;
        this.server = http.createServer(this.app);
        this.io = new socketServer(this.server);
        this.paths = {
            home: '/',
            auth: '/auth',
            color: '/color',
            user: '/user',
            staff: '/staff',
            team: '/team'
            
        }

        // Conectar DB;
        this.dbConnection();
        
        // Middlewares;
        this.middlewares();

        // Layouts;
        this.layouts();
        
        // Sockets;
        this.sockets();
        
        // Rutas;
        this.routes();
    }

    async dbConnection() {
        try {
            await database.authenticate();
            console.log('Database online');
        } catch (error) {
            throw error;
        }
    }

    layouts() {
        this.app.use(expressLayouts);
        this.app.set('view engine', 'ejs');
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());
        
        // Directorio public;
        this.app.use(express.static('public'));
    }

    routes() {        
        this.app.use(this.paths.auth, authRouter);

        this.app.use(this.paths.home, homeRouter);
        
        this.app.use(this.paths.user, userRouter);

        this.app.get('/login', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/auth', 'login.html'));
        });

        //? Se habilitan las rutas para que bootstrap tenga acceso al sistema. {
        this.app.get('/bootstrap', (req, res) => {
            res.sendFile(path.join(__dirname, '../node_modules/bootstrap/dist/js', 'bootstrap.min.js'));
        });

        this.app.get('/bootstrap.min.js.map', (req, res) => {
            res.sendFile(path.join(__dirname, '../node_modules/bootstrap/dist/js', 'bootstrap.min.js.map'));
        });
        //? }

        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/errors', '404.html'));
        });
    }

    sockets() {
        this.io.on('connection', (socket) => socketController(socket, this.io));
    }

    start() {
        this.server.listen(this._port, () => {
            console.log('Running on port', this._port);
        });
    }
}

export default Server;