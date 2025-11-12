import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function InputField({ value, onChangeText }) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.wrapper}>
      <View style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}>
        <View style={styles.iconWrapper}>
          <Text style={styles.icon}>🔐</Text>
        </View>
        <TextInput
          placeholder="Enter your access code"
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#9CA3AF"
          selectionColor="#3B82F6"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {value.length > 0 && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
            activeOpacity={0.7}
          >
            <Text style={styles.eyeIcon}>{showPassword ? "👁️" : "👁️‍🗨️"}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  inputContainerFocused: {
    borderColor: "#3B82F6",
  },
  iconWrapper: {
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    color: "#1F2937",
    fontSize: 16,
    fontWeight: "500",
  },
  eyeButton: {
    padding: 8,
  },
  eyeIcon: {
    fontSize: 20,
  },
});