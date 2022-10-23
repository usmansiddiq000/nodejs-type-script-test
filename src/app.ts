import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import { ProductController } from './controllers';

class App {
    public app: express.Application = express();

    constructor() {
        this.app.use(express.json())
        this.app.use(compression())
        this.app.use(helmet({contentSecurityPolicy: false}))
        this.app.use(express.urlencoded({ extended: false }))
    }
}

const app = new App().app
export default app
