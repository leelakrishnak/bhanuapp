import axios from 'axios';
const SERVER = 'http://localhost:5002/api';

export function getAllFiles(args) {
  return axios.get(`${SERVER}/listfiles`, {
    params: args,
  });
}
