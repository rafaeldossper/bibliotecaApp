import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./Stack";

export default function() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
