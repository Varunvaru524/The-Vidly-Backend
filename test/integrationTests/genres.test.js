let server;
let request = require('supertest')

describe('genresApi',()=>{
    beforeEach(()=>{server = require('../../index')})
    afterEach(async ()=>{await server.close()})
    
    it('Should return all the genres', async ()=>{
        let result = await request(server).get('/api/genres')
        expect(result.status).toBe(200)
    })

    describe('genresApiWithId',()=>{
        it('should return the perticular genre',async ()=>{
            let result = await request(server).get('/api/genres/63e40fa9c9955e201d5416b6')
            expect(result.body.name).toBe('sssa')
        })
        it('Should return invalid id if wrong id is sent', async ()=>{
            let result = await request(server).get('/api/genres/23')
            expect(result.status).toBe(400)
        })
        it('Should return not found if we sent the id that dosnt exist', async ()=>{
            let result = await request(server).get('/api/genres/63e54c7e89db7d581f772c10')
            expect(result.status).toBe(404)
        })
    })
    
})

