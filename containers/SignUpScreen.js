import React from "react";
import { Button, Text, TextInput, View, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // Request URL: https://express-airbnb-api.herokuapp.com/user/sign_up
  const handleSubmit = async () => {
    const response = await axios.post(
      "https://express-airbnb-api.herokuapp.com/user/sign_up",
      {
        email: email,
        username: username,
        password: password,
      }
    );
    console.log(response.data);
  };

  return (
    <KeyboardAwareScrollView>
      <View>
        <TextInput
          placeholder="email"
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />
        <TextInput
          placeholder="username"
          onChangeText={(text) => {
            setUsername(text);
          }}
          value={userName}
        />
        <TextInput
          placeholder="describe yourself in a few words..."
          multiline
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
        />
        <TextInput placeholder="confirm password" secureTextEntry={true} />
        <Button
          title="Sign up"
          onPress={async () => {
            const userToken = "secret-token";
            setToken(userToken);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("login");
          }}
        >
          <Text>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
