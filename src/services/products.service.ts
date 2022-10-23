import { IProduct, IStocks, ITransaction } from "../models";
import { promises as fsPromises } from 'fs';
import * as path from 'path';
import { TransactionTypes } from "../constants";

export class ProductService implements IProduct {
    private stocks: IStocks[];
    private transactions: ITransaction[];

    constructor() {}

    public async getStocksLevel(sku: string): Promise<{ sku: string, qty: number }> {
        await this.initStocksAnsTransactions();
        const stock: IStocks = this.stocks.find((stock: IStocks) => stock.sku === sku);
        if(!stock) throw new Error('stock not found');

        const transactions: ITransaction[] = this.transactions.filter((transaction: ITransaction) => transaction.sku === sku);
        if(!transactions?.length) throw new Error('transactions not found');

        const refundTransactions: number = transactions
                                    .filter((transaction: ITransaction) => transaction.type === TransactionTypes.REFUND)
                                    .reduce((partialSum, a) => partialSum + a?.qty, 0);
        const orderedTransactions: number = transactions
                                    .filter((transaction: ITransaction) => transaction.type === TransactionTypes.ORDER)
                                    .reduce((partialSum, a) => partialSum + a?.qty, 0);
        const totalStocks: number = (stock.stock + refundTransactions) - orderedTransactions;

        return {
            qty: totalStocks, 
            sku: sku
        }
    }

    private async initStocksAnsTransactions() {
        this.stocks = await this.getstocks();
        this.transactions = await this.getTransactions();
    }

    private async getstocks() {
        try {
            return JSON.parse(await fsPromises.readFile(path.join(__dirname, '../test/mocks/stock.json'), { encoding: 'utf-8' }))
        } catch(error) {
            console.log(error)
        }
    }

    private async getTransactions() {
        try {
            return JSON.parse(await fsPromises.readFile(path.join(__dirname, '../test/mocks/transactions.json'), { encoding: 'utf-8' }))
        } catch(error) {
            console.log(error)
        }
    }

}