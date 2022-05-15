import { v4 } from 'uuid';

import IAddressRepository from '@modules/address/repositories/IAddressRepository';
import ICreateAddressDTO from '@modules/address/dtos/ICreateAddressDTO';

import User from '@modules/users/infra/typeorm/entities/Users';
import Address from '../../infra/typeorm/entities/Address';

class FakeAddressRepository implements IAddressRepository {
  private address: Address[] = [];

  private users: User[] = [];

  public async findById(id: string): Promise<Address | undefined> {
    const findAddress = this.address.find(item => item.id === id);

    return findAddress;
  }

  public async findByQueryCountry(country: string): Promise<Address[]> {
    const findAddress = this.address.filter(item => {
      return item.country === country;
    });

    return findAddress;
  }

  public async findAddressByUerId(user_id: string): Promise<Address[]> {
    const findAddress = this.address.filter(item => {
      return item.user_id === user_id;
    });

    return findAddress;
  }

  public async create(addressData: ICreateAddressDTO): Promise<Address> {
    const user = new User();
    const userData = {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
    };

    Object.assign(user, { id: v4() }, userData);

    this.users.push(user);

    const address = new Address();

    Object.assign(address, { id: v4() }, addressData);

    this.address.push(address);
    return address;
  }

  public async save(user: Address): Promise<Address> {
    const findIndex = this.address.findIndex(
      findAddress => findAddress.id === user.id,
    );

    this.address[findIndex] = user;

    return user;
  }

  public async delete(id: string): Promise<void> {
    const idNumber = parseInt(id, 10);
    this.address.splice(1, idNumber);
  }
}

export default FakeAddressRepository;
