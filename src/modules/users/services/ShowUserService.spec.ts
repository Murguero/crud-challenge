import CustomError from '@shared/errors/CustomError';

import FakeAddressRepository from '@modules/address/repositories/fakes/FakeAddressRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import ShowUserService from './ShowUserService';

let fakeUserRepository: FakeUsersRepository;
let fakeAddressRepository: FakeAddressRepository;

let showUser: ShowUserService;

describe('ShowUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeAddressRepository = new FakeAddressRepository();

    showUser = new ShowUserService(fakeUserRepository, fakeAddressRepository);
  });

  it('should be able to show the user', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const userToList = await showUser.execute({
      user_id: user.id,
    });

    expect(userToList.user.name).toBe('John Doe');
    expect(userToList.user.email).toBe('johndoe@example.com');
  });

  it('should not be able to show the user from non-existing user', async () => {
    expect(
      showUser.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(CustomError);
  });
});
