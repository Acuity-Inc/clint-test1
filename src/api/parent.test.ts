import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {ENDPOINTS} from '../../constants';
import {
  deleteParentById,
  getParentById,
  getParents,
  insertParent,
  updateParentById,
} from './parent';

// Mock out all top level functions, such as get, put, delete and post:
const mock = new MockAdapter(axios);

const mockParent = {
  parentName: 'Test',
  intField: 1,
  doubleField: 1.0,
  dateField: '2005-03-13',
  stringField: 'My test string',
  booleanField: true,
};

mock.onGet(ENDPOINTS.ROOT).reply(200);
mock.onPost(ENDPOINTS.ROOT, mockParent).reply(200, mockParent);
mock.onPut(ENDPOINTS.ROOT + '/testID').reply(200, mockParent);
mock.onDelete(ENDPOINTS.ROOT + '/testID').reply(200, mockParent);
mock.onGet(ENDPOINTS.ROOT + '/testID').reply(200, mockParent);

test('getParents', () => {
  getParents();
});

test('getParentById', () => {
  getParentById('testID');
});

test('deleteParentById', () => {
  deleteParentById('testID');
});

test('updateParentById', () => {
  updateParentById('testID');
});

test('insertParent', () => {
  insertParent({
    parentName: 'Test',
    intField: 1,
    doubleField: 1.0,
    dateField: '2005-03-13',
    stringField: 'My test string',
    booleanField: true,
  });
});
