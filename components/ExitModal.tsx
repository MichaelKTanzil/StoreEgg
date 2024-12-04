import {
  StyleSheet,
  Text,
  View,
  Modal,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import React from "react";

interface ExitModalProps {
  isExitModalVisible: boolean;
  handleCancel: () => void;
  handleExitApp: () => void;
}

const ExitModal = ({
  isExitModalVisible,
  handleCancel,
  handleExitApp,
}: ExitModalProps) => {
  const scheme = useColorScheme();
  return (
    <Modal
      transparent={true}
      visible={isExitModalVisible}
      animationType="fade"
      onRequestClose={handleCancel}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View
          style={[
            styles.modalCard,
            scheme === "dark" ? styles.darkBackground : styles.lightBackground,
          ]}
        >
          <Text
            style={[
              styles.modalTitle,
              scheme === "dark" ? styles.darkText : styles.lightText,
            ]}
          >
            Exit StoreEgg?
          </Text>
          <Text
            style={[
              styles.modalText,
              scheme === "dark" ? styles.darkText : styles.lightText,
            ]}
          >
            Are you sure you to exit?
          </Text>
          <View style={styles.flexRow}>
            <TouchableOpacity
              onPress={handleCancel}
              style={[
                styles.cancelButton,
                scheme === "dark" ? styles.darkButton : null,
              ]}
            >
              <Text style={styles.buttonText}>NO</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleExitApp}
              style={[
                styles.exitButton,
                {
                  backgroundColor:
                    scheme === "dark" ? "#63636355" : "#33333355",
                },
              ]}
            >
              <Text style={styles.buttonText}>YES</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ExitModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  darkBackground: {
    backgroundColor: "#121212",
  },
  lightBackground: {
    backgroundColor: "#ffffff",
  },
  darkText: {
    color: "#ededed",
  },
  lightText: {
    color: "#000000",
  },
  darkButton: {
    backgroundColor: "#320088",
  },
  modalCard: {
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalTitle: { fontSize: 20, marginBottom: 10, fontWeight: "bold" },
  modalText: {
    fontSize: 16,
    color: "#333333",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 25,
    marginRight: 5,
    gap: 20,
  },
  cancelButton: {
    backgroundColor: "#2671e0",
    padding: 5,
    width: 50,
    height: 30,
    borderRadius: 5,
  },
  exitButton: {
    padding: 5,
    width: 50,
    height: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
