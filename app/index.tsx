import { StyleSheet, Image, Platform, View, TextInput, Text } from "react-native";
import { Button, Card, TextField } from "react-native-ui-lib";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Formik } from "formik";
import * as Yup from "yup";
import React from "react";

const LoginPage = () => {
  const [password, setPassword] = React.useState({ value: "", error: "" });
  const [email, setEmail] = React.useState({ value: "", error: "" });

  interface LoginFormValues {
    email: string;
    password: string;
  }

  const handleLogin = (values: LoginFormValues): void => {
    // Handle login logic here
    console.log("Login Values:", values);
  };

  return (
    <View className="bg-white">
      <Formik initialValues={{ email: '', password: '' }} onSubmit={handleLogin}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextField
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
            />
            <TextField
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
            />
            <Button onPress={handleSubmit}><Text>Login</Text></Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default LoginPage;
