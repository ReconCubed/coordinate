# coordinate
##### In Progress
### Summary
This application will be a React Native application (iOS/Android) which allows a user to share his/her location with a group of friends with the goal of meeting up. I am currently building the back-end for this application.

### Architecture
##### Client Side
- React Native
- Apollo/GraphQL
- Firebase (auth only)
- Google Maps API
- Material UI

##### Authentication
- Firebase: user will authenticate directly with firebase and then will pass his/her token to the server with every data request. The client will never directly query Firebase for data.

##### Database
- Firebase Realtime Database: All data will be accessed from the server side via the NodeJS Admin SDK

##### Server
- NodeJS
- Express
- GraphQL: All requests from the client side to the server (including requests for data, user data mutations, and requests for third party APIs) will be passed through a GraphQL abstraction layer