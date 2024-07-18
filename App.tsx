import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {RootStack} from './src/navigation/root_stack';
import {NavigationContainer} from '@react-navigation/native';
import {ModalProvider, ModalRoot} from './src/redux/providers/modal';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ModalProvider>
          <RootStack />
          <ModalRoot />
        </ModalProvider>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
