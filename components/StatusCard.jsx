import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function StatusCard({ status, message }) {
  const getStatusConfig = () => {
    switch (status) {
      case "success":
        return {
          color: "#10B981",
          bgColor: "#ECFDF5",
          icon: "✓",
          label: "Success",
        };
      case "error":
        return {
          color: "#EF4444",
          bgColor: "#FEF2F2",
          icon: "✕",
          label: "Error",
        };
      default:
        return {
          color: "#F59E0B",
          bgColor: "#FFFBEB",
          icon: "⚠",
          label: "Warning",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: config.bgColor,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={[styles.iconCircle, { backgroundColor: config.color }]}>
          <Text style={styles.icon}>{config.icon}</Text>
        </View>
        <Text style={[styles.title, { color: config.color }]}>
          {config.label}
        </Text>
      </View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  icon: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  message: {
    fontSize: 15,
    color: "#4B5563",
    lineHeight: 22,
    fontWeight: "400",
  },
});