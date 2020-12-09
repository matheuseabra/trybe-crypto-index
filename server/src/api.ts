import express from 'express';
import cors from 'cors';
import "reflect-metadata";
import * as swagger from "swagger-express-ts";
import { SwaggerDefinitionConstant } from "swagger-express-ts";
import router from './routes';

const api = express();

api.use(cors());
api.use(express.json());
api.use('/api-docs/swagger', express.static('swagger'));
api.use('/api-docs/swagger/assets', express.static('node_modules/swagger-ui-dist'));
api.use(swagger.express(
  {
    definition: {
      info: {
        title: "Crypto Index",
        version: "1.0"
      },
      externalDocs: {
        url: "My url"
      }
    }
  }
));
api.use(router);

export default api;
