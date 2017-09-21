import React from "react";

import { func, string } from "prop-types";
import { Platform } from "react-native";
import styled from "styled-components/native";

const propTypes = {
  emoji: string,
  onPress: func.isRequired
};

// a simple wrapper for a button on both iOS and Android
const Button = ({ onPress, emoji }) => (
  <Wrapper onPress={onPress}>
    <View>
      <EmojiContainer>{emoji}</EmojiContainer>
    </View>
  </Wrapper>
);

const WrapperStyle = `width: 50; height: 50`;

const Wrapper =
  Platform.OS === "android"
    ? styled.TouchableNativeFeedback`
        ${WrapperStyle};
      `
    : styled.TouchableHighlight`
        ${WrapperStyle};
      `;

const View = styled.View`
  ${WrapperStyle};
`;

const EmojiContainer = styled.Text`font-size: 40; text-align: center;`;

Button.propTypes = propTypes;

export default Button;
