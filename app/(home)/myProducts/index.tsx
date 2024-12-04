import { StyleSheet, View, useColorScheme } from "react-native";
import React, { useState } from "react";
import ProductList from "@/components/ProductList";
import SearchBar from "@/components/SearchBar";

const index = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  const scheme = useColorScheme();

  return (
    <View
      style={[
        { flex: 1, padding: 10 },
        { backgroundColor: scheme === "dark" ? "#121212" : "#f5f5f5" },
      ]}
    >
      <SearchBar
        clicked={clicked}
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        setClicked={setClicked}
      />
      <ProductList searchPhrase={searchPhrase} myProduct={true} />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
