interface CurrencyLabelProps {
  currency: string;
  value: number;
  btcNumber: number;
  readOnly?: boolean;
};

function CurrencyLabel({ currency, value, btcNumber, readOnly = false }: CurrencyLabelProps) {
  return (
    <>
      <style jsx>
        {`
          .currency-label {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 0 10px;
          }

          .currency-price-input {
            text-align: center;
            height: 35px;
            width: 90px;
            margin: 10px 0;
            background-color: #C4C4C4;
            border: 1px solid #C4C4C4;
          }
        `}
      </style>

      <div className="currency-label">
        <label htmlFor={currency}>{currency}</label>
        <input type="text" value={value * btcNumber} name={currency} className="currency-price-input" readOnly />
      </div>
    </>
  );
}

export default CurrencyLabel;