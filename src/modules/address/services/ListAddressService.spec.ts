import FakeAddressRepository from '../repositories/fakes/FakeAddressRepository';

import ListAddressService from './ListAddressService';

let fakeAddressRepository: FakeAddressRepository;

let listAddress: ListAddressService;

describe('listAddress', () => {
  beforeEach(() => {
    fakeAddressRepository = new FakeAddressRepository();

    listAddress = new ListAddressService(fakeAddressRepository);
  });

  it('should be able to list the address', async () => {
    await fakeAddressRepository.create({
      user_id: '1',
      cep: '89223030',
      street: '5th Avenue',
      houseNumber: '132',
      neighborhood: 'Broklin',
      city: 'New York',
      state: 'New York',
      country: 'USA',
    });

    await fakeAddressRepository.create({
      user_id: '1',
      cep: '89223030',
      street: 'Avenida Beira Mar',
      houseNumber: '132',
      neighborhood: 'Beira mar',
      city: 'Florianopolis',
      state: 'Santa Catarina',
      country: 'BR',
    });

    const addressToList = await listAddress.execute({
      country: 'BR',
    });

    expect(addressToList[0].country).toBe('BR');
    expect(addressToList[0].neighborhood).toBe('Beira mar');
  });
});
