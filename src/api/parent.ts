import axios from 'axios';
import {ENDPOINTS} from '../../constants';

export const getParents = async () => {
  const {data} = await axios.get(ENDPOINTS.ROOT);
  console.log('data !!!!!');
  console.log(data);
};

export const getParentById = async (id: string) => {
  const {data} = await axios.get(`${ENDPOINTS.ROOT}/${id}`);
  console.log('getParentById data !!!!!');
  console.log(data);
};

export const deleteParentById = async (id: string) => {
  const {data} = await axios.delete(`${ENDPOINTS.ROOT}/${id}`);
  console.log('deleteParentById data !!!!!');
  console.log(data);
};

export const updateParentById = async (id: string) => {
  const {data} = await axios.put(`${ENDPOINTS.ROOT}/${id}`);
  console.log('updateParentById data !!!!!');
  console.log(data);
};

export const insertParent = async (newParent: any) => {
  const {data} = await axios.post(ENDPOINTS.ROOT, newParent);
  console.log('insertParent data !!!!!');
  console.log(data);
};
