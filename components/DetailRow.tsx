import React from "react";
import { StyleSheet, Text, View, useColorScheme } from "react-native";

interface DetailRowProps {
  label: string;
  value: string;
}

const DetailRow = ({ label, value }: DetailRowProps) => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";

  return (
    <View style={styles.container}>
      <Text
        style={[styles.label, isDarkMode ? styles.darkText : styles.lightText]}
      >
        {label}
      </Text>
      <Text
        style={[styles.value, isDarkMode ? styles.darkText : styles.lightText]}
      >
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    textTransform: "capitalize",
  },
  value: {
    fontSize: 14,
    lineHeight: 20,
    textTransform: "capitalize",
  },
  darkText: {
    color: "#ededed",
  },
  lightText: {
    color: "#000000",
  },
});

export default DetailRow;
