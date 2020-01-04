import React from 'react';
import { StatusBar, Platform, View, Text } from 'react-native';
import * as Font from 'expo-font';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Stack } from 'react-native-router-flux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Scene } from 'react-native-router-flux';

import { Root, StyleProvider } from 'native-base';
import getTheme from '../../native-base-theme/components';
import theme from '../../native-base-theme/variables/commonColor';

import DefaultProps from './constants/navigation';

import SignUpContainer from '../containers/SignUp';
import SignUpComponent from './components/User/SignUp';

import LoginContainer from '../containers/Login';
import LoginComponent from './components/User/Login';

import ForgotPasswordContainer from '../containers/ForgotPassword';
import ForgotPasswordComponent from './components/User/ForgotPassword';

import UpdateProfileContainer from '../containers/UpdateProfile';
import UpdateProfileComponent from './components/User/UpdateProfile';

import MemberContainer from '../containers/Member';
import ProfileComponent from './components/User/Profile';

import Routes from './routes/index';
import Loading from './components/UI/Loading';

// Hide StatusBar on Android as it overlaps tabs
if (Platform.OS === 'android') StatusBar.setHidden(true);

export default class App extends React.Component {
  static propTypes = {
    store: PropTypes.shape({}).isRequired,
    persistor: PropTypes.shape({}).isRequired,
  };

  state = { loading: true };

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require('../../node_modules/native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('../../node_modules/native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('../../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
    });

    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const { store, persistor } = this.props;
    const userLoggedIn = true;
    if (loading) return <Loading />;

    return (
      <Root>
        <Provider store={store}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <StyleProvider style={getTheme(theme)}>
              <Router>
                <Stack key="root" hideNavBar>
                  {userLoggedIn ? (
                    <Stack key="root">{Routes}</Stack>
                  ) : (
                    <Stack
                      hideNavBar
                      key="profile"
                      title="PROFILE"
                      icon={() => (
                        <Icon name="contact" {...DefaultProps.icons} />
                      )}
                      {...DefaultProps.navbarProps}
                    >
                      <Scene
                        key="profileHome"
                        component={MemberContainer}
                        Layout={ProfileComponent}
                      />
                      <Scene
                        back
                        key="signUp"
                        title="SIGN UP"
                        {...DefaultProps.navbarProps}
                        component={SignUpContainer}
                        Layout={SignUpComponent}
                      />
                      <Scene
                        back
                        key="login"
                        title="LOGIN"
                        {...DefaultProps.navbarProps}
                        component={LoginContainer}
                        Layout={LoginComponent}
                      />
                      <Scene
                        back
                        key="forgotPassword"
                        title="FORGOT PASSWORD"
                        {...DefaultProps.navbarProps}
                        component={ForgotPasswordContainer}
                        Layout={ForgotPasswordComponent}
                      />
                      <Scene
                        back
                        key="updateProfile"
                        title="UPDATE PROFILE"
                        {...DefaultProps.navbarProps}
                        component={UpdateProfileContainer}
                        Layout={UpdateProfileComponent}
                      />
                    </Stack>
                  )}
                </Stack>
              </Router>
            </StyleProvider>
          </PersistGate>
        </Provider>
      </Root>
    );
  }
}
