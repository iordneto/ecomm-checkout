/**
 * Validações utilizadas no projeto
 */

/**
 * Valida se um CPF é válido
 * @param cpf - CPF com ou sem formatação
 * @returns true se o CPF for válido
 */
export const isValidCPF = (cpf: string): boolean => {
  // Remove caracteres não numéricos
  const cleanCPF = cpf.replace(/\D/g, "");

  // Verifica se tem 11 dígitos
  if (cleanCPF.length !== 11) return false;

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

  // Valida os dígitos verificadores
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.charAt(10))) return false;

  return true;
};

/**
 * Valida se um CNPJ é válido
 * @param cnpj - CNPJ com ou sem formatação
 * @returns true se o CNPJ for válido
 */
export const isValidCNPJ = (cnpj: string): boolean => {
  // Remove caracteres não numéricos
  const cleanCNPJ = cnpj.replace(/\D/g, "");

  // Verifica se tem 14 dígitos
  if (cleanCNPJ.length !== 14) return false;

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false;

  // Valida primeiro dígito verificador
  let sum = 0;
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleanCNPJ.charAt(i)) * weights1[i];
  }
  let remainder = sum % 11;
  const digit1 = remainder < 2 ? 0 : 11 - remainder;
  if (digit1 !== parseInt(cleanCNPJ.charAt(12))) return false;

  // Valida segundo dígito verificador
  sum = 0;
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cleanCNPJ.charAt(i)) * weights2[i];
  }
  remainder = sum % 11;
  const digit2 = remainder < 2 ? 0 : 11 - remainder;
  if (digit2 !== parseInt(cleanCNPJ.charAt(13))) return false;

  return true;
};

/**
 * Valida se um documento é um CPF ou CNPJ válido
 * @param document - CPF ou CNPJ com ou sem formatação
 * @returns true se o documento for válido
 */
export const isValidCPForCNPJ = (document: string): boolean => {
  const cleanDocument = document.replace(/\D/g, "");

  if (cleanDocument.length === 11) {
    return isValidCPF(document);
  } else if (cleanDocument.length === 14) {
    return isValidCNPJ(document);
  }

  return false;
};

/**
 * Valida se um CEP brasileiro é válido
 * @param cep - CEP com ou sem formatação
 * @returns true se o CEP for válido
 */
export const isValidCEP = (cep: string): boolean => {
  const cleanCEP = cep.replace(/\D/g, "");
  return /^[0-9]{8}$/.test(cleanCEP);
};

/**
 * Valida se um telefone brasileiro é válido
 * @param phone - Telefone com ou sem formatação
 * @returns true se o telefone for válido
 */
export const isValidBrazilianPhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\D/g, "");
  // Aceita telefone fixo (10 dígitos) ou celular (11 dígitos) com DDD
  return /^[1-9]{2}[2-9][0-9]{7,8}$/.test(cleanPhone);
};
