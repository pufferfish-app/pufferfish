import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Button } from "react-native-ui-lib";
import { Formik } from "formik";
import { Redirect } from "expo-router";

const loginURL = "http://pufferfish-xurta.ondigitalocean.app";

const LoginPage = () => {
  interface LoginValues {
    email: string;
    password: string;
    username: string;
  }

  const [error, setError] = React.useState<string | null>(null);

  const handleLogin = async (values: LoginValues) => {
    console.log("Login Values:", values);
    try {
      const res = await fetch(`${loginURL}/credential_check`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([{email: values.email, password: values.password}]),
      });
      if (res.status === 200) {
        console.log("Login Success");
        <Redirect href="/(tabs)" />;
      } else {
        console.log("Login Failed");
        setError("Invalid email or password");
      }
    } catch (e) {
      console.error("Error:", e);
    }
  };

  const handleCreateAccount = async (values: LoginValues) => {
    console.log("Create account");
    try{
      const res = await fetch(`${loginURL}/create_user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([{email: values.email, password: values.password, username: values.username}]),
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Title Section */}
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      {/* Formik Form */}
      <Formik
        initialValues={{ email: "", password: "", username: "" }}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.formContainer}>
            {/* Email Field */}
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              placeholderTextColor="#aaa"
            />
            {/* Password Field */}
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              placeholderTextColor="#aaa"
            />
            {/* username */}
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={values.username}
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              placeholderTextColor="#aaa"
            />
            {/* Login Button */}
            <Button
              style={styles.loginButton}
              onPress={handleSubmit}
              label="Login"
            />
          </View>
        )}
      </Formik>

      {/* Create Account Button */}
      <Button
        style={styles.createAccountButton}
        onPress={handleCreateAccount}
        label="Create Account"
        labelStyle={styles.createAccountLabel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // For Android shadow
  },
  loginButton: {
    backgroundColor: "#4f46e5",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  createAccountButton: {
    backgroundColor: "#fff",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#4f46e5",
    marginTop: 10,
  },
  createAccountLabel: {
    color: "#4f46e5",
    fontWeight: "bold",
  },
});

export default LoginPage;
