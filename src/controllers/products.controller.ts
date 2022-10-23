import { ProductService } from "../services"
import { Request, Response } from "express";

const productService = new ProductService();

export class ProductController {

    getStockLevel =  async (req: Request, res: Response) => {
        try {
            const stockLevel = await productService.getStocksLevel(req.params.sku)
            res.status(200).jsonp(stockLevel)
        } catch(error) {
            res.status(400).send({ error: error.message })
        }
    }
}
