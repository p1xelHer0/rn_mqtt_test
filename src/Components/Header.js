import React from "react";

import styled from "styled-components/native";

const HeaderWrapper = styled.View`
  height: 70px;
  padding-top: 20;
`;

const HeaderText = styled.Text`
  font-size: 30;
  text-align: center;
`;

const Header = () => (
  <HeaderWrapper>
    <HeaderText>Tingco Box Test</HeaderText>
  </HeaderWrapper>
);

export default Header;
