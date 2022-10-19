import supertest from 'supertest';
import server from './../server';
import { closeTestDB, connectToTestDabase, collections } from '../../src/helpers/database';

const fakeRequest = supertest(server);

beforeAll(async () => await connectToTestDabase());
afterAll(async () => {
    await closeTestDB();
    server.close();
});

describe('Auth Controller TEST', () => {
    describe('POST /auth/signup', () => {
        it('Can log in', async () => {
            const res = await fakeRequest.post('/auth/signup').send( {
                username: 'mrpoopybutthole',
                email: 'mrpoop@vindicators.dub',
                password: 'wabbalubbadubdub',
            });
            expect(res.status).toBe(200);
            expect(res.body.email).toBe('mrpoop@vindicators.dub');
            expect(res.body.username).toBe('mrpoopybutthole');
            expect(typeof res.body.token).toBe("string");
        });
    });

    describe('POST /auth/login', () => {
        it('Can log in', async () => {
            const res = await fakeRequest.post('/auth/login').send( {
                email: 'mrpoop@vindicators.dub',
                password: 'wabbalubbadubdub',
            });
            expect(res.status).toBe(200);
            expect(res.body.email).toBe('mrpoop@vindicators.dub');
            expect(res.body.username).toBe('mrpoopybutthole');
            expect(typeof res.body.token).toBe("string");
        });
    });
})