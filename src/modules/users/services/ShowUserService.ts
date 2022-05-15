import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IAddressRepository from '@modules/address/repositories/IAddressRepository';
import CustomError from '@shared/errors/CustomError';
import Address from '@modules/address/infra/typeorm/entities/Address';

interface IRequest {
  user_id: string;
}

interface IReponse {
  user: User;
  address: Address[];
}

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AddressRepository')
    private adressRepository: IAddressRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<IReponse> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new CustomError('User do not exist!');
    }

    const address = await this.adressRepository.findAddressByUerId(user.id);

    return { user, address };
  }
}

export default ShowUserService;
