import got, { Response as NetworkResponse } from 'got';
import data from '../currencies.json';

interface IRequest {
  email: string;
  password: string;
}

class GetBTCPairsService {
  async run(): Promise<NetworkResponse> {
    const { body } = await got(
      'https://api.coindesk.com/v1/bpi/currentprice/BTC.json',
    );
    const result = JSON.parse(body);

    const { bpi } = result;

    for (const [key, value] of Object.entries(data)) {
      const currencyPrice = Number(value.rate);
      const {
        USD: { rate_float: usdPrice },
      } = bpi;

      const currencyBtcPairPrice = currencyPrice * usdPrice;

      bpi[key] = {
        code: key,
        description: value.description,
        rate: String(currencyBtcPairPrice),
        rate_float: currencyBtcPairPrice,
      };
    }

    return result;
  }
}

export default new GetBTCPairsService();
