/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
import { Collection, ObjectId } from 'mongodb';
import { collections } from '../helpers/database';
import { HttpError } from '../models/HttpError';
import User from '../models/User';

export default class UserRepository {
  usersCollection: Collection;

  constructor() {
    if (!collections.users) throw new Error();
    this.usersCollection = collections.users;
  }

  async findUserById(userId: string): Promise<User> {
    const userDocument = await this.usersCollection.findOne({ _id: new ObjectId(userId) });
    if (!userDocument) throw new HttpError(`User with id: ${userId} not found`, 404);
    return new User(
      userDocument._id.toString(),
      userDocument.username,
      userDocument.email,
      userDocument.favs,
      userDocument.password,
    );
  }

  async findUserByEmail(email: string): Promise<User> {
    const userDocument = await this.usersCollection.findOne({ email });
    if (!userDocument) throw new HttpError(`User with email: ${email} not found`, 404);
    return new User(
      userDocument._id.toString(),
      userDocument.username,
      userDocument.email,
      userDocument.favs,
      userDocument.password,
    );
  }

  async create(username: string, email: string, password: string): Promise<User> {
    const defaultFavs : number[] = [];
    const userDocument = {
      username,
      email,
      password,
      favs: defaultFavs,
    };
    await this.ensureUserDoesNotExist(email);
    const { insertedId } = await this.usersCollection.insertOne(userDocument);
    return new User(
      insertedId.toString(),
      userDocument.username,
      userDocument.email,
      userDocument.favs,
      userDocument.password,
    );
  }

  async ensureUserDoesNotExist(email: string) {
    const user = await this.usersCollection.findOne({ email });
    if (user) {
      throw new HttpError('The email address is already in use. Please try another', 400);
    }
  }

  // TODO: add update of the rest of properties, not needed for now.
  async update(userId: string, favs: number[]) {
    const user = await this.findUserById(userId);
    await this.usersCollection.updateOne({ _id: new ObjectId(user.getId()) }, { $set: { favs } });
    user.setFavs(favs);
    return user;
  }
}
