import React from 'react';
import {StyleSheet, View} from 'react-native';
import Routes from './src/navigation/Routes';
import {Provider} from 'react-redux';
import {Store} from './src/redux/Store';

const App = () => {
  return (
    <View style={styles.container}>
      <Provider store={Store}>
        <Routes />
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
