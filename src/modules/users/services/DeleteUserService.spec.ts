import CustomError from '@shared/errors/CustomError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import DeleteUserService from './DeleteUserService';

let fakeUserRepository: FakeUsersRepository;

let deleteUser: DeleteUserService;

describe('DeleteUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();

    deleteUser = new DeleteUserService(fakeUserRepository);
  });

  it('should be able to delete a user', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const deletedUser = await deleteUser.execute({
      user_id: user.id,
    });

    expect(deletedUser).toBeUndefined();
  });

  it('should not be able to delete a user from non-existing user', async () => {
    await expect(
      deleteUser.execute({
        user_id: 'non-existing user',
      }),
    ).rejects.toBeInstanceOf(CustomError);
  });
});
