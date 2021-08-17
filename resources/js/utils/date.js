/**
 * formate the given date
 *
 * @param {Date} date
 * @returns {String}
 */
export const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-gb").split("/").reverse().join("-");
