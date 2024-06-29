import { queryHelpers, buildQueries } from '@testing-library/react';

// testing library utilities to find matching nodes for your query
const queryAllByItemProp = (...args) => {
  return queryHelpers.queryAllByAttribute('itemprop', ...args);
};

const getMultipleError = (c, itemPropValue) =>
  `Found multiple elements with the itemProp attribute of: ${itemPropValue}`;
const getMissingError = (c, itemPropValue) =>
  `Unable to find an element with the itemProp attribute of: ${itemPropValue}`;

const [
  queryByItemProp,
  getAllByItemProp,
  getByItemProp,
  findAllByItemProp,
  findByItemProp,
] = buildQueries(queryAllByItemProp, getMultipleError, getMissingError);

export {
  queryByItemProp,
  queryAllByItemProp,
  getByItemProp,
  getAllByItemProp,
  findAllByItemProp,
  findByItemProp,
};
