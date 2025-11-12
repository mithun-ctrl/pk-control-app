import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import api from "../api/client";
import Button from "../components/Button";
import InputField from "../components/InputField";
import StatusCard from "../components/StatusCard";
import { showToast } from "../utils/toast";

export default function HomeScreen() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRedeploy = async (type) => {
    if (!code || code.trim() === "") {
      showToast("Please enter access code", "error");
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await api.post(`/redeploy/${type}`, { code });
      setStatus(res.data);

      if (res.data.status === "success") {
        showToast(res.data.message || "Deployment successful", "success");
      } else {
        showToast(res.data.message || "Deployment warning", "warning");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Server error occurred";
      setStatus({ status: "error", message: msg });
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🚀</Text>
          </View>
          <Text style={styles.title}>Deployment Control</Text>
          <Text style={styles.subtitle}>
            Manage your deployments with ease
          </Text>
        </View>

        {/* Main Card */}
        <View style={styles.mainCard}>
          {/* Input Section */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Access Code</Text>
            <InputField value={code} onChangeText={setCode} />
          </View>

          {/* Buttons Section */}
          <View style={styles.buttonsSection}>
            <Button
              title="Deploy with Cache"
              onPress={() => handleRedeploy("cache")}
              disabled={loading}
              variant="primary"
            />
            <Button
              title="Fresh Deploy"
              onPress={() => handleRedeploy("fresh")}
              disabled={loading}
              variant="secondary"
            />
          </View>

          {/* Loading Indicator */}
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#3B82F6" />
              <Text style={styles.loadingText}>Processing deployment...</Text>
            </View>
          )}

          {/* Status Card */}
          {status && <StatusCard {...status} />}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    width: "100%",
    alignItems: "center",
    marginBottom: 32,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  icon: {
    fontSize: 36,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    fontWeight: "400",
  },
  mainCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  inputSection: {
    width: "100%",
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  buttonsSection: {
    width: "100%",
    marginBottom: 16,
  },
  loadingContainer: {
    alignItems: "center",
    marginVertical: 24,
    paddingVertical: 20,
  },
  loadingText: {
    color: "#6B7280",
    marginTop: 12,
    fontSize: 14,
    fontWeight: "500",
  },
});