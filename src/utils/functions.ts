/**
 * Convierte un objeto en una cadena de consulta para ser utilizado en una URL
 *
 * @param {object} params - El objeto a convertir
 * @returns {string} - La cadena de consulta resultante
 */
export function transformGetParams(params: Record<string, any>): string {
  const queryString = Object.keys(params)
    .map((key) => `${key}=${encodeURIComponent(JSON.stringify(params[key]))}`)
    .join('&');

  return queryString ? `?${queryString}` : '';
}

/**
 * Formatea una fecha en diferentes formatos.
 * @param {string} dateString - La cadena de fecha y hora en formato ISO8601.
 * @param {string} format - El formato deseado para la fecha. Puede ser 'Y-m-d H:i:s',
 * 'd/m/Y H:i:s', 'Y-m-d', 'd/m/Y' o 'H:i:s'.
 * @return {string} La fecha formateada en el formato especificado.
 */

export function formatDate(dateString: string | Date, format: string = 'd/m/Y'): string {
  const date = dateString instanceof Date ? dateString : new Date(dateString);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);

  switch (format) {
    case 'Y-m-d H:i:s':
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    case 'd/m/Y H:i:s':
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    case 'Y-m-d':
      return `${year}-${month}-${day}`;
    case 'd/m/Y':
      return `${day}/${month}/${year}`;
    case 'H:i:s':
      return `${hours}:${minutes}:${seconds}`;
    default:
      throw new Error(`Formato no válido: ${format}`);
  }
}

export function cloneObject(object: object) {
  return JSON.parse(JSON.stringify(object))
}

export const convertArrayToObject = (array: any, key: string = "_id") => {
  const initialValue = {};
  return array.reduce((obj: any, item: any) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};

export function isEmptyObject(obj: Object) {
  return (obj && (Object.keys(obj).length === 0));
}

export function daysBetweenDates(auxExitDate: Date, auxEntryDate: Date): number {
  const exitDate = new Date(auxExitDate);
  const entryDate = new Date(auxEntryDate);

  const diff = exitDate.getTime() - entryDate.getTime();
  return Math.floor(diff / 86400000);
}

export function formatNumber(x: number | string, opts: any = {}) {
  const formatNumber = Number(x).toLocaleString('es-ES', {
    minimumFractionDigits: opts.decimals || 2,
    maximumFractionDigits: opts.decimals || 2,
  });

  return formatNumber + (opts.currency || '');
}

export function getFullName(user: any) {
  return `${user?.firstname || ''} ${user?.lastname || ''}`;
}
