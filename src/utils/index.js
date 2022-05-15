const asPOJO = (obj) => JSON.parse(JSON.stringify(obj));

const renameField = (record, from, to) => {
  record[to] = record[from];
  delete record[from];
  return record;
};

const removeField = (record, field) => {
  const value = record[field];
  delete record[field];
  return value;
};

// Nueva fecha
const getDate = () => {
  const date = new Date();
  let dateOK =
    date.getFullYear() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getDate() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();
  return dateOK;
};

module.exports = { asPOJO, removeField, renameField, getDate };
