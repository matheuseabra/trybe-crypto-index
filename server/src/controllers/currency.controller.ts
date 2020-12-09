import { Request, Response } from 'express';
import fs from 'fs';
import got from 'got';
import * as Yup from 'yup';
import * as data from '../currencies.json';
import GetBTCPairsService from '../services/currency.service';
import UpdateCurrencyService from '../services/updateCurrency.service';

class CurrencyController {
  async index(request: Request, response: Response): Promise<Response> {
    try {
      const result = await GetBTCPairsService.run();
      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { currency, value } = request.body;
    try {
      await UpdateCurrencyService.run({ currency, value });
      return response
        .status(200)
        .json({ message: 'Valor alterado com sucesso!' });
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }
}

export default new CurrencyController();
