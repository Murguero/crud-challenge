import CustomError from '@shared/errors/CustomError';
import FakeAddressRepository from '../repositories/fakes/FakeAddressRepository';

import DeleteAddressService from './DeleteAddressService';

let fakeAddressRepository: FakeAddressRepository;

let deleteAddress: DeleteAddressService;

describe('DeleteAddress', () => {
  beforeEach(() => {
    fakeAddressRepository = new FakeAddressRepository();

    deleteAddress = new DeleteAddressService(fakeAddressRepository);
  });

  it('should be able to delete a address', async () => {
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

    const deletedUser = await deleteAddress.execute({
      user_id: address.user_id,
      address_id: address.id,
    });

    expect(deletedUser).toBeUndefined();
  });

  it('should not be able to delete a address from a different user_id', async () => {
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

    await expect(
      deleteAddress.execute({
        user_id: 'non-existing user',
        address_id: address.id,
      }),
    ).rejects.toBeInstanceOf(CustomError);
  });
});
