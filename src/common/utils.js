const missingFields = (fields, body) => {
  const missing = [];
  for (const field of fields) {
    if (!body[field]) {
      missing.push(field);
    }
  }
  return missing;
};

module.exports = {
    missingFields,
};