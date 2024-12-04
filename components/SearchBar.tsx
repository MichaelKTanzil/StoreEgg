import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

interface SearchBarProps {
  clicked: boolean;
  searchPhrase: string;
  setSearchPhrase: (searchPhrase: string) => void;
  setClicked: (clicked: boolean) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const { clicked, searchPhrase, setSearchPhrase, setClicked } = props;
  const theme = useColorScheme();

  const backgroundColor = theme === "dark" ? "#282828" : "#d9dbda";
  const textColor = theme === "dark" ? "#fff" : "#000";
  const iconColor = theme === "dark" ? "#fff" : "#000";

  return (
    <View style={styles.container}>
      <View
        style={[
          clicked ? styles.searchBarClicked : styles.searchBarUnclicked,
          { backgroundColor },
        ]}
      >
        <Feather
          name="search"
          size={20}
          color={iconColor}
          style={{ marginLeft: 10 }}
        />
        <TextInput
          style={[styles.input, { color: textColor }]}
          placeholder="Search Product.."
          placeholderTextColor={theme === "dark" ? "#aaa" : "#888"}
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => setClicked(true)}
        />
        {clicked && (
          <Entypo
            name="cross"
            size={20}
            color={iconColor}
            style={{ marginLeft: -45 }}
            onPress={() => {
              setSearchPhrase("");
            }}
          />
        )}
        {clicked && (
          <View style={{ marginLeft: 25 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#320088",
                padding: 12,
                width: 70,
                borderRadius: 10,
              }}
              onPress={() => {
                Keyboard.dismiss();
                setClicked(false);
                setSearchPhrase("");
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    paddingInline: 10,
    paddingBlock: 5,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },

  searchBarUnclicked: {
    padding: 0,
    flexDirection: "row",
    width: "100%",
    borderRadius: 15,
    alignItems: "center",
  },

  searchBarClicked: {
    padding: 0,
    flexDirection: "row",
    width: "77.5%",
    borderRadius: 15,
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
});
