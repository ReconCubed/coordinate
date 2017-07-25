# coordinate
##### In Progress
### Summary
This application will be a React Native application (iOS/Android) which allows a user to share his/her location with a group of friends with the goal of meeting up. I have build the backend, and am currently building the front-end for this application.

#### Concepts Implemented
###### Friends:
- Send/accept/deny a friend request
- View all friends and information
- Remove a friend
- Search for a user

###### Groups:
- Create a group
- Add members to a group
- Join/leave a group
- View all accepted/pending members of a group

###### Location:
- Get a user's location
- Update a user's location/render on map

###### Notifications
- Display new notification to user after an event (i.e. friend request, group request)
- View and act upon pending notifications


### Architecture
##### Client Side
- React Native
- Apollo/GraphQL
- Firebase (auth only)
- Google Maps API
- Material UI Style

##### Authentication
- Firebase: user will authenticate directly with firebase and then will pass his/her token to the server with every data request. The client will never directly query Firebase for data.

##### Database
- Firebase Realtime Database: All data will be accessed from the server side via the NodeJS Admin SDK

##### Server
- NodeJS
- Express
- GraphQL: All requests from the client side to the server (including requests for data, user data mutations, and requests for third party APIs) will be passed through a GraphQL abstraction layer
- ElasticSearch: will be implemented if scalability becomes an issue.
- Google cloud engine