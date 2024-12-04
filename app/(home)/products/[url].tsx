import DetailRow from "@/components/DetailRow";
import { Product, useProductDetail } from "@/hooks/productHooks";
import { add, remove, selectItems } from "@/redux/boughtItemSlice";
import { useAppDispatch, useAppSelector } from "@/redux/index";
import { selectCoin } from "@/redux/coinSlice";

import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import FullScreenImage from "@/components/FullScreenImage";
import { LinearGradient } from "expo-linear-gradient";

const DetailScreen = () => {
  const { url } = useLocalSearchParams<{ url: string }>();
  const { detail, isLoading, error } = useProductDetail(url);
  const dispatch = useAppDispatch();
  const bought = useAppSelector(selectItems);
  const scheme = useColorScheme();
  const isBought = bought.filter((item) => item.id === detail?.id).length > 0;
  const item: Product = {
    title: detail?.title ?? "",
    price: detail?.price ?? 0,
    id: detail?.id ?? 0,
    description: detail?.description ?? "",
    category: detail?.category ?? "",
    image: detail?.image ?? "",
    rating: detail?.rating ?? { rate: 0, count: 0 },
  };
  const coins = useAppSelector(selectCoin);
  return (
    <View
      style={[
        styles.container,
        scheme === "dark" ? styles.darkBackground : styles.lightBackground,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator
          size="large"
          style={{ alignSelf: "center", justifyContent: "center" }}
        />
      ) : error ? (
        <Text>Something went wrong! {error}</Text>
      ) : (
        <>
          <Stack.Screen
            options={{
              headerTitle: `Product ${detail?.id}`,
              headerRight: () => (
                <Text
                  style={[
                    styles.itemPrice,
                    scheme === "dark" ? styles.darkText : styles.lightText,
                  ]}
                >
                  {coins.toFixed(2)} Coins
                </Text>
              ),
            }}
          />
          <View style={{ flex: 1 }}>
            {detail && (
              <>
                <ScrollView
                  contentContainerStyle={{
                    padding: 20,
                    paddingBottom: 100,
                  }}
                >
                  <View style={styles.detailContainer}>
                    <FullScreenImage imageUri={detail.image} />
                  </View>

                  <Text
                    style={[
                      styles.title,
                      scheme === "dark" ? styles.darkText : styles.lightText,
                    ]}
                  >
                    {detail.title}
                  </Text>
                  <View
                    style={[
                      styles.lineBorder,
                      { borderColor: scheme === "dark" ? "#e6e6e6" : "#333" },
                    ]}
                  ></View>
                  <DetailRow
                    label="Price"
                    value={detail.price.toString() + " Coins"}
                  />
                  <DetailRow label="Description" value={detail.description} />
                  <DetailRow
                    label="Rating"
                    value={`${detail.rating.rate.toString()} / 5 star from ${detail.rating.count.toString()} buyers`}
                  />
                </ScrollView>

                <View
                  style={[
                    styles.buySellButtonContainer,
                    scheme === "dark"
                      ? styles.darkBackground
                      : styles.lightBackground,
                  ]}
                >
                  {/* Buy/Sell Button */}
                  <LinearGradient
                    colors={
                      isBought
                        ? scheme === "dark"
                          ? ["#e68a00", "#d47817"]
                          : ["#f5a623", "#e68a00"]
                        : scheme === "dark"
                        ? ["#320088", "#300080"]
                        : ["#2671e0", "#1e5cb8"]
                    }
                    style={{
                      borderRadius: 10,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        isBought
                          ? dispatch(remove(item))
                          : coins >= item.price
                          ? dispatch(add(item))
                          : alert("Not enough coins!");
                      }}
                      style={styles.buySellButton}
                    >
                      <Text style={styles.buySellButtonText}>
                        {isBought ? "Sell" : "Buy Now"}
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </>
            )}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  img: { height: 250, width: 250, objectFit: "contain" },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemPrice: { fontSize: 17, marginRight: 10, fontWeight: "bold" },
  darkText: {
    color: "#e0e0e0",
  },
  lightText: {
    color: "#333",
  },
  lightBackground: {
    backgroundColor: "#f5f5f5",
  },
  darkBackground: {
    backgroundColor: "#121212",
  },
  detailContainer: {
    alignSelf: "center",
    marginBottom: 20,
    backgroundColor: "#ffffff",
    marginTop: 5,
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 26,
    marginBottom: 12,
    textAlign: "center",
  },
  lineBorder: {
    borderWidth: 0.5,
    width: "100%",
    height: 1,
    marginTop: 10,
    marginBottom: 25,
  },
  buySellButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 20,
    right: 20,
    height: 70,
  },
  buySellButton: {
    height: 50,
    width: "100%",
    justifyContent: "center",
  },
  buySellButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DetailScreen;
