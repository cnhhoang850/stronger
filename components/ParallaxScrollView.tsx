import type { PropsWithChildren, ReactElement } from "react";
import {
  View,
  StyleSheet,
  useColorScheme,
  ScrollView,
  Dimensions,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { useTheme } from "react-native-paper";

import { ThemedView } from "@/components/ThemedView";

const HEADER_HEIGHT = 280;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

const { width } = Dimensions.get("window");

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const theme = useTheme();

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1],
          ),
        },
      ],
      opacity: interpolate(
        scrollOffset.value,
        [0, HEADER_HEIGHT / 2, HEADER_HEIGHT],
        [0.9, 0.5, 0],
      ),
    };
  });

  const contentAnimatedStyle = useAnimatedStyle(() => {
    return {
      marginHorizontal: interpolate(
        scrollOffset.value,
        [HEADER_HEIGHT / 3, HEADER_HEIGHT / 2, HEADER_HEIGHT],
        [8, 4, 0],
        "clamp",
      ),
    };
  });

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.parallaxBackground }}>
      <Animated.ScrollView
        contentInsetAdjustmentBehavior="automatic"
        ref={scrollRef}
        scrollEventThrottle={16}
      >
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: "#fff" },
            headerAnimatedStyle,
          ]}
        >
          {headerImage}
        </Animated.View>
        <Animated.View
          style={[
            styles.content,
            contentAnimatedStyle,
            { backgroundColor: headerBackgroundColor[colorScheme] },
          ]}
        >
          {children}
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 280,
    padding: 0,
  },
  content: {
    height: "100%",
    flex: 1,
    padding: 24,
    gap: 16,
    overflow: "hidden",
    paddingTop: 32,
    borderTopLeftRadius: 24,
    borderTopEndRadius: 24,
    backgroundColor: "#000",
  },
});
