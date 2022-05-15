import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';

import User from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import CustomError from '@shared/errors/CustomError';

import cryptoConfig from '@config/crypto';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserAlreadyExists = await this.usersRepository.findByEmail(
      email,
    );

    if (checkUserAlreadyExists) {
      throw new CustomError('Email already used!');
    }

    const hashPassword = await hash(password, cryptoConfig.secret);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
    });

    return user;
  }
}

export default CreateUserService;
