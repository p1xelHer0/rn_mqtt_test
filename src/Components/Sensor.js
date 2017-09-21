import React from "react";

import { Text } from "react-native";
import { bool, func, number, string } from "prop-types";
import styled from "styled-components/native";

import Button from "./Button";

const propTypes = {
  deviceId: string.isRequired,
  deviceName: string,
  roomName: string,
  roomId: string,
  batteryLevel: number,
  alarmActive: bool,
  online: bool,
  silenceSensor: func,
  silenced: bool
};

const Sensor = ({
  alarmActive,
  batteryLevel,
  deviceName,
  roomName,
  silenceSensor,
  silenced,
  ...rest
}) => (
  <Wrapper alarmActive={alarmActive}>
    <TextWrapper>
      <Text>
        {roomName} - {deviceName}
      </Text>
      {alarmActive ? (
        <Text>Detecting smoke 🔥</Text>
      ) : (
        <Text>Everything is fine 👍</Text>
      )}
      <Text>🔋{batteryLevel}%</Text>
    </TextWrapper>
    {alarmActive && !silenced ? (
      <Button emoji="🔇" onPress={silenceSensor} />
    ) : null}
  </Wrapper>
);

// green is good
// res is bad
// blue is silence
const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 10;
  padding-left: 20;
  padding-top: 10;

  background: ${props =>
    props.silenced ? "blue" : props.alarmActive ? "red" : "green"};
`;

const TextWrapper = styled.View``;

Sensor.propTypes = propTypes;

export default Sensor;
