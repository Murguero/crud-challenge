import { inject, injectable } from 'tsyringe';

import IAddressRepository from '@modules/address/repositories/IAddressRepository';
import CustomError from '@shared/errors/CustomError';

interface IRequest {
  user_id: string;
  address_id: string;
}

@injectable()
class DeleteAddressService {
  constructor(
    @inject('AddressRepository')
    private adressRepository: IAddressRepository,
  ) {}

  public async execute({ user_id, address_id }: IRequest): Promise<void> {
    const address = await this.adressRepository.findById(address_id);
    if (!address || address.user_id !== user_id) {
      throw new CustomError(
        'Address does not exist or this user id is of another user',
      );
    }

    this.adressRepository.delete(address_id);
  }
}

export default DeleteAddressService;
