import { Validators } from '../../../config';

export class RegisterUserDto {
  // we want to create it by sending an object in the body,
  // so we don't want this constructor to be exposed -> private
  private constructor(
    public name: string,
    public email: string,
    public password: string,
  ) {}

  // Return error o RegisterUserdto
  static create(body: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password } = body;

    if (!name) {
      return ['Missing name'];
    }

    if (!email) {
      return ['Missing email'];
    }

    if (!Validators.email.test(email)) {
      return ['Email is not valid'];
    }

    if (!password) {
      return ['Missing password'];
    }

    if (password.length < 6) {
      return ['Password is too short'];
    }

    return [undefined, new RegisterUserDto(name, email, password)];
  }
}
