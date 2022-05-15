import FakeAddressRepository from '../repositories/fakes/FakeAddressRepository';

import CreateAddressService from './CreateAddressService';

let fakeAddressRepository: FakeAddressRepository;

let createAddress: CreateAddressService;

describe('CreateAddress', () => {
  beforeEach(() => {
    fakeAddressRepository = new FakeAddressRepository();

    createAddress = new CreateAddressService(fakeAddressRepository);
  });

  it('should be able to create a new user', async () => {
    const address = await createAddress.execute({
      user_id: '1',
      cep: '89223030',
      street: '5th Avenue',
      houseNumber: '132',
      neighborhood: 'Broklin',
      city: 'New York',
      state: 'New York',
      country: 'USA',
    });

    expect(address).toHaveProperty('id');
  });
});
