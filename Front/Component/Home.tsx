import React, { ReactFragment } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  StatusBar,
  Modal,
  Button,
  ScrollView,
} from "react-native";

import QRCode from "react-native-qrcode-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default class Home extends React.Component {
  state = {
    search: "",
    point: 0,
    array_of_product: [],
    modalVisible: false,
    username: "undefined",
    usertable: [],
  };

  async componentDidMount() {
    this.Fetch();
    this.getToken();

    
  }
FetchUser = async () => {

  try {
    let response = await fetch(
      `http://172.104.156.69:8000/api/infoUser/${this.state.username}`
    );
    let usertable = await response.json();

    this.setState({ usertable: usertable });
  } catch (error) {
    console.error(error);
  }
}

  Fetch = async () => {
    try {
      let response = await fetch("http://172.104.156.69:8000/api/product");
      let array_of_product = await response.json();

      this.setState({ array_of_product: array_of_product });
    } catch (error) {
      console.error(error);
    }
  };

  getToken = async () => {
    try {
      let result = await AsyncStorage.getItem("username");
      await this.setState({ username: result });
      console.log("je suis usernma e", this.state.username)
      this.FetchUser();
    } catch (e) {
      console.log(e);
    }
  };
  

  updateSearch = async (search) => {
    this.setState({ search });

    try {
      let response = await fetch(
        `http://172.104.156.69:8000/api/product/search/${this.state.search}`
      );
      let json = await response.json();
      let array_of_product = json;
      this.setState({ array_of_product: array_of_product });

      if (this.state.search == "") {
        this.Fetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  SchowProduct = () => {
    console.log("usetable : ", this.state.usertable);

    return this.state.array_of_product.map((product, index) => {
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Product", { id: product.id });
          }}
        >
          <View style={styles.card} key={index}>
            <Image
              style={{
                width: 120,
                height: 120,
                alignSelf: "center",
                marginTop: 7,
                zIndex: 2,
                borderRadius: 12,
              }}
              // source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
              source={{ uri: product.image }}
            />

            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <Text style={{ marginLeft: 17, fontSize: 15 }}>
                {product.name}
              </Text>
              <Text style={{ marginRight: 17, fontSize: 12 }}>
                {product.price}€
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  };

  render() {
    const { search, modalVisible } = this.state;

    return (
      <React.Fragment>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={styles.searchbar}
            placeholder="rechercher"
            onChangeText={this.updateSearch}
            value={search}
          />

          <TouchableOpacity
            onPress={() => {
              this.setState({ modalVisible: true });
            }}
            style={styles.qr_button}
          >
            <Image
              style={{
                width: 29,
                height: 29,
                alignSelf: "center",
                alignItems: "center",
                marginTop: 5,
                zIndex: 2,
              }}
              source={require("../assets/g1173.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.show_coin}>
          <Text style={{ color: "white", fontSize: 23 }}>
            Vous avez {this.state.usertable["coin"]}
          </Text>

          <Image
            style={{ height: 40, width: 40, zIndex: 2 }}
            source={require("../assets/ruby.png")}
          />
        </View>
        <Image
          style={{
            width: 300,
            height: 100,
            zIndex: 2,
            alignSelf: "center",
            marginTop: 20,
          }}
          source={require("../assets/treasure.png")}
        />
        <View style={styles.circle}></View>
        <Modal transparent={true} visible={this.state.modalVisible}>
          <View
            style={{
              backgroundColor: "white",
              width: 250,
              height: 260,
              alignSelf: "center",
              marginTop: 200,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "black",
            }}
          >
            <View style={{ alignSelf: "center", marginTop: 72 }}>
              <QRCode value={this.state.usertable["tente"]} />
              <TouchableOpacity
                title="fermer"
                onPress={() => {
                  this.SchowProduct();
                  this.setState({ modalVisible: false });
                }}
              >
                <View style={{height: 35, width: 100, backgroundColor: "#9B2915", borderRadius: 4, marginTop: 22}}>
                  
                  <Text style={{color: "white", textAlign: "center", marginTop: 5}}>Fermer</Text>
                </View>
              </TouchableOpacity>
              <Text>{modalVisible}</Text>
            </View>
          </View>
        </Modal>
        <ScrollView>
          <View style={{ flexWrap: "wrap", flexDirection: "row", flex: 1 }}>
            {this.SchowProduct()}
            {/* test */}
            {/* <View style={styles.card}>
          <Image
            style={{
              width: 120,
              height: 120,
              alignSelf: "center",
              marginTop: 7,
              zIndex: 2,
              borderRadius: 12,
            }}
            // source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            source={require("../assets/poulet-satay-recette-malaisienne-1.jpg")}
            />

          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
            <Text style={{ marginLeft: 9, fontSize: 19 }}>titre</Text>
            <Text style={{ marginRight: 9, fontSize: 19 }}>13 €</Text>
          </View>
        </View>
          <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("Panier");}}
        >
        <View style={styles.card}>
          <Image
            style={{
              width: 120,
              height: 120,
              alignSelf: "center",
              marginTop: 7,
              zIndex: 2,
              borderRadius: 12,
            }}
            // source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            source={require("../assets/poulet-satay-recette-malaisienne-1.jpg")}
            />

          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
            <Text style={{ marginLeft: 9, fontSize: 19 }}>titre</Text>
            <Text style={{ marginRight: 9, fontSize: 19 }}>13 €</Text>
          </View>
        </View>
              </TouchableOpacity>
        <View style={styles.card}>
          <Image
            style={{
              width: 120,
              height: 120,
              alignSelf: "center",
              marginTop: 7,
              zIndex: 2,
              borderRadius: 12,
            }}
            // source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            source={require("../assets/poulet-satay-recette-malaisienne-1.jpg")}
            />

          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
            <Text style={{ marginLeft: 9, fontSize: 19 }}>titre</Text>
            <Text style={{ marginRight: 9, fontSize: 19 }}>13 €</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Image
            style={{
              width: 120,
              height: 120,
              alignSelf: "center",
              marginTop: 7,
              zIndex: 2,
              borderRadius: 12,
            }}
            // source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            source={require("../assets/poulet-satay-recette-malaisienne-1.jpg")}
          />

          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <Text style={{ marginLeft: 9, fontSize: 19 }}>titre</Text>
            <Text style={{ marginRight: 9, fontSize: 19 }}>13 €</Text>
          </View>
        </View> */}

            {/* test */}
          </View>
        </ScrollView>
      </React.Fragment>
    );
  }
}
const styles = StyleSheet.create({
  ok: {
    width: 200,
  },
  circle: {
    marginTop: -647,
    alignSelf: "center",
    backgroundColor: "black",
    width: 500,
    height: "100%",
    borderRadius: 500,
    zIndex: 0,
  },
  searchbar: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    height: 43,
    textAlign: "left",
    paddingLeft: 30,
    width: 220,
    zIndex: 2,
    backgroundColor: "white",
    marginTop: 50,
    marginLeft: 20,
  },
  card: {
    backgroundColor: "white",
    height: 200,
    width: 152,
    marginLeft: 20,
    borderRadius: 17,
    marginTop: 22,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  qr_button: {
    backgroundColor: "black",
    zIndex: 2,
    width: 42,
    height: 42,
    marginTop: 50,
    marginLeft: 30,
    borderRadius: 10,
  },
  category: {
    flexDirection: "row",
  },
  category_p: {
    zIndex: 2,
    height: 75,
    width: 70,
    borderRadius: 15,
    backgroundColor: "white",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 17,
    borderWidth: 1,
  },
  show_coin: {
    alignSelf: "center",
    alignItems: "center",
    zIndex: 2,
    flexDirection: "row",
  },
});
