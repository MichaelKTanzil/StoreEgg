import ProductList from "@/components/ProductList";
import SearchBar from "@/components/SearchBar";
import { useSelector } from "react-redux";
import { selectCoin } from "@/redux/coinSlice";
import { useRef, useEffect } from "react";

import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  BackHandler,
  useColorScheme,
} from "react-native";

import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useSegments, useRouter } from "expo-router";
import ExitModal from "@/components/ExitModal";

export default function HomeScreen() {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [isExitModalVisible, setIsExitModalVisible] = useState(false);

  const coins = useSelector(selectCoin);
  const rotation = useRef(new Animated.Value(0)).current;

  const segments = useSegments();
  const router = useRouter();

  const scheme = useColorScheme();

  // Animation for minigame button
  useEffect(() => {
    const animateRotation = () => {
      Animated.sequence([
        Animated.timing(rotation, {
          toValue: 1,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(rotation, {
          toValue: -1,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(rotation, {
          toValue: 0,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.delay(3000),
      ]).start(() => {
        setTimeout(animateRotation, 0);
      });
    };

    animateRotation();
  }, [rotation]);

  // Range of rotation
  const rotateInterpolation = rotation.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-10deg", "10deg"],
  });

  // Exit Modal on back button
  useEffect(() => {
    const backAction = () => {
      if (segments.length === 1 && segments[0] === "(home)") {
        setIsExitModalVisible(true);
        return true;
      } else {
        router.back();
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [segments, router]);

  const handleCancel = () => {
    setIsExitModalVisible(false);
  };
  const handleExitApp = () => {
    setIsExitModalVisible(false);
    BackHandler.exitApp();
  };

  return (
    <SafeAreaView
      style={[
        { flex: 1 },
        scheme === "dark" ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      {/* Exit Modal */}
      <ExitModal
        isExitModalVisible={isExitModalVisible}
        handleCancel={handleCancel}
        handleExitApp={handleExitApp}
      />
      <View
        style={[
          styles.container,
          scheme === "dark" ? styles.darkContainer : styles.lightContainer,
        ]}
      >
        {/* Search Bar */}
        <SearchBar
          clicked={clicked}
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          setClicked={setClicked}
        />

        {/* Button & Coin */}
        <View style={styles.rowContainer}>
          <LinearGradient
            colors={
              scheme === "dark"
                ? ["#320088", "#300080"]
                : ["#2671e0", "#1e5cb8"]
            }
            style={{ borderRadius: 10, height: 40, width: 150 }}
          >
            <TouchableOpacity style={styles.productButton}>
              <Link href="/myProducts">
                <Text style={styles.productButtonText}>My Products</Text>
              </Link>
            </TouchableOpacity>
          </LinearGradient>
          <Text
            style={[
              styles.coinText,
              scheme === "dark" ? styles.darkText : styles.lightText,
            ]}
          >
            {coins.toFixed(2)} Coins
          </Text>
        </View>

        {/* Product List */}
        <View style={{ flex: 1 }}>
          <ProductList searchPhrase={searchPhrase} myProduct={false} />
        </View>
      </View>

      {/* Floating Minigame Button */}
      <LinearGradient
        colors={
          scheme === "dark" ? ["#20252e", "#12171e"] : ["#ffffff", "#e0e0e0"]
        }
        style={[styles.floatingButton, { elevation: 5 }]}
      >
        <Link href="/games">
          <View style={styles.buttonContent}>
            <Animated.Image
              source={require("../../assets/images/egg-full.png")}
              style={[
                {
                  width: "65%",
                  height: "65%",
                  resizeMode: "contain",
                },
                { transform: [{ rotate: rotateInterpolation }] },
              ]}
            />
          </View>
        </Link>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 0,
    marginTop: 10,
  },
  lightContainer: {
    backgroundColor: "#f5f5f5",
  },
  darkContainer: {
    backgroundColor: "#121212",
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 10,
    gap: 10,
  },

  productButton: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
    alignContent: "center",
    justifyContent: "center",
  },

  productButtonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },

  coinText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  darkText: {
    color: "#ededed",
  },
  lightText: {
    color: "#000000",
  },

  floatingButton: {
    position: "absolute",
    borderRadius: 50,
    width: 65,
    height: 65,
    bottom: 30,
    right: 30,
  },

  buttonContent: {
    alignSelf: "center",
    width: "100%",
    height: "100%",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
