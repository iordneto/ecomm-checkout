/**
 * Validations used in the project
 */

/**
 * Validates if a CPF is valid
 * @param cpf - CPF with or without formatting
 * @returns true if the CPF is valid
 */
export const isValidCPF = (cpf: string): boolean => {
  // Remove non-numeric characters
  const cleanCPF = cpf.replace(/\D/g, "");

  // Check if it has 11 digits
  if (cleanCPF.length !== 11) return false;

  // Check if all digits are the same
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

  // Validate check digits
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
 * Validates if a CNPJ is valid
 * @param cnpj - CNPJ with or without formatting
 * @returns true if the CNPJ is valid
 */
export const isValidCNPJ = (cnpj: string): boolean => {
  // Remove non-numeric characters
  const cleanCNPJ = cnpj.replace(/\D/g, "");

  // Check if it has 14 digits
  if (cleanCNPJ.length !== 14) return false;

  // Check if all digits are the same
  if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false;

  // Validate first check digit
  let sum = 0;
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleanCNPJ.charAt(i)) * weights1[i];
  }
  let remainder = sum % 11;
  const digit1 = remainder < 2 ? 0 : 11 - remainder;
  if (digit1 !== parseInt(cleanCNPJ.charAt(12))) return false;

  // Validate second check digit
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
 * Validates if a document is a valid CPF or CNPJ
 * @param document - CPF or CNPJ with or without formatting
 * @returns true if the document is valid
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
 * Validates if a Brazilian ZIP code is valid
 * @param cep - ZIP code with or without formatting
 * @returns true if the ZIP code is valid
 */
export const isValidCEP = (cep: string): boolean => {
  const cleanCEP = cep.replace(/\D/g, "");
  return /^[0-9]{8}$/.test(cleanCEP);
};

/**
 * Validates if a Brazilian phone number is valid
 * @param phone - Phone number with or without formatting
 * @returns true if the phone number is valid
 */
export const isValidBrazilianPhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\D/g, "");
  // Accepts landline (10 digits) or mobile (11 digits) with area code
  return /^[1-9]{2}[2-9][0-9]{7,8}$/.test(cleanPhone);
};
