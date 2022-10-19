import { ObjectId } from 'mongodb';
import supertest from 'supertest';
import app from '../../server';
import { closeTestDB, connectToTestDabase, collections } from '../../src/helpers/database';


const server = app.listen(8080);
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

describe('User Controller TEST', () => {
    describe('PATCH /api/user/:id', () => {
        it('updates user favs', async () => {
            const res = await fakeRequest.patch(`/api/user/${user.id}`).set({'Authorization': `Bearer ${user.token}`}).send({favs: [1,2,3]});
            expect(res.status).toBe(200);
            expect(res.body.favs).toStrictEqual([1, 2, 3]);
        });

        it('returns status 404 if user does not exist', async () => {
            const res = await fakeRequest.patch(`/api/user/${new ObjectId()}`).set({'Authorization': `Bearer ${user.token}`}).send({favs: [1,2,3]});
            expect(res.status).toBe(404);
        });
    });
})