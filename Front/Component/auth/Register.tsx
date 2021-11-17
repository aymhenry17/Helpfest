import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface Props {
  onUserRegister: () => void
}

export default class Register extends React.Component<Props, State> {


  
  constructor(props: Props) {
    super(props);
    this.state = {
      id_log: "",
      password: "",
      password_confirmation: "",
      token: "",
      tente_id: "",
    };
    // this.send_Data();
    this.onUserRegister = props.onUserRegister.bind(this)
  }

  storeToken = async (tokenValue, username) => {
    try {
      await AsyncStorage.setItem("token", tokenValue);
      await AsyncStorage.setItem("username", username);
      console.log("je recup de la data", tokenValue, username);
    } catch (e) {
      console.log(e);
    }
  };

  

  Password = (password) => {
    this.setState({ password });
    console.log(password);
  };
  Id = (id_log) => {
    this.setState({ id_log });
    console.log(id_log);
  };

  IDtente = (tente_id:string) => {
    console.log(tente_id);
    this.setState({ tente_id: parseInt(tente_id) });
  };

  Password_confimartion = (password_confirmation) => {
    this.setState({ password_confirmation });
    console.log(password_confirmation);
  };

  send_Data = () => {
    fetch("http://172.104.156.69:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.id_log,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
        tente_id: this.state.tente_id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
         this.storeToken(data.token, data.user.username);
        this.onUserRegister(data.token)
       
      })
      .catch(function (error) {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
        // ADD THIS THROW error
        throw error;
      });
  };

  render() {
    return (
      <React.Fragment>
        <View style={{ backgroundColor: "green" }}></View>
        <View style={styles.top_view}></View>
        <View style={styles.bottom_view}>
          <Text style={{ fontSize: 28, color: "black", marginLeft: 30 }}>
            Créer un compte
          </Text>
          <TextInput
            style={styles.input1}
            onChangeText={this.Id}
            value={this.state.id_log}
            autoCompleteType="off"
            placeholder="Identifiant "
          />
          <TextInput
            keyboardType='numeric'
            style={styles.input1}
            onChangeText={this.IDtente}
            value={this.state.tente_id}
            autoCompleteType="off"
            placeholder="numéro de tente"
          />

          <TextInput
            style={styles.input2}
            onChangeText={this.Password}
            value={this.state.password}
            secureTextEntry={true}
            placeholder="mot de passe"
            autoCompleteType="password"
          />
          <Text>{this.state.password}</Text>
          <TextInput
            style={styles.input2}
            onChangeText={this.Password_confimartion}
            value={this.state.password_confirmation}
            secureTextEntry={true}
            placeholder="confirmation du mot de passe"
            autoCompleteType="password"
          />

        
          <Text>{this.state.token}</Text>

          <TouchableOpacity
            style={styles.valid_button}
            onPress={() => this.send_Data()}
          >
            <Text style={{ textAlign: "center", marginTop: 11 }}>
              S'inscrire
            </Text>
          </TouchableOpacity>
        </View>
      </React.Fragment>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    backgroundColor: "white"
  },
  top_view: {
    backgroundColor: "white",
    width: "100%",
    height: "25%",
  },
  bottom_view: {
    backgroundColor: "white",
    width: "100%",
    height: "60%",
  },
  input1: {
    alignSelf: "center",
    borderWidth: 1,
    marginTop: 42,
    width: "85%",
    height: 45,
    borderRadius: 5,
    paddingLeft: 30,
    borderColor: "#E4D6A7",
  },
  input2: {
    alignSelf: "center",
    borderWidth: 1,
    marginTop: 15,
    width: "85%",
    height: 45,
    borderRadius: 5,
    paddingLeft: 30,
    borderColor: "#E4D6A7",
  },
  valid_button: {
    alignSelf: "center",
    marginTop: 30,
    width: "85%",
    height: 45,
    borderRadius: 5,
    backgroundColor: "#E4D6A7",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
