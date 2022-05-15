import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import CustomError from '@shared/errors/CustomError';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, name, email }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new CustomError('User do not exist!');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new CustomError('E-mail already in use.');
    }

    user.name = name;
    user.email = email;

    const updatedUser = await this.usersRepository.save(user);

    return updatedUser;
  }
}

export default UpdateUserService;
