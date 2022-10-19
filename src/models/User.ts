export default class User {
  private id: string;

  private username: string;

  private email: string;

  private password: string;

  private favs: number[];

  private token: string;

  // eslint-disable-next-line default-param-last, @typescript-eslint/default-param-last
  constructor(id: string, username: string, email: string, favs: number[] = [], password: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.favs = favs;
    this.password = password;
  }

  getId(): string {
    return this.id;
  }

  getUsername(): string {
    return this.username;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getFavs(): number[] {
    return this.favs;
  }

  setFavs(favs: number[]) {
    this.favs = favs;
  }

  setUsername(username: string) {
    this.username = username;
  }

  setPassword(password: string) {
    this.password = password;
  }

  setId(id: string) {
    this.id = id;
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  serialize(): object {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      favs: this.favs,
      token: this.token,
    };
  }
}
