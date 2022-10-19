import { ObjectId } from 'mongodb';
import request from 'supertest';
import app from '../../server';
import { closeTestDB, connectToTestDabase, collections } from '../../src/helpers/database';
import User from '../../src/models/User';
import UserRepository from '../../src/repositories/UserRepository';

// Pass supertest agent for each test
const agent = request.agent(app);

// Setup connection to the database
beforeAll(async () => await connectToTestDabase());
afterAll(async () => await closeTestDB());


describe('User Repository Tests', () => {
  let mockUser: User;
  const id = new ObjectId();
  beforeAll(async () => {
    
    mockUser = new User(id.toString(), 'mrPooppyButthole','mrpoop@vindicators.dub', [], 'wabbalubbadubdub');
    await collections.users?.insertOne({
      _id: id,
      username: mockUser.getUsername(), 
      password: mockUser.getPassword(),
      email: mockUser.getEmail(),
    });
  });
  
  it('should return the user with the id if exists',  async () => {
     const userRepository = new UserRepository();
     const user = await userRepository.findUserById(id.toString());
     expect(user).toEqual(mockUser)
  });

  it('should reaise an error if the user with the id does not exists',  async () => {
    const userRepository = new UserRepository();
    await expect(async() => await userRepository.findUserById(new ObjectId().toString())).rejects.toThrow();
 });

  it('should return the user with the email if exists',  async () => {
    const userRepository = new UserRepository();
    const user = await userRepository.findUserByEmail('mrpoop@vindicators.dub');
    expect(user).toEqual(mockUser)
  });

 it('should reaise an error if the user with the email does not exists',  async () => {
  const userRepository = new UserRepository();
  await expect(async() => await userRepository.findUserByEmail('morty@citadelofricks.dub')).rejects.toThrow();
});


 it('should raise an error when crating a user with an existing email',  async () => {
    const userRepository = new UserRepository();
    await expect(async() => await userRepository.create('Rick', 'mrpoop@vindicators.dub', 'mrbirdman')).rejects.toThrow();
  });
});