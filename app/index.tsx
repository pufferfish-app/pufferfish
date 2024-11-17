import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Button } from "react-native-ui-lib";
import { Formik } from "formik";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";

const loginURL = "http://pufferfish-xurta.ondigitalocean.app";

const LoginPage = () => {
  const { setIsLogged } = useAuth();
  const router = useRouter();

  const handleLogin = async (values: { email: string; password: string }) => {
    const data = {
      username: values.email,
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
        setIsLogged(true);
        router.push("/home");
      } else {
        console.error("Invalid email or password");
      }
    } catch (e) {
      console.error("Error during login:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      <Formik initialValues={{ email: "", password: "" }} onSubmit={handleLogin}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
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
  },
});

export default LoginPage;
