import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { useProducts } from "@/hooks/productHooks";
import { Link } from "expo-router";
import React, { useState } from "react";
import ListViewIcon from "./ui/ListViewIcon";
import { selectItems } from "@/redux/boughtItemSlice";
import { useAppSelector } from "@/redux/index";
import GridViewIcon from "./ui/GridViewIcon";
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductListProps {
  searchPhrase: string;
  myProduct: boolean;
}

const ProductList = (props: ProductListProps) => {
  const { searchPhrase, myProduct } = props;
  const { data, isLoading, error } = useProducts();
  const bought = useAppSelector(selectItems);
  const [layoutChange, setLayoutChange] = useState(false);

  const filteredData = () => {
    const items = data || [];
    if (myProduct) {
      return searchPhrase === ""
        ? items.filter((item) =>
            bought.some((boughtItem) => boughtItem.id === item.id)
          )
        : items.filter(
            (item) =>
              bought.some((boughtItem) => boughtItem.id === item.id) &&
              item.title.toUpperCase().includes(searchPhrase.toUpperCase())
          );
    } else {
      return searchPhrase === ""
        ? items
        : items.filter((item) =>
            item.title.toUpperCase().includes(searchPhrase.toUpperCase())
          );
    }
  };

  // Get color scheme (dark or light)
  const scheme = useColorScheme();

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, height: "100%", width: "100%" }}>
        <ActivityIndicator
          size="large"
          color="#bbb"
          style={{ alignSelf: "center", justifyContent: "center" }}
        />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Text
          style={[
            styles.errorText,
            { color: scheme === "dark" ? "white" : "red" },
          ]}
        >
          Error: Failed to load products. Please try again later.
        </Text>
      </SafeAreaView>
    );
  }

  if (filteredData().length === 0) {
    return (
      <SafeAreaView style={styles.noDataText}>
        <Text style={{ color: scheme === "dark" ? "white" : "black" }}>
          No products available.
        </Text>
      </SafeAreaView>
    );
  }

  const renderProduct = ({ item }: { item: Product }) => {
    return (
      <Link
        href={{
          pathname: "/products/[url]",
          params: { url: item.id.toString() },
        }}
        style={[
          styles.card,
          {
            justifyContent: layoutChange ? "flex-start" : "center",
            width: layoutChange ? "auto" : "44.7%",
            padding: layoutChange ? 16 : 0,
            backgroundColor: scheme === "dark" ? "#191d26" : "#f5f5f5",
            boxShadow:
              scheme === "dark"
                ? "0px 4px 4px rgba(0, 0, 0, 0.8), 0px 4px 4px rgba(30, 144, 255, 0.2)"
                : "0px 4px 8px rgba(0, 0, 0, 0.25)",
          },
        ]}
      >
        <View
          style={[
            styles.cardItem,
            {
              flexDirection: layoutChange ? "row" : "column",
              alignItems: layoutChange ? "flex-start" : "center",
            },
          ]}
        >
          <View
            style={[
              styles.imgContainer,
              {
                marginBottom: layoutChange ? 0 : 16,
                width: layoutChange ? 125 : "100%",
                height: layoutChange ? 125 : 150,
              },
            ]}
          >
            <Image
              source={{ uri: item.image }}
              style={[
                styles.img,
                {
                  width: layoutChange ? 125 : "100%",
                  height: "100%",
                  borderBottomRightRadius: layoutChange ? 8 : 0,
                  borderBottomLeftRadius: layoutChange ? 8 : 0,
                },
              ]}
            />
          </View>
          <View
            style={[styles.container, { marginLeft: layoutChange ? 14 : 0 }]}
          >
            <Text
              style={[
                styles.productName,
                {
                  textAlign: layoutChange ? "left" : "center",
                  color: scheme === "dark" ? "#e0e0e0" : "black",
                },
              ]}
            >
              {layoutChange
                ? item.title.replace(/\s/g, "").length > 60
                  ? item.title.substring(0, 60).trim() + "..."
                  : item.title
                : item.title.replace(/\s/g, "").length > 30
                ? item.title.substring(0, 30).trim() + "..."
                : item.title}
            </Text>
            <Text
              style={[
                styles.productPrice,
                {
                  textAlign: layoutChange ? "left" : "center",
                  color: scheme === "dark" ? "#e0e0e0" : "black",
                },
              ]}
            >
              {item.price} Coins
            </Text>
          </View>
        </View>
      </Link>
    );
  };

  const switchLayout = () => {
    setLayoutChange(!layoutChange);
  };

  return (
    <View
      style={[
        styles.container,
        scheme === "dark" ? styles.darkBackground : styles.lightBackground,
      ]}
    >
      <View style={[styles.rowContainer, { marginTop: myProduct ? 6 : 0 }]}>
        <Text
          style={[
            styles.title,
            scheme === "dark" ? styles.darkText : styles.lightText,
          ]}
        >
          {myProduct ? "Your Products" : "Available Products"}
        </Text>
        <TouchableOpacity onPress={switchLayout}>
          {layoutChange ? <GridViewIcon /> : <ListViewIcon />}
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.container,
          { flexDirection: layoutChange ? "row" : "column" },
        ]}
      >
        <FlatList
          data={filteredData()}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 10 }}
          numColumns={layoutChange ? 1 : 2}
          key={layoutChange ? "list" : "grid"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  imgContainer: {
    boxShadow: "1 3 10 rgba(0, 0, 0, 0.1)",
    borderRadius: 8,
  },
  card: {
    margin: 10,
    paddingBottom: 16,
    borderRadius: 8,

    alignItems: "center",
  },
  cardItem: {
    width: "100%",
    height: "100%",
  },
  img: {
    borderRadius: 8,
    backgroundColor: "#ffffff",
    objectFit: "contain",
  },
  productName: {
    flexWrap: "wrap",
    fontSize: 16,
    fontWeight: "bold",
    paddingInline: 5,
  },
  productPrice: {
    marginTop: 8,
    fontSize: 16,
    paddingInline: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  darkText: {
    color: "#ededed",
  },
  lightText: {
    color: "#000000",
  },
  darkBackground: {
    backgroundColor: "#121212",
  },
  lightBackground: {
    backgroundColor: "#f5f5f5",
  },
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },

  noDataText: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default ProductList;
