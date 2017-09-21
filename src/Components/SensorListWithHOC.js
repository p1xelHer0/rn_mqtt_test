import React from "react";

import { ListView } from "react-native";
import { arrayOf, func, object } from "prop-types";

import Sensor from "../Components/Sensor";
import TingoBoxClientHOC from "../HOCs/TingoBoxClientHOC";

const propTypes = {
  items: arrayOf(object).isRequired,
  onPress: func.isRequired
};

const SensorList = ({ items, onPress }) => {
  const ds = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2
  });
  const dataSource = ds.cloneWithRows(items);

  return (
    <ListView
      enableEmptySections
      dataSource={dataSource}
      renderRow={item => (
        <Sensor
          {...item}
          key={item.deviceId}
          silenceSensor={onPress(item.deviceId)}
        />
      )}
    />
  );
};

SensorList.propTypes = propTypes;

// create the app by using the HOC
const App = TingoBoxClientHOC(SensorList);

export default App;
