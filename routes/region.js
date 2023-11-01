import express from 'express';

import {
  getAllDistricts,
  getAllProvinces,
  getAllRegency,
  getAllVillages,
} from '../controllers/RegionController.js';

const regionRouter = express.Router();

regionRouter.get('/region/province/', getAllProvinces);
regionRouter.get('/region/regency/', getAllRegency);
regionRouter.get('/region/district/', getAllDistricts);
regionRouter.get('/region/village/', getAllVillages);

export default regionRouter;
