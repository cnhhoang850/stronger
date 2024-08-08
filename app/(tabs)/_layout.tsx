import { Tabs } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SFTabBarIcon } from "@/components/navigation/SFTabBarIcon";
import { useNavigation } from "@react-navigation/native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const TAB_BAR_HEIGHT = 89;
  return (
    <Tabs
      screenOptions={{
        //tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        unmountOnBlur: true,
        tabBarStyle: {
          height: TAB_BAR_HEIGHT,
          shadowColor: "black",
          shadowOffset: {
            width: 10,
            height: 10,
          },
          shadowOpacity: 0.5,
          shadowRadius: 6,
        },
        tabBarLabelStyle: {
          marginBottom: 4,
        },
        tabBarItemStyle: {
          marginTop: 8,
        },
        headerShadowVisible: true,
        headerTransparent: true,
      }}
    >
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, focused }) => (
            <SFTabBarIcon name={focused ? "clock.fill" : "clock"} color={focused ? "#007AFF" : "gray"} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <SFTabBarIcon name={focused ? "house.fill" : "house"} color={focused ? "#007AFF" : "gray"} />
          ),
          unmountOnBlur: true,
        }}
      />

      <Tabs.Screen
        name="exercises"
        options={{
          title: "Exercises",
          tabBarIcon: ({ color, focused }) => (
            <SFTabBarIcon name={"figure.run"} color={focused ? "#007AFF" : "gray"} />
          ),
          unmountOnBlur: true,
        }}
      />
    </Tabs>
  );
}
