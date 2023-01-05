const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        this.paths = {
            auth: '/api/v1/auth',
            users: '/api/v1/users',
            categories: '/api/v1/categories',
            products: '/api/v1/products',
            search: '/api/v1/search'
        };
        //connecting DB
        this.connectDB();
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

    async connectDB() {
        await dbConnection();
    }

    routes() {
        this.app.use(this.paths.users, require('../routes/user.routes'));
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.categories, require('../routes/categories.routes'));
        this.app.use(this.paths.products, require('../routes/products.routes'));
        this.app.use(this.paths.search, require('../routes/search.routes'));
    }

    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`app running on port ${this.PORT}`);
        });
    }
}

module.exports = Server;
