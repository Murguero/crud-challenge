import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import AddressController from '../controllers/AddressController';

const addressRouter = Router();
const addressController = new AddressController();

addressRouter.get(
  '/address/filter',
  ensureAuthenticated,
  addressController.index,
);

addressRouter.post(
  '/address/create',
  celebrate({
    [Segments.BODY]: {
      cep: Joi.string().required(),
      street: Joi.string().required(),
      houseNumber: Joi.number().required(),
      neighborhood: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  addressController.create,
);

addressRouter.get(
  '/address/:address_id',
  ensureAuthenticated,
  addressController.show,
);

addressRouter.put(
  '/address/update/:address_id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      cep: Joi.string().required(),
      street: Joi.string().required(),
      houseNumber: Joi.number().required(),
      neighborhood: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string().required(),
    },
  }),
  addressController.update,
);

addressRouter.delete(
  '/address/delete/:address_id',
  ensureAuthenticated,
  addressController.delete,
);

export default addressRouter;
