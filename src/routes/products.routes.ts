import app from '../app'
import { ProductController } from "../controllers"

const controller = new ProductController()

app.get('/stocks/:sku', controller.getStockLevel);
