# techchallenge-template-react-native

React Native Mobile App template

## Getting Started

### Prerequisites

- macOS
- [Xcode with CLI tools](https://www.freecodecamp.org/news/install-xcode-command-line-tools/)
- [Node](https://treehouse.github.io/installation-guides/mac/node-mac.html)
- [Watchman](https://formulae.brew.sh/formula/watchman)

### Configure Carthage

```
brew install carthage
cd ios
carthage update --use-xcframeworks
```

### How to contribute to Acuity Repos

- Please follow branch naming conventions described in [Development Best Practices](https://acuity-inc.atlassian.net/wiki/spaces/TCS1/pages/1993113601/Development+Best+Practices)
- Commit conventions as described in [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)

### Installing

```
npm install
npx pod-install
npm run ios
```

This will install dependencies and run the application in the iOS simulator.

If you want to simulate a different device/iOS than the default (for older versions of iPhone models), you can pass a flag:

```
npm run ios -- --simulator "iPhone 8"
```

See the [React Native CLI](https://github.com/react-native-community/cli/blob/master/docs/commands.md#--simulator-simulator_name) docs for more info.

## Running the Application

1. Open `ios/techchallengetemplate.xcworkspace` in Xcode
2. In the navbar, Xcode > Preferences > Accounts and add your Apple ID
3. In the left-hand file explorer, select the techchallengetemplate project
4. Next to the run button, select the techchallengetemplate build scheme and `<your device name>` for the scheme and run the application
5. Xcode should build the application and load it to your iPhone

## Testing the Application

Run unit tests:

```
npm test
```

Run code coverage and analyze project:

```
npm run coverage
```

## Application Features

### Okta Integration for Authorization

The configuration for Okta is specified in `constants.ts`, (which will be replaced later with a system using environment variables). In order to use your own Okta configuration, the following variables will need to be updated as needed:
| Variable | Description |
| -------- | ------- |
| CONFIGURATIONS.CLIENT_ID | Client ID of your Application. You can copy it from the Okta Admin Console for your specific application |
| CONFIGURATIONS.REDIRECT_URI | Okta sends the authentication response and ID token for the user's sign-in request to these URIs. |
| CONFIGURATIONS.DISCOVERY_URI | Include a URI to have Okta initiate the sign-in flow. When Okta redirects to this endpoint, the client is triggered to send an authorize request. |
| CONFIGURATIONS.END_SESSION_REDIRECT_URI | After your application contacts Okta to close the user session, Okta redirects the user to one of these URIs. Must not be the same as REDIRECT_URI, otherwise Android will throw an error on signOut |

### Backend Integration for CRUD Operations

## Development Design Practices
