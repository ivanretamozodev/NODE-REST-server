const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        this.userPath = '/api/v1/users';
        //middlewares
        this.middlewares();
        //routes app
        this.routes();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //PARSED BODY
        this.app.use(express.json());

        //PUBLIC DIRECTORY
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.userPath, require('../routes/user.routes'));
    }

    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`app running on port ${this.PORT}`);
        });
    }
}

module.exports = Server;
