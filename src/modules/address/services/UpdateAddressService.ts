import { inject, injectable } from 'tsyringe';

import Address from '@modules/address/infra/typeorm/entities/Address';
import IAddressRepository from '@modules/address/repositories/IAddressRepository';
import CustomError from '@shared/errors/CustomError';

interface IRequest {
  user_id: string;
  address_id: string;
  cep: string;
  street: string;
  houseNumber: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
}

@injectable()
class UpdateAddressService {
  constructor(
    @inject('AddressRepository')
    private adressRepository: IAddressRepository,
  ) {}

  public async execute({
    user_id,
    address_id,
    cep,
    street,
    houseNumber,
    neighborhood,
    city,
    state,
    country,
  }: IRequest): Promise<Address> {
    const address = await this.adressRepository.findById(address_id);
    if (!address || address.user_id !== user_id) {
      throw new CustomError(
        'Address does not exist or this address id is of another user',
      );
    }

    address.cep = cep;
    address.street = street;
    address.houseNumber = houseNumber;
    address.neighborhood = neighborhood;
    address.city = city;
    address.state = state;
    address.country = country;

    const updatedAddress = await this.adressRepository.save(address);

    return updatedAddress;
  }
}

export default UpdateAddressService;
