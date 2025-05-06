import { Validators } from '../../../presentation';

export class LoginUserDto {
  private constructor(
    public email: string,
    public password: string,
  ) {}
  // Return error o LoginUserDto
  static create(body: { [key: string]: any }): [string?, LoginUserDto?] {
    const { name, email, password } = body;

    // Validations in DTO: to avoid malformed inputs.
    // We throw error immediately before touching db or creating hashes
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

    return [undefined, new LoginUserDto(email, password)];
  }
}
