/*
 * Copyright (c) 2019-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 


🚨🚨🚨🚨🚨🚨 oktaIsAuthenticated() returns {authenticated: false} even though we get an access token.
*/

import {
  EventEmitter,
  createConfig,
  signInWithBrowser,
} from '@okta/okta-react-native';
import axios from 'axios';
import React, {Fragment, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Button, Text, useTheme} from 'react-native-paper';
import {
  CONFIGURATIONS,
  CONTROL_TITLES,
  DISPLAY_TEXT,
  EVENTS,
  TEST_IDS,
} from '../constants';
import AppStyles from './App.styles';
import {getParents, insertParent} from './api/parent';

const callAPI = async () => {
  await insertParent({
    parentName: 'Test',
    intField: 1,
    doubleField: 1.0,
    dateField: '2005-03-13',
    stringField: 'My test string',
    booleanField: true,
  });
  await getParents();
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [context, setContext] = useState('');
  const theme = useTheme();
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    async function init() {
      await initAuth();
    }
    init();
    return () => {
      EventEmitter.removeAllListeners(EVENTS.SIGN_IN_SUCCESS);
      EventEmitter.removeAllListeners(EVENTS.ON_ERROR);
      EventEmitter.removeAllListeners(EVENTS.ON_CANCELLED);
    };
  }, []);

  useEffect(() => {
    // add bearer token to axios header after user obtains token from okta login:
    if (authToken) {
      axios.defaults.headers.common.Authorization = 'Bearer ' + authToken;
      callAPI();
    }
  }, [authToken]);

  const initAuth = async () => {
    EventEmitter.addListener(EVENTS.SIGN_IN_SUCCESS, function (res) {
      if (res.resolve_type === CONFIGURATIONS.AUTHORIZED) {
        setIsAuthenticated(true);
        setContext(DISPLAY_TEXT.LOGGED_IN);
        setAuthToken(res.access_token);
        callAPI();
      }
    });
    EventEmitter.addListener(EVENTS.ON_ERROR, function (error) {
      console.log('onError()');
      console.warn(error);
      setContext(error.error_message);
    });
    EventEmitter.addListener(EVENTS.ON_CANCELLED, function (error) {
      console.log('onCancelled()');
      console.warn(error);
    });

    await createConfig({
      clientId: CONFIGURATIONS.CLIENT_ID,
      redirectUri: CONFIGURATIONS.REDIRECT_URI,
      endSessionRedirectUri: CONFIGURATIONS.END_SESSION_REDIRECT_URI,
      discoveryUri: CONFIGURATIONS.DISCOVERY_URI,
      scopes: [
        CONFIGURATIONS.OPEN_ID,
        CONFIGURATIONS.PROFILE,
        CONFIGURATIONS.OFFLINE_ACCESS,
      ],
      requireHardwareBackedKeyStore: false,
    });
  };

  const login = async () => {
    await signInWithBrowser();
  };
  const styles = AppStyles(theme);

  const logout = async () => {
    //temporarily doing this here until real logout method is working:
    setIsAuthenticated(false);
    setAuthToken('');
    setContext(DISPLAY_TEXT.LOGGED_OUT);
  };

  return (
    <Fragment>
      <SafeAreaView style={styles.container}>
        <Text
          variant="headlineLarge"
          testID={TEST_IDS.TITLE_LABEL}
          style={styles.title}>
          {DISPLAY_TEXT.TITLE}
        </Text>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollview}>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              {isAuthenticated ? (
                <Button
                  textColor={theme.colors.background}
                  style={styles.button}
                  mode="contained"
                  testID={TEST_IDS.LOGOUT_BUTTON}
                  onPress={async () => {
                    logout();
                  }}>
                  {CONTROL_TITLES.LOGOUT}
                </Button>
              ) : (
                <Button
                  textColor={theme.colors.background}
                  style={styles.button}
                  mode="contained"
                  testID={TEST_IDS.LOGIN_BUTTON}
                  onPress={async () => login()}>
                  {CONTROL_TITLES.LOGIN}
                </Button>
              )}
              <Button
                textColor={theme.colors.background}
                mode="contained"
                testID={TEST_IDS.CHECK_TOKEN_BUTTON}
                onPress={async () => {
                  console.log(authToken);
                }}>
                {CONTROL_TITLES.CHECK_TOKEN}
              </Button>
            </View>
            <Text
              testID={TEST_IDS.DESCRIPTION_BOX}
              variant="bodyLarge"
              style={styles.text}>
              {context}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

export default App;
