import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import { getRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

class UserTokenRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({ user_id });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  findByToken(token: string): Promise<UserToken | null> {
    const tokenUser = this.ormRepository.findOne({ where: { token } });

    return tokenUser;
  }
}

export default UserTokenRepository;
