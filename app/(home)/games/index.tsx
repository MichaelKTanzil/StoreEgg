import { Stack } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Animated,
  Easing,
  TouchableHighlight,
  useColorScheme,
} from "react-native";
import { addCoin } from "@/redux/coinSlice";
import { useDispatch } from "react-redux";

export default function GamesScreen() {
  const dispatch = useDispatch();
  const [isBroken, setIsBroken] = useState(false);
  const [coinType, setCoinType] = useState("");
  const scheme = useColorScheme();
  const [isClicked, setIsClicked] = useState(false);

  const rotation = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const handleMiniGames = () => {
    if (isClicked) return;
    setIsClicked(true);
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setIsBroken(true);

      const randomNum = Math.floor(Math.random() * 100) + 1;
      if (randomNum <= 1) {
        console.log("You won a diamond!");
        setCoinType("diamond");
        dispatch(addCoin({ coin: 1000 }));
      } else if (randomNum <= 15) {
        console.log("You won gold coin!");
        setCoinType("gold");
        dispatch(addCoin({ coin: 200 }));
      } else if (randomNum <= 50) {
        console.log("You won silver coin!");
        setCoinType("silver");
        dispatch(addCoin({ coin: 100 }));
      } else {
        console.log("You won bronze coin!");
        setCoinType("bronze");
        dispatch(addCoin({ coin: 50 }));
      }

      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    });
  };

  useEffect(() => {
    const animateRotation = () => {
      Animated.sequence([
        Animated.timing(rotation, {
          toValue: 1,
          duration: 750,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(rotation, {
          toValue: -1,
          duration: 750,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(rotation, {
          toValue: 0,
          duration: 750,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.delay(2750),
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

  return (
    <View
      style={[
        styles.container,
        scheme === "dark" ? styles.darkBackground : styles.lightBackground,
      ]}
    >
      <Stack.Screen
        options={{
          headerTitle: `Minigames`,
        }}
      />
      <View
        style={[
          styles.flexRow,
          scheme === "dark"
            ? styles.flexRowDarkColor
            : styles.flexRowLightColor,
        ]}
      >
        <View style={styles.flexColumn}>
          <Image
            source={require("../../../assets/images/gold-coin.png")}
            style={styles.coinImage}
          />
          <Text
            style={[
              styles.coinText,
              scheme === "dark" ? styles.darkText : styles.lightText,
            ]}
          >
            200
          </Text>
        </View>
        <View style={styles.flexColumn}>
          <Image
            source={require("../../../assets/images/silver-coin.png")}
            style={styles.coinImage}
          />
          <Text
            style={[
              styles.coinText,
              scheme === "dark" ? styles.darkText : styles.lightText,
            ]}
          >
            100
          </Text>
        </View>
        <View style={styles.flexColumn}>
          <Image
            source={require("../../../assets/images/bronze-coin.png")}
            style={styles.coinImage}
          />
          <Text
            style={[
              styles.coinText,
              scheme === "dark" ? styles.darkText : styles.lightText,
            ]}
          >
            50
          </Text>
        </View>
      </View>
      <Text
        style={[
          styles.title,
          scheme === "dark" ? styles.darkText : styles.lightText,
        ]}
      >
        {isBroken ? "Congratulations!" : "Welcome to Minigames!"}
      </Text>
      <Text
        style={[
          styles.text,
          scheme === "dark" ? styles.darkText : styles.lightText,
        ]}
      >
        {isBroken
          ? `You got a ${coinType} coin`
          : "Click the egg to get your prize!"}
      </Text>

      <TouchableHighlight
        onPress={handleMiniGames}
        style={{
          marginTop: 20,
          overflow: "hidden",
          borderRadius: 150,
        }}
        disabled={isClicked ? true : false}
        underlayColor="transparent"
      >
        <Animated.View
          style={{
            opacity: opacity,
          }}
        >
          {isBroken ? (
            <View style={{ alignContent: "center", justifyContent: "center" }}>
              <Image
                source={require("../../../assets/images/egg-broken.png")}
                style={styles.eggImage}
              />
              {/* Display coin rewards based on random chance */}
              {coinType === "diamond" ? (
                <Image
                  source={require("../../../assets/images/diamond.png")}
                  style={styles.eggCoin}
                />
              ) : coinType === "gold" ? (
                <Image
                  source={require("../../../assets/images/gold-coin.png")}
                  style={styles.eggCoin}
                />
              ) : coinType === "silver" ? (
                <Image
                  source={require("../../../assets/images/silver-coin.png")}
                  style={styles.eggCoin}
                />
              ) : (
                <Image
                  source={require("../../../assets/images/bronze-coin.png")}
                  style={styles.eggCoin}
                />
              )}
            </View>
          ) : (
            <Animated.Image
              source={require("../../../assets/images/egg-full.png")}
              style={[
                styles.eggImage,
                {
                  transform: [{ rotate: rotateInterpolation }],
                },
              ]}
            />
          )}
        </Animated.View>
      </TouchableHighlight>
      <Text
        style={[
          styles.text,
          { marginTop: 20 },
          scheme === "dark" ? styles.darkText : styles.lightText,
        ]}
      >
        {isBroken
          ? coinType === "diamond"
            ? `You've won a secret diamond! 1000 coins have been added to your balance`
            : coinType === "gold"
            ? `200 coins have been added to your balance`
            : coinType === "silver"
            ? `100 coins have been added to your balance`
            : coinType === "bronze"
            ? `50 coins have been added to your balance`
            : ""
          : ""}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  lightBackground: {
    backgroundColor: "#f5f5f5",
  },
  darkBackground: {
    backgroundColor: "#121212",
  },
  darkText: {
    color: "#e0e0e0",
  },
  lightText: {
    color: "#333",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
  },
  flexRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
  },
  flexRowDarkColor: {
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#282828",
  },
  flexRowLightColor: {
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    backgroundColor: "white",
  },
  coinImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  coinText: { fontSize: 16, color: "#333", fontWeight: "bold" },
  flexColumn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  eggCoin: {
    width: 130,
    height: 130,
    left: 85,
    right: 85,
    top: 50,
    resizeMode: "contain",
    zIndex: 100,
    position: "absolute",
  },
  eggImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
