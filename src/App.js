import React from "react";

import { View } from "react-native";

import SensorList from "./Components/SensorListWithHOC";
// import SensorList from "./Containers/SensorList";

import Header from "./Components/Header";

const App = () => (
  <View>
    <Header />
    <SensorList />
  </View>
);

export default App;
