module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // must be last on the list
    'react-native-reanimated/plugin',
  ],
};
