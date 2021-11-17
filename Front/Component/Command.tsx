import React, { Component, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  PixelRatio,
  Button,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

interface Props {
  UnLogged: () => void;
}

class Command extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      username: "undefined",
      usertable: [],
      quantity: 0,
      token: "ok",
      commande: [],
    };
    this.UnLogged = props.UnLogged.bind(this);
  }
  componentDidMount() {
    this.getInfoUser();
  }
  

  FetchUser = async () => {
    try {
      fetch(`http://172.104.156.69:8000/api/infoUser/${this.state.username}`)
        .then((response) => response.json())
        .then((data) => this.setState({ usertable: data }));

        console.log(this.state.usertable)
      this.Fetch();
    } catch (error) {
      console.error(error);
    }
  };
  Fetch = async () => {
    
    try {
     
      fetch(
        `http://172.104.156.69:8000/api/commande/${this.state.usertable.id}`
      ).then((response) => response.json())
      .then((data) => this.setState({ commande: data }))
      console.log("kjkj",this.state.commande)
      
      // .then((data) => this.setState({ usertable: data }) )
    } catch (error) {
      console.error(error);
    }
  };

  getInfoUser = async () => {
    try {
      let result = await AsyncStorage.getItem("username");
      await this.setState({ username: result });
      console.log("je recup de la data dans commande ", this.state.username);
      this.FetchUser();
    } catch (e) {
      console.log(e);
    }
  };
  back() {
    this.props.navigation.navigate("Home");
  }

  cart_function = () => {
    if(this.state.commande){
      return (
        <View>
          <Text style={{textAlign: "center",fontSize: 18 }}>Vous n'avez pas de commande</Text>
        </View>
      );
    }
    else{
      return this.state.commande.map((product) => {
        return (
          <View style={styles.loop_food}>
            <Text style={{ marginLeft: 13 }}>{product.name}</Text>
            <View style={{ flexDirection: "column", marginLeft: 28 }}>
              <Text style={{ fontSize: 18 }}>quantité</Text>
              <Text style={{ alignSelf: "center" }}>2</Text>
            </View>
            <View style={{ flexDirection: "column", marginLeft: 28 }}>
              <Text style={{ fontSize: 18 }}>tente</Text>
              <Text style={{ alignSelf: "center" }}>{product.tente_id}</Text>
            </View>
            <View style={{ flexDirection: "column", marginLeft: 28 }}>
              <Text style={{ fontSize: 18 }}>date</Text>
              <Text style={{ alignSelf: "center" }}>{product.date}</Text>
            </View>
            <View style={{ flexDirection: "column", marginLeft: 39 }}>
              <Text style={{ fontSize: 18 }}>Prix</Text>
              <Text style={{ alignSelf: "center" }}>{product.price} €</Text>
            </View>
          </View>
        );
      });
    }
   
  };

  render() {
   
    console.log("idkkkkk",this.state.usertable.id)
    console.log("commande",this.state.commande)
    return (
      <React.Fragment>
        {/* <Text>bluetooth component</Text>
        <Text>{this.state.usertable["coin"]}</Text> */}
        <View style={{ zIndex: 1 }}>
          <TouchableOpacity onPress={() => this.UnLogged(this.state.token = null)}>
            <Text style={{ fontSize: 13, color: "white", textAlign: "right", marginTop: 27, marginRight: 32 }}>se déconnecter</Text>
          </TouchableOpacity>
          <Text style={{ color: "white", fontSize: 26, textAlign: "center" }}>
            {" "}
            Historique des Commandes{" "}
          </Text>
        </View>
        <View style={styles.circle}></View>
        <ScrollView>

        {this.cart_function()}

        </ScrollView>
        {/* <Button
            title="disconnect"
            onPress={() => this.UnLogged(this.state.token = null)}
            /> */}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  loop_square: {
    color: "black",
    fontSize: 13,
  },
  circle: {
    marginTop: -316,
    alignSelf: "center",
    backgroundColor: "black",
    width: 500,
    height: 500,
    borderRadius: 500,
    zIndex: 0,
  },
});

export default Command;
