import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  Modal,
} from "react-native";
import React, { useState } from "react";

interface FullScreenImageProps {
  imageUri: string;
}

const FullScreenImage = ({ imageUri }: FullScreenImageProps) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handlePress = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={handlePress}>
        <Image
          source={{ uri: imageUri }}
          style={styles.img}
          resizeMode="contain"
        />
      </Pressable>

      {isFullScreen && (
        <Modal visible={isFullScreen} transparent={false} animationType="fade">
          <View style={styles.fullscreenContainer}>
            <Pressable onPress={handlePress} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
            <Image
              source={{ uri: imageUri }}
              style={styles.fullscreenImage}
              resizeMode="contain"
            />
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    boxShadow: "1 3 10 rgba(0, 0, 0, 0.2)",
    alignItems: "center",
  },
  img: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenImage: {
    width: "100%",
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    padding: 10,
    zIndex: 10000,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "black",
    fontWeight: "bold",
  },
});

export default FullScreenImage;
