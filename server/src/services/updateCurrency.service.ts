import * as Yup from 'yup';
import fs from 'fs';
import ApiError from '../errors/api.error';

interface IRequest {
  currency: string;
  value: number;
}

class UpdateCurrencyService {
  constructor(private ok: boolean = false) { }

  async run({ currency, value }: IRequest): Promise<boolean | ApiError> {
    const currencyValidation = Yup.string()
      .oneOf(['BRL', 'EUR', 'CAD'])
      .required();

    const valueValidation = Yup.number()
      .moreThan(0)
      .required();

    if (!(await currencyValidation.isValid(currency)))
      throw new ApiError('Moeda Inválida');

    if (!(await valueValidation.isValidSync(value)))
      throw new ApiError('Valor Inválido');

    const content = JSON.parse(fs.readFileSync('src/currencies.json', 'utf8'));
    content[currency].rate = `${value}`;
    fs.writeFileSync('src/currencies.json', JSON.stringify(content));

    this.ok = true;

    return this.ok;
  }
}

export default new UpdateCurrencyService();
