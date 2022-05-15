import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAddressService from '@modules/address/services/CreateAddressService';
import ShowAddressService from '@modules/address/services/ShowAddressService';
import UpdateAddressService from '@modules/address/services/UpdateAddressService';
import DeleteAddressService from '@modules/address/services/DeleteAddressService';
import ListAddressService from '@modules/address/services/ListAddressService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { cep, street, houseNumber, neighborhood, city, state, country } =
      request.body;

    const createrAddress = container.resolve(CreateAddressService);

    const address = await createrAddress.execute({
      user_id,
      cep,
      street,
      houseNumber,
      neighborhood,
      city,
      state,
      country,
    });

    return response.json(address);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { address_id } = request.params;

    const showAddress = container.resolve(ShowAddressService);

    const address = await showAddress.execute({
      user_id,
      address_id,
    });

    return response.json(address);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { address_id } = request.params;

    const { cep, street, houseNumber, neighborhood, city, state, country } =
      request.body;

    const updateAddress = container.resolve(UpdateAddressService);

    const address = await updateAddress.execute({
      user_id,
      address_id,
      cep,
      street,
      houseNumber,
      neighborhood,
      city,
      state,
      country,
    });

    return response.json(address);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { address_id } = request.params;

    const deleteAddress = container.resolve(DeleteAddressService);

    await deleteAddress.execute({
      user_id,
      address_id,
    });

    return response.json().status(204);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { country } = request.query;

    const listAddress = container.resolve(ListAddressService);

    const address = await listAddress.execute({
      country: String(country),
    });

    return response.json(address);
  }
}
