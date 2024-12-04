import { Tabs } from "expo-router";
import { store, persistor } from "@/redux";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import React from "react";
import { ActivityIndicator, Platform, View } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

const queryClient = new QueryClient();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // Define main layout
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate
          persistor={persistor}
          loading={
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" />
            </View>
          }
        >
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
              headerShown: false,
              tabBarButton: HapticTab,
              tabBarBackground: TabBarBackground,
              tabBarStyle: Platform.select({
                ios: {
                  // Use a transparent background on iOS to show the blur effect
                  position: "absolute",
                },
                default: {},
              }),
            }}
          >
            <Tabs.Screen name="index" options={{ href: null }} />
            <Tabs.Screen
              name="(home)"
              options={{
                tabBarStyle: { display: "none" },
                title: "Home",
                animation: "shift",
              }}
            />
          </Tabs>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}
