export const formatCurrency = (price) => {
  price = price.toLocaleString("it-IT", { style: "currency", currency: "VND" });
  return price;
};
