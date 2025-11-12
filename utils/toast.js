import { useEffect, useState } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";

let toastInstance = null;

export const showToast = (message, type = "default") => {
  if (toastInstance && toastInstance.show) {
    toastInstance.show(message, type);
  }
};

export const ToastContainer = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("default");
  const [fadeAnim] = useState(new Animated.Value(0));
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    toastInstance = {
      show: (msg, toastType) => {
        // Clear existing timeout
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        setMessage(msg);
        setType(toastType);
        setVisible(true);

        // Fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();

        // Auto hide after 3 seconds
        const id = setTimeout(() => {
          hideToast();
        }, 3000);
        setTimeoutId(id);
      },
    };

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const hideToast = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    });
  };

  const getToastConfig = () => {
    switch (type) {
      case "success":
        return {
          backgroundColor: "#10B981",
          icon: "✓",
        };
      case "error":
        return {
          backgroundColor: "#EF4444",
          icon: "✕",
        };
      case "warning":
        return {
          backgroundColor: "#F59E0B",
          icon: "⚠",
        };
      default:
        return {
          backgroundColor: "#3B82F6",
          icon: "ℹ",
        };
    }
  };

  if (!visible) return null;

  const config = getToastConfig();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={[styles.toast, { backgroundColor: config.backgroundColor }]}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{config.icon}</Text>
        </View>
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity
          onPress={hideToast}
          style={styles.closeButton}
          activeOpacity={0.7}
        >
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    zIndex: 9999,
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  icon: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  message: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  closeIcon: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});