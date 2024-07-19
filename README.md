# ISW Assessment

A mobile app for a user to log into and view his bank accounts

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) installed on your development machine.
- [npm](https://www.npmjs.com/) or [Yarn](https://classic.yarnpkg.com/en/) package manager installed.
- [React Native CLI](https://reactnative.dev/docs/environment-setup) configured on your system.
- Xcode (for macOS) or Android Studio (for Android development) installed for the respective platform.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/KanmaChizea/Assessment
```

2. Change into the app's directory:

```bash
cd Assessment
```

3. Install project dependencies:

```bash
yarn install
```

## Running the app

#### Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using Yarn
yarn start
```

#### Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
#  using Yarn
yarn android
```

### For iOS

```bash
# using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.
