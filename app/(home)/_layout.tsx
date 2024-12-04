import { Stack } from "expo-router";
import { useColorScheme, View } from "react-native";

export default function StackLayout() {
  const scheme = useColorScheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: scheme === "dark" ? "#000" : "white",
      }}
    >
      {/* Define all the screens here */}
      <Stack
        screenOptions={{
          gestureEnabled: true,
          animation: "slide_from_right",
          headerShown: true,
          statusBarBackgroundColor: scheme === "dark" ? "#000" : "white",
          statusBarStyle: scheme === "dark" ? "light" : "dark",
          headerStyle: {
            backgroundColor: scheme === "dark" ? "#000" : "white",
          },
          headerTintColor: scheme === "dark" ? "#fff" : "#000",
        }}
      >
        {/* Home Screen */}
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Home",
            headerShown: false,
          }}
        />
        {/* Product Detail Screen */}
        <Stack.Screen
          name="products/[url]"
          options={{
            headerShown: true,
            headerTitle: "Product",
            animation: "fade",
            gestureEnabled: true,
            presentation: "card",
          }}
        />
        {/* Minigame Screen */}
        <Stack.Screen
          name="games/index"
          options={{
            headerTitle: "",
            headerShown: true,
            animation: "fade",
            gestureEnabled: true,
          }}
        />
        {/* My Products Screen */}
        <Stack.Screen
          name="myProducts/index"
          options={{
            headerTitle: "My Products",
            animation: "fade",
          }}
        />
      </Stack>
    </View>
  );
}
