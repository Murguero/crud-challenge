import { Equal, getRepository, Repository } from 'typeorm';

import ICreateAddressDTO from '@modules/address/dtos/ICreateAddressDTO';
import IAddressRepository from '@modules/address/repositories/IAddressRepository';

import Address from '../entities/Address';

class AddressRepositories implements IAddressRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async findById(id: string): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne({
      where: { id },
    });

    return address;
  }

  public async findByQueryCountry(country: string): Promise<Address[]> {
    const address = await this.ormRepository.find({
      where: {
        country: Equal(country),
      },
    });

    return address;
  }

  public async findAddressByUerId(user_id: string): Promise<Address[]> {
    const address = await this.ormRepository.find({
      where: {
        user_id,
      },
    });

    return address;
  }

  public async create(data: ICreateAddressDTO): Promise<Address> {
    const address = this.ormRepository.create(data);

    await this.ormRepository.save(address);

    return address;
  }

  public async save(address: Address): Promise<Address> {
    return this.ormRepository.save(address);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default AddressRepositories;
