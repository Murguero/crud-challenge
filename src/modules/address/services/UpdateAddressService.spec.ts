import CustomError from '@shared/errors/CustomError';

import FakeAddressRepository from '../repositories/fakes/FakeAddressRepository';

import UpdateAddressService from './UpdateAddressService';

let fakeAddressRepository: FakeAddressRepository;

let updateAddress: UpdateAddressService;

describe('UpdateAddress', () => {
  beforeEach(() => {
    fakeAddressRepository = new FakeAddressRepository();

    updateAddress = new UpdateAddressService(fakeAddressRepository);
  });

  it('should be able to update the address', async () => {
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

    const updatedAddress = await updateAddress.execute({
      user_id: address.user_id,
      address_id: address.id,
      cep: '88914000',
      street: '5th Avenue',
      houseNumber: '132',
      neighborhood: 'Broklin',
      city: 'New York',
      state: 'New York',
      country: 'BR',
    });

    expect(updatedAddress.cep).toBe('88914000');
    expect(updatedAddress.country).toBe('BR');
    expect(updatedAddress.city).toBe('New York');
  });

  it('should not be able to update the address from user_id address', async () => {
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
      updateAddress.execute({
        user_id: 'non-existing-user-id',
        address_id: address.id,
        cep: '88914000',
        street: '5th Avenue',
        houseNumber: '132',
        neighborhood: 'Broklin',
        city: 'New York',
        state: 'New York',
        country: 'BR',
      }),
    ).rejects.toBeInstanceOf(CustomError);
  });
});
