/**
 *  A type-safe utility function for retrieving the values of a record.
 * @template T - The type of the values in the record
 * @param {Record<string, T>} obj - The record values
 * @returns {T[]} - An array of the record values typed as T[]
 */
export function recordValues<T>(obj: Record<string, T>): T[] {
  return Object.values(obj);
}
