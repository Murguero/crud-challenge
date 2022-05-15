import { inject, injectable } from 'tsyringe';

import Address from '@modules/address/infra/typeorm/entities/Address';
import IAddressRepository from '@modules/address/repositories/IAddressRepository';

interface IRequest {
  country: string;
}

@injectable()
class ListAddressService {
  constructor(
    @inject('AddressRepository')
    private adressRepository: IAddressRepository,
  ) {}

  public async execute({ country }: IRequest): Promise<Address[]> {
    const address = await this.adressRepository.findByQueryCountry(country);

    return address;
  }
}

export default ListAddressService;
