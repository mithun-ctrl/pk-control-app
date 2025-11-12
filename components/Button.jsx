import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Button({ title, onPress, disabled, variant = "primary" }) {
  const isPrimary = variant === "primary";

  if (disabled) {
    return (
      <View style={styles.buttonWrapper}>
        <View style={[styles.button, styles.buttonDisabled]}>
          <Text style={styles.textDisabled}>{title}</Text>
        </View>
      </View>
    );
  }

  if (isPrimary) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        style={styles.buttonWrapper}
      >
        <View style={[styles.button, styles.buttonPrimary]}>
          <Text style={styles.textPrimary}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.buttonWrapper}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={[styles.button, styles.buttonSecondary]}>
        <Text style={styles.textSecondary}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    marginVertical: 8,
    width: "100%",
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
  },
  buttonPrimary: {
    backgroundColor: "#3B82F6",
  },
  buttonSecondary: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },
  buttonDisabled: {
    backgroundColor: "#F3F4F6",
  },
  textPrimary: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  textSecondary: {
    color: "#1F2937",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  textDisabled: {
    color: "#9CA3AF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});