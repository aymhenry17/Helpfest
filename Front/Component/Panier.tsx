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
  ScrollView
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default class Panier extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shoppingCart: [],
      coin: 0,
      username: "t",
      usertable: [],
      price_array: [],
    };
  }

  componentDidMount() {
    this.getToken();
    console.log("ok");
  }
  SendCommand = async () => {

    try {
      fetch(`http://172.104.156.69:8000/api/test`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         
          command: this.props.cart,
          user: this.state.usertable,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log("data", data));
    } catch (error) {
      console.error(error);
    }

  }

  Command = () => {
    if (this.state.shoppingCart.length <= 0) {
      return (
        <TouchableOpacity
          style={styles.total}
          onPress={() => this.SendCommand()}
        >
          <Text
            style={{
              color: "white",
              marginTop: 12,
              fontSize: 23,
              textAlign: "right",
              paddingLeft: "30%",
            }}
          >
            Commander
          </Text>
        </TouchableOpacity>
      );
    }
  };

  Fetch = () => {
    try {
      fetch(`http://172.104.156.69:8000/api/infoUser/${this.state.username}`)
        .then((response) => response.json())
        .then((data) => this.setState({ usertable: data }));
    } catch (error) {
      console.error(error);
    }
  };

  getToken = async () => {
    try {
      let result = await AsyncStorage.getItem("username");
      await this.setState({ username: result });

      this.Fetch();
    } catch (e) {
      console.log(e);
    }
  };

  back() {
    this.props.navigation.navigate("Home");
  }

  total() {
    // let sum = 0;
    console.log("total function", this.props.cart.length);
    let sum = 800;
    var values = [];
    var total_price = 0;
    for (let i = 0; i != this.props.cart.length; i++) {
      sum = this.props.cart[i].quantity * this.props.cart[i].price;
      console.log("je passe de le for", i);
      values.push(sum);
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      total_price = values.reduce(reducer, 0);
      console.log("total price =>", total_price);
    }

    return total_price;
    // const reducer = (accumulator, currentValue) => accumulator + currentValue;
    // let sum = this.state.price_array.reduce(reducer, 0);
    // return sum
  }

  cart_function() {
    //  this.state.price_array.push(add);
    //  let add = this.props.cart.price *  this.props.cart.quantity
    //  console.log("price array", this.state.price_array);
    return this.props.cart.map((product, index) => {
      // console.log("loop total", "product" ,product, "index",index)
      this.total();
      return (
        <View style={styles.loop_food} key={index}>
          <Image
            style={{
              width: 60,
              height: 60,
              marginLeft: 12,
              marginTop: 9,
            }}
            source={{ uri: product.image }}
          />
          <Text style={{ marginLeft: 13 }}>{product.name}</Text>
          <View style={{ flexDirection: "column", marginLeft: 28 }}>
            <Text style={{ fontSize: 18 }}>quantité</Text>
            <Text style={{ alignSelf: "center" }}>{product.quantity}</Text>
          </View>
          <View style={{ flexDirection: "column", marginLeft: 39 }}>
            <Text style={{ fontSize: 18 }}>Prix</Text>
            <Text style={{ alignSelf: "center" }}>
              {product.price * product.quantity} €
            </Text>
          </View>
        </View>
      );
    });
  }

  render() {
    console.log("price array");
    return (
      <React.Fragment>
        <View style={styles.inside_circle}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                zIndex: 2,
                color: "white",
                marginTop: 23,
                fontSize: 23,
                textAlignVertical: "center",
                marginLeft: 90,
              }}
            >
              Panier
            </Text>
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
        </View>
        <Image
          style={{
            marginTop: 54,
            width: 300,
            height: 100,
            zIndex: 1,
            alignSelf: "center",
          }}
          source={require("../assets/treasure.png")}
        />
        <View style={styles.circle}></View>
        <ScrollView>
        {this.cart_function()}

        <View style={styles.total}>
          <Text
            style={{
              color: "white",
              marginLeft: 12,
              fontSize: 23,
              alignSelf: "center",
            }}
          >
            Total
          </Text>

          <Text
            style={{
              color: "white",
              marginRight: 30,
              fontSize: 20,
              alignSelf: "center",
            }}
          >
            {this.total()} €
          </Text>
        </View>
        {this.Command()}
        </ScrollView>
      </React.Fragment>
    );
  }
}
const styles = StyleSheet.create({
  circle: {
    marginTop: -416,
    alignSelf: "center",
    backgroundColor: "black",
    width: 500,
    height: 500,
    borderRadius: 500,
    zIndex: 0,
  },
  loop_food: {
    alignSelf: "center",
    marginTop: 11,
    borderWidth: 1,
    height: 80,
    width: "90%",
    borderRadius: 12,
    flexDirection: "row",
  },
  inside_circle: {},
  show_coin: {
    alignSelf: "center",
    alignItems: "center",
    zIndex: 2,
    flexDirection: "row",
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    backgroundColor: "black",
    height: 70,
    width: "90%",
    alignSelf: "center",
    borderRadius: 8,
    marginTop: 12,
  },
  commande: {},
});
