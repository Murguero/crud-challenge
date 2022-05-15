import CustomError from '@shared/errors/CustomError';

import FakeAddressRepository from '../repositories/fakes/FakeAddressRepository';

import ShowAddressService from './ShowAddressService';

let fakeAddressRepository: FakeAddressRepository;

let showAddress: ShowAddressService;

describe('ShowAddress', () => {
  beforeEach(() => {
    fakeAddressRepository = new FakeAddressRepository();

    showAddress = new ShowAddressService(fakeAddressRepository);
  });

  it('should be able to show the address', async () => {
    const address = await fakeAddressRepository.create({
      user_id: '1',
      cep: '89223030',
      street: '5th Avenue',
      houseNumber: '132',
      neighborhood: 'Broklin',
      city: 'New York',
      state: 'New York',
      country: 'USA',
    });

    const addressToList = await showAddress.execute({
      user_id: address.user_id,
      address_id: address.id,
    });

    expect(addressToList.cep).toBe('89223030');
    expect(addressToList.neighborhood).toBe('Broklin');
  });

  it('should not be able to show the address from a different user_id', async () => {
    const address = await fakeAddressRepository.create({
      user_id: '1',
      cep: '89223030',
      street: '5th Avenue',
      houseNumber: '132',
      neighborhood: 'Broklin',
      city: 'New York',
      state: 'New York',
      country: 'USA',
    });

    expect(
      showAddress.execute({
        user_id: 'non-existing-user-id',
        address_id: address.id,
      }),
    ).rejects.toBeInstanceOf(CustomError);
  });

  it('should be able to show the address by user_id', async () => {
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
      user_id: '2',
      cep: '132456798',
      street: 'Test Street',
      houseNumber: '132',
      neighborhood: 'Bom Retiro',
      city: 'Curitiba',
      state: 'Parana',
      country: 'BR',
    });

    const addressToList = await fakeAddressRepository.findAddressByUerId('1');

    expect(addressToList[0].cep).toBe('89223030');
    expect(addressToList[0].neighborhood).toBe('Broklin');
  });
});
