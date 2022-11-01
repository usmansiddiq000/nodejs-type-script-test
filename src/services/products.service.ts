import { IProduct, IStocks, ITransaction } from "../models";
import { promises as fsPromises, createReadStream } from 'fs';
import * as path from 'path';
import { TransactionTypes } from "../constants";

export class ProductService implements IProduct {
    constructor() {}

    public async getStocksLevel(sku: string): Promise<{ sku: string, qty: number }> {
        const stock: IStocks = await this.getstock(sku);
        const transactions: ITransaction[] = await this.getTransactions(sku);
        if(!transactions?.length && !stock) throw new Error('sku not found');

        const refundTransactions: number = transactions
                                    .filter((transaction: ITransaction) => transaction.type === TransactionTypes.REFUND)
                                    .reduce((partialSum, a) => partialSum + a?.qty, 0);
        const orderedTransactions: number = transactions
                                    .filter((transaction: ITransaction) => transaction.type === TransactionTypes.ORDER)
                                    .reduce((partialSum, a) => partialSum + a?.qty, 0);
        const totalStocks: number = ((stock?.stock || 0) + refundTransactions) - orderedTransactions;

        return {
            qty: totalStocks, 
            sku: sku
        }
    }

    private getstock(sku: string): Promise<IStocks> {
        return new Promise((resolve, reject) => {
            const stocksData = [];
            const readStream = createReadStream(path.join(__dirname, '../test/mocks/stock.json'));
            readStream.on('data', function(data) {
                stocksData.push(data);
            }); 
            readStream.on('end', function() {
                const stocks = JSON.parse(Buffer.concat(stocksData).toString());
                const stock = stocks.
                find((s: IStocks) => s.sku === sku)
                resolve(stock)
            })
            readStream.on('error', function() {
                reject ('Something went wrong')
            }); 
        })
    }

    private async getTransactions(sku: string): Promise<ITransaction[]> {
        return new Promise((resolve, reject) => {
            const transactionsString = [];
            const readStream = createReadStream(path.join(__dirname, '../test/mocks/transactions.json'));
            readStream.on('data', function(data) {
                transactionsString.push(data)
            }); 
            readStream.on('end', function() { 
                const transactions = JSON.parse(Buffer.concat(transactionsString).toString());
                const stockTransaction = transactions.filter((transaction: ITransaction) => transaction.sku === sku);
                resolve(stockTransaction)
            })
            readStream.on('error', function() {
                reject ('Something went wrong')
            }); 
        })
    }

}