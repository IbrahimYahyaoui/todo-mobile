import { Stack, Tabs } from "expo-router";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { TaskContextProvider } from "../Context/TaskContext";
const _layout = () => {
  return (
    <TaskContextProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color, size }) => {
              return <FontAwesome name={"list"} size={size} color={color} />;
            },
            title: "Tasks",
          }}
        />
        <Tabs.Screen
          name="Archived"
          options={{
            tabBarIcon: ({ color, size }) => {
              return <FontAwesome name={"archive"} size={size} color={color} />;
            },
            title: "Archived",
          }}
        />
        <Tabs.Screen
          name="Done"
          options={{
            tabBarIcon: ({ color, size }) => {
              return <FontAwesome name={"check"} size={size} color={color} />;
            },
            title: "Done",
          }}
        />
      </Tabs>
    </TaskContextProvider>
  );
};

export default _layout;
