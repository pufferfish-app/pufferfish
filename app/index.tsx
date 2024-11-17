import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Button } from "react-native-ui-lib";
import { Formik } from "formik";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const loginURL = "http://pufferfish-xurta.ondigitalocean.app";

const LoginPage = () => {
  const { setIsLogged } = useAuth();
  const router = useRouter();

  const saveCredentials = async (username: string, password: string) => {
    try {
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("password", password);
    } catch (error) {
      console.error("Error saving credentials:", error);
    }
  };

  const handleLogin = async (values: { username: string; password: string }) => {
    const data = {
      username: values.username,
      password: values.password,
    };

    try {
      const res = await fetch(`${loginURL}/credential_check`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.status === 200) {
        await saveCredentials(values.username, values.password); // Save credentials
        setIsLogged(true);
        router.push("/home");
      } else {
        console.error("Invalid username or password");
      }
    } catch (e) {
      console.error("Error during login:", e);
    }
  };

  const handleCreateAccount = async (values: { username: string; password: string; name: string }) => {
    const data = {
      username: values.username,
      password: values.password,
      friendly_name: values.name,
    };

    try {
      const res = await fetch(`${loginURL}/create_user`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.status === 200) {
        console.log("Account created successfully");
        await saveCredentials(values.username, values.password); // Save credentials
        setIsLogged(true);
        router.push("/home");
      } else {
        console.error("Failed to create account");
      }
    } catch (e) {
      console.error("Error during account creation:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      <Formik initialValues={{ email: "", password: "", username: "" }} onSubmit={handleLogin}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={values.username}
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              placeholderTextColor="#aaa"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              placeholderTextColor="#aaa"
            />
            <Button style={styles.loginButton} onPress={handleSubmit} label="Login" />
          </View>
        )}
      </Formik>

      <Text style={styles.subtitle}>Or create a new account</Text>

      <Formik initialValues={{ username: "", password: "", name: "" }} onSubmit={handleCreateAccount}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={values.username}
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              placeholderTextColor="#aaa"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              placeholderTextColor="#aaa"
            />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={values.name}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              placeholderTextColor="#aaa"
            />
            <Button style={styles.createAccountButton} onPress={handleSubmit} label="Create Account" />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f7f9fc",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: "#4f46e5",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  createAccountButton: {
    backgroundColor: "#4caf50",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});

export default LoginPage;
