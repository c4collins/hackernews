import { sortBy } from 'lodash';

const DEFAULT_QUERY = 'ethereum';
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = 15;

const PATH_BASE = 'http://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

const FontAwesome = require('react-fontawesome');

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
};

export {
    DEFAULT_QUERY,
    DEFAULT_PAGE,
    DEFAULT_HPP,
    PATH_BASE,
    PATH_SEARCH,
    PARAM_SEARCH,
    PARAM_PAGE,
    PARAM_HPP,
    SORTS,
    FontAwesome
};