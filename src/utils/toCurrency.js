const toCurrency = (amount) => {
  let price = (amount * 1).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return price;
};

export default toCurrency;
