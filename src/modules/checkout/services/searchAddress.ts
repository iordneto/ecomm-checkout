export const searchAddress = async (zipCode: string) => {
  console.log("searchAddress", zipCode);

  return {
    country: "Brasil",
    state: "SP",
    city: "São Paulo",
    neighborhood: "Jardim Paulista",
    street: "Avenida Paulista",
    service: "busca-cep",
    status: 200,
  };
};
