export const formatDate = (date) => {
  const [year, month, day] = date.split('-');
  return `${month}/${day}/${year}`;
};
