import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SFTabBarIcon } from "@/components/navigation/SFTabBarIcon";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        unmountOnBlur: true,
      }}
    >
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, focused }) => (
            <SFTabBarIcon
              name={focused ? "clock.fill" : "clock"}
              tintColor={focused ? "#007AFF" : "8E8E93"}
            />
          ),
          unmountOnBlur: true,
        }}
      />

      <Tabs.Screen
        name="exercises"
        options={{
          title: "Exercises",
          tabBarIcon: ({ color, focused }) => (
            <SFTabBarIcon name={"figure.run"} tintColor={focused ? "#007AFF" : "8E8E93"} />
          ),
          unmountOnBlur: true,
        }}
      />
    </Tabs>
  );
}
