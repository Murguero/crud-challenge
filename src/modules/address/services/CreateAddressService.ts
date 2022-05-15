import { inject, injectable } from 'tsyringe';

import Address from '@modules/address/infra/typeorm/entities/Address';
import IAddressRepository from '@modules/address/repositories/IAddressRepository';

interface IRequest {
  user_id: string;
  cep: string;
  street: string;
  houseNumber: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
}

@injectable()
class CreateAddressService {
  constructor(
    @inject('AddressRepository')
    private adressRepository: IAddressRepository,
  ) {}

  public async execute({
    user_id,
    cep,
    street,
    houseNumber,
    neighborhood,
    city,
    state,
    country,
  }: IRequest): Promise<Address> {
    const address = await this.adressRepository.create({
      user_id,
      cep,
      street,
      houseNumber,
      neighborhood,
      city,
      state,
      country,
    });

    return address;
  }
}

export default CreateAddressService;
