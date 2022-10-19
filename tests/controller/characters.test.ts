import supertest from 'supertest';
import server from './../server';
import { closeTestDB, connectToTestDabase, collections } from '../../src/helpers/database';

const fakeRequest = supertest(server);

beforeAll(async () => await connectToTestDabase());
afterAll(async () => {
    await closeTestDB();
    server.close();
});

let user: any;
beforeAll(async () => {
    const res = await fakeRequest.post('/auth/signup').send( {
         username: 'mrpoopybutthole',
         email: 'mrpoop@vindicators.dub',
         password: 'wabbalubbadubdub',
     });
     user = res.body;
 });

describe('Characters Controller TEST', () => {
    describe('GET /api/character', () => {
        it('Returns array of results with pagination', async () => {
            const res = await fakeRequest.get('/api/character').set({'Authorization': `Bearer ${user.token}`}).send();
            expect(res.status).toBe(200);
            expect(res.body.info).toBeTruthy();
            expect(res.body.results).toBeTruthy();
        });
    });

    describe('GET /api/character/:id', () => {
        it('Returns character info if exists', async () => {
            const res = await fakeRequest.get('/api/character/1').set({'Authorization': `Bearer ${user.token}`}).send();
            expect(res.status).toBe(200);
            expect(res.body).toBeTruthy();
        });

        it('Returns a 404 status if the character does not exist', async () => {
            const res = await fakeRequest.get('/api/character/900').set({'Authorization': `Bearer ${user.token}`}).send();
            expect(res.status).toBe(404);
        });
    });
})