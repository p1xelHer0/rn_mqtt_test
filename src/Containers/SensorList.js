import React, { Component } from "react";

import mqtt from "react-native-mqtt";
import styled from "styled-components/native";

import Sensor from "../Components/Sensor";
import localIp from "../../localIPHere";

/*

  We would like to see a view that lists which smoke sensors that are connected to the Tingco Box
  We want to see something indicating that a sensor is detecting smoke
  We also want you to create the possibility for the user to silence an ongoing alarm

  NOTE: THIS IS HOW I STARTED OUT, A SINGLE COMPONENT WHICH HANDLES EVERYTHING
  I PROCEEDED TO EXTRACT THIS MQTT FUNCTIONALITY AS A HIGHER ORDER COMPONENT
  AND IMPLEMENTED THE LIST AS A REACT NATIVE ListView INSTEAD

  THIS FILE IS ACTUALLY NOT USED AT THE MOMENT

*/

class SensorList extends Component {
  state = {
    activities: [],
    sensors: []
  };

  canSendMessage = () => this.isConnected && this.client;

  componentDidMount() {
    // simple variable to check if we are connected to the Tingco Box
    this.isConnected = false;

    this.statusTopic =
      "user/device/00000000-0000-0000-0000-000000000007/fire/status";

    this.commandTopic =
      "user/device/00000000-0000-0000-0000-000000000007/fire/command";

    const clientOptions = {
      port: 1883,
      auth: false,
      keepalive: 45,
      tls: false,
      selfSignedCertificates: false,
      host: localIp,
      clientId: "test"
    };

    mqtt
      .createClient(clientOptions)
      .then(client => {
        client.on("closed", () => {
          console.log("mqtt.event.closed");
          this.isConnected = false;
        });

        client.on("error", msg => {
          // in a production app this should be handled better
          console.log("mqtt.event.error", msg);
        });

        client.on("message", msg => {
          const parsed = JSON.parse(msg.data);
          const { sensors = [] } = parsed;

          // this might be naive, but for our app we are only recieving one
          // kind of message: the retained message from the Tingco Box
          // and the update we get when visiting we force ourselves by vising
          // http://localhost:5000/fire/alarm/abc123 from our browser
          // each message contains the full state of the devices, we can just
          // override our state each time
          //
          // otherwise this would have to be something that does different things
          // for different topics
          //
          // I guess we could be getting activites sent, which is updates
          // of part of the state. I'd probably do something that looks like
          // a redux-reducer then :)
          //
          // other cool things would be something like a stream

          this.setState(() => ({
            sensors
          }));
        });

        client.on("connect", () => {
          this.client = client;
          client.subscribe(this.statusTopic, 0);
          this.isConnected = true;
        });

        client.connect();
      })
      .catch(error => {
        // in a production app this should be handled better
        // but it's getting late
        console.log(error);
      });
  }

  // disconnect gracefully
  // it seems this isn't fired upon reloading the emulator
  // therefore the component will try to connect again, while already connected
  // which results in a crash...
  componentWillUnmount() {
    if (this.canSendMessage) {
      // I don't even know if this was specified in the API...
      this.client.disconnect();
    }
  }

  // callback used by each <Sensor> component
  silenceSensor = id => () => {
    // we need to be connect to publish
    if (this.canSendMessage) {
      const message = JSON.stringify({
        command: "SITUATION_UNDER_CONTROLL",
        username: "Pontus Nagy"
      });
      this.client.publish(this.commandTopic, message, 0, 0);
    } else {
      console.log("Not connected");
    }
  };

  render() {
    return (
      <ListWrapper>
        {this.state.sensors.map(sensor => (
          <Sensor
            {...sensor}
            key={sensor.deviceId}
            silenceSensor={this.silenceSensor(sensor.deviceId)}
          />
        ))}
      </ListWrapper>
    );
  }
}

const ListWrapper = styled.View`height: 150;`;

export default SensorList;
