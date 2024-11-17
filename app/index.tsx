import { StyleSheet, Image, Platform, View, TextInput } from "react-native";
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
      <TextInput
        className="rounded-md border-2 border-gray-300 shadow-sm shadow-slate-500 "
        placeholder="Email"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
      />
      <TextInput
        placeholder="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
      />
      <Button className="hover:to-indigo-800" onPress={handleLogin}>Login</Button>
    </View>
  );
};

export default LoginPage;
