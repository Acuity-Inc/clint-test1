import {fireEvent, render, screen} from '@testing-library/react-native';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import {
  CONFIGURATIONS,
  DISPLAY_TEXT,
  ENDPOINTS,
  EVENTS,
  TEST_IDS,
} from '../constants';
import App from '../src/App';

jest.mock(
  '../node_modules/react-native/Libraries/EventEmitter/NativeEventEmitter',
);

const mock = new MockAdapter(axios);
mock.onGet(ENDPOINTS.ROOT).reply(200);
mock.onPost(ENDPOINTS.ROOT).reply(200);

const mockEVENTS = EVENTS;
const mockCONFIGURATIONS = CONFIGURATIONS;

let eventHandlers: {type: string; handler: Function}[] = [];
let mockNativeModule = {
  eventHandlers,
  addListener: (type: string, handler: Function) => {
    eventHandlers.push({type, handler});
  },
  removeAllListeners: (type: string) => {
    if (type) {
      eventHandlers = eventHandlers.filter(
        eventHandler => eventHandler.type !== type,
      );
    } else {
      eventHandlers = [];
    }
  },
};
const eventHandlerLookup = (type: string) =>
  eventHandlers.find(eventHandler => eventHandler.type === type);
jest.mock('@okta/okta-react-native', () => {
  return {
    EventEmitter: {
      addListener: (type: string, cb: Function) => {
        mockNativeModule.addListener(type, cb);
      },
      removeAllListeners: jest.fn(),
    },
    signInWithBrowser: () => {
      const eventHandler = eventHandlerLookup(mockEVENTS.SIGN_IN_SUCCESS);
      eventHandler?.handler({
        resolve_type: mockCONFIGURATIONS.AUTHORIZED,
      });
    },
    createConfig: () => {
      return Promise.resolve();
    },
  };
});
const Okta = require('@okta/okta-react-native');

global.fetch = jest
  .fn()
  .mockImplementation(() => {
    const promise = Promise.resolve({
      json: () => {
        return {
          user: [{foo: 'foo', bar: 'bar'}],
        };
      },
      ok: true,
    });
    return promise;
  })
  .mockImplementationOnce(() => {
    const promise = Promise.resolve({
      json: () => {
        return {
          // eslint-disable-next-line camelcase
          userinfo_endpoint: 'dummy_endpoint',
        };
      },
      ok: true,
    });
    return promise;
  });

describe('<App />', () => {
  it('Login and Logout buttons update status message"', async () => {
    render(<App />);
    expect(screen.getByText(DISPLAY_TEXT.TITLE)).toBeDefined();
    const loginButton = screen.getByTestId(TEST_IDS.LOGIN_BUTTON);
    fireEvent.press(loginButton);
    expect(screen.findByText(DISPLAY_TEXT.LOGGED_IN)).toBeDefined();
    const checkAuth = screen.getByTestId(TEST_IDS.CHECK_TOKEN_BUTTON);
    fireEvent.press(checkAuth);
    screen.debug();
    const logoutButton = screen.getByTestId(TEST_IDS.LOGOUT_BUTTON);
    fireEvent.press(logoutButton);
    expect(screen.findByText(DISPLAY_TEXT.LOGGED_OUT)).toBeDefined();
  });
  it('Does not set isAuthenticated to true if the resolved_type does not have a value of authorized', async () => {
    Okta.signInWithBrowser = jest.fn(() => {
      const eventHandler = eventHandlerLookup(mockEVENTS.SIGN_IN_SUCCESS);
      eventHandler?.handler({resolve_type: mockCONFIGURATIONS.ERROR});
    });
    render(<App />);
    expect(screen.getByText(DISPLAY_TEXT.TITLE)).toBeDefined();
    const loginButton = screen.getByTestId(TEST_IDS.LOGIN_BUTTON);
    fireEvent.press(loginButton);
  });
  it(`calls the event handler for ${mockEVENTS.ON_ERROR} if there is an error thrown on signInWithBrowser()`, async () => {
    Okta.signInWithBrowser = jest.fn(() => {
      const eventHandler = eventHandlerLookup(mockEVENTS.ON_ERROR);
      eventHandler?.handler({error_message: 'Error: Server process timedout.'});
    });
    render(<App />);
    expect(screen.getByText(DISPLAY_TEXT.TITLE)).toBeDefined();
    const loginButton = screen.getByTestId(TEST_IDS.LOGIN_BUTTON);
    fireEvent.press(loginButton);
  });
  it(`calls the event handler for ${mockEVENTS.ON_CANCELLED} if the request gets cancelled.`, async () => {
    Okta.signInWithBrowser = jest.fn(() => {
      const eventHandler = eventHandlerLookup(mockEVENTS.ON_CANCELLED);
      eventHandler?.handler('Request was cancelled.');
    });
    render(<App />);
    expect(screen.getByText(DISPLAY_TEXT.TITLE)).toBeDefined();
    const loginButton = screen.getByTestId(TEST_IDS.LOGIN_BUTTON);
    fireEvent.press(loginButton);
  });
});
