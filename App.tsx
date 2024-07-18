import React from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {RootStack} from './src/navigation/root_stack';
import {NavigationContainer} from '@react-navigation/native';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
