# rn_mqtt
### A sample React Native application using Mosquitto, Tingco Box MQTT Mock and React Native MQTT
### Simple "styling" with [styled components <💅>](https://www.styled-components.com/)
*Styling was not really the main focus of this, there are some sharp colors and emojis*


*This project has been ran on a iPhone 6 Emulator on macOS primarly*

[Mosquitto](https://mosquitto.org/)

[Tingco Box MQTT Mock](https://github.com/Tingcore/mqtt-mock)

[React Native MQTT Fork](https://github.com/Tingcore/react-native-mqtt)

This fork have been installed here in the project, just checked in with node_modules and everything... Not the best solution but it will work for now.

*I developed this with these versions of software*

Node version `8.4`

NPM version `5.3.0`

Yarn version `1.0.2`

*Notes:*

There seems to be some WebSocket error on Android, as soon as I use the MQTT Client, the app crashes

Refreshing the emulator seems to cause a crash as well, since (it seems) that componentWillUnmount, which disconnects the WebSocket is not being called upon refreshing


---

### How I ran this project locally

1. Start Mosquitto:

   I installed Mosquitto with Brew and it was not added to my path, so I'm running the following:

   `$ /usr/local/Cellar/mosquitto/1.4.14/sbin/mosquitto`

---

2. Start the Tingco Box MQTT Mock:

   Installation instruction can be found [here](https://github.com/Tingcore/mqtt-mock)

   `$ npm run start`

---

3. Add local IP to `localIPHere.js`

   The React-Native MQTT library needs you local IP to work

   Enter your local ip in the `localIPHere.js` file found in the project root

   Instruction of how to find your local IP is inside the file

---

4. Start React Native like normal
   4.1 Start packager
   `$ yarn run start`
   4.2 Start the project
   `$ react-native ios`

