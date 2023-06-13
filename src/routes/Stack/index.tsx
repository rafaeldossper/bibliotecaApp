import React from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


import Home from "../../screens/Home"
import List from "../../screens/List"
import Search from "../../screens/Search"
import Livro from "../../screens/Livro"

const Tab = createMaterialBottomTabNavigator();

export default function() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Lista" component={List} />
        <Tab.Screen name="Busca" component={Search} />
        <Tab.Screen name="Livro" component={Livro} />
      </Tab.Navigator>
    );
  }