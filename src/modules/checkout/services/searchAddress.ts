type Address = {
  zipCode: string;
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
};

export const searchAddress = async (
  zipCode: string
): Promise<Address | null> => {
  try {
    const cleanZipCode = zipCode.replace(/\D/g, "");
    const response = await fetch(`/api/address/${cleanZipCode}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar endereço");
    }
    return response.json() as Promise<Address>;
  } catch {
    /* TODO: handle error */
    return null;
  }
};
