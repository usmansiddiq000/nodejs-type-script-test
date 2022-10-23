import { expect } from 'chai'
import request from 'supertest';

describe("Product Entity APIs - Integration Tests", () => {
    let server;

    before(async () => {
        const mod = await import('../../index');
        server = (mod as any).default;
    });
    after((done) => {
        if (server) {
            server.close(done);
        }
    });

    it('get /stocks/:sku - Fetch the stock level if skudId does not exists in stocks and transactions', async () => {
        const res = await request(server)
            .get('/stocks/WRONGSKU123')
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('sku not found');
        
    })

    it('get /stocks/:sku - Fetch the stock level if skudId does not exists in stocks', async () => {
        const skuId = encodeURIComponent('DOK019240/66/90');
        const response = { "qty":-49, "sku":"DOK019240/66/90"}
        const res = await request(server)
            .get(`/stocks/${skuId}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.deep.equal(response);
        
    })

    it('get /stocks/:sku - Fetch the stock level using skuId', async () => {
        const skuId = encodeURIComponent('DOK019240/66/49');
        const response = {"qty":7660, "sku":"DOK019240/66/49"};
        const res = await request(server)
            .get(`/stocks/${skuId}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.deep.equal(response);
       
    })
})