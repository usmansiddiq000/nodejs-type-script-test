export interface IStocks {
    sku: string,
    stock: number
}

export interface ITransaction {
    sku: string,
    type: string,
    qty: number
}

export interface IProduct {
    getStocksLevel(sku: string): Promise<{ sku: string, qty: number }>
}