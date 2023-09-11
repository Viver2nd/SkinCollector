// API modules are where the code lives to communicate
// with the server via AJAX
import sendRequest from './send-request';
const BASE_URL = '/api/items';

export function getAll() {
  return sendRequest(BASE_URL);
}

// This function is never actually used
export function getById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}