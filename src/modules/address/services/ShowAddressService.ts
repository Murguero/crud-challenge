import { inject, injectable } from 'tsyringe';

import Address from '@modules/address/infra/typeorm/entities/Address';
import IAddressRepository from '@modules/address/repositories/IAddressRepository';
import CustomError from '@shared/errors/CustomError';

interface IRequest {
  user_id: string;
  address_id: string;
}

@injectable()
class ShowAddressService {
  constructor(
    @inject('AddressRepository')
    private adressRepository: IAddressRepository,
  ) {}

  public async execute({ user_id, address_id }: IRequest): Promise<Address> {
    const address = await this.adressRepository.findById(address_id);
    if (!address || address.user_id !== user_id) {
      throw new CustomError(
        'Address does not exist or this address id is of another user',
      );
    }

    return address;
  }
}

export default ShowAddressService;
