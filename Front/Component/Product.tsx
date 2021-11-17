import React, { Component, useState, useEffect } from "react";
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


const Product = (props) => {
  //   this.state = {
  //     object_of_product: [],
  //     quantity: 0,
  //     ok: { id: 4, price: "bonjou" },
  //   };
  // }
  // const { id } = route.params;
  const [object_of_product, setObject] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [ok, setOk] = useState("ok");
 


  
  useEffect(() => {
    

  Fetch();
      
      
      
  }, []);

  function onAddProduct(){
    object_of_product.quantity = quantity;
    setObject(object_of_product);
    //  setObject(object_of_product["quantity"] : quantity);
    // object_of_product.push("ok")
     console.log("tableau test ", object_of_product);
    props.route.params.onAddProduct( object_of_product )
  }


  function Fetch(){

    fetch(`http://172.104.156.69:8000/api/product/${props.route.params.id}`)
    .then((response) => response.json())
    .then((data) =>  setObject(data))
    // .then(console.log("object of product => ", object_of_product)) 
    .catch(function (error) {
      console.log(
        "There has been a problem with your fetch operation: " + error.message
      );
      // ADD THIS THROW error
      throw error;
    });
  };
  
  async function deleteToken() {
   try {
     await AsyncStorage.removeItem("token");
    //  console.log("je sup de la data");
   } catch (e) {
     console.log(e);
   }
  };

 async function UpdateToken(){
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        setState({ tokenAPP: value });
        // console.log("getdata", tokenAPP);
      }
    } catch (e) {
      // error reading value
    }
  };

  // UpdateCart = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("panier");
  //     if (value !== null) {
  //       this.setState({ shoppingCart: this.ok });
  //       console.log("getdata", this.state.shoppingCart[0]);
  //     }
  //   } catch (e) {
  //     // error reading value
  //   }
  // };


  function count_less() {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  }

  function count_more() {
    setQuantity(quantity + 1);
  }

  // const { quantity } = this.state;
  return (
    <React.Fragment>
      <View style={{ flexDirection: "column" }}>
        <TouchableOpacity style={styles.goback} onPress={() => {props.navigation.navigate("Home")}}>
          <View>
            <AntDesign
              name="arrowleft"
              size={30}
              color="white"
              style={{ zIndex: 1, paddingLeft: 20, marginTop: 29 }}
            />
            <Text></Text>
          </View>
        </TouchableOpacity>

        <Text
          style={{
            color: "white",
            zIndex: 1,

            fontSize: 30,
            marginLeft: 20,
          }}
        >
          {object_of_product.name}
        </Text>
        <Text
          style={{
            color: "#E9B44C",
            zIndex: 1,
            fontSize: 30,
            marginLeft: 20,
          }}
        >
          {object_of_product.price} €
        </Text>
      </View>
      <View style={styles.circle}></View>
      <View style={styles.button_fond}>
        <TouchableOpacity
          style={styles.less}
          onPress={() => count_less()}
        >
          <Text style={{ fontSize: 30, color: "white", alignSelf: "center" }}>
            -
          </Text>
        </TouchableOpacity>
        <Text style={{ color: "#E9B44C", fontSize: 27 }}>{quantity}</Text>
        <TouchableOpacity
          style={styles.more}
          onPress={() => {
            setQuantity(quantity + 1);
          }}
        >
          <Text style={{ fontSize: 30, color: "white", alignSelf: "center" }}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <Button title="Learn More" onPress={() => UpdateCart()} />
      <Button title="remove toeken" onPress={() => deleteToken()} />
      <View style={styles.description}>
        <Text style={{ fontSize: 24, marginBottom: 12, marginLeft: 20 }}>
          Description
        </Text>
        <Text style={{ fontSize: 18, marginLeft: 20, marginRight: 20 }}>
          {object_of_product.description}
        </Text>
        <TouchableOpacity
          onPress={() => onAddProduct()}
          style={{
            width: "85%",
            height: 41,
            backgroundColor: "black",
            borderRadius: 16,
            marginLeft: 23,
            marginTop: 140,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 17,
              alignSelf: "center",
              paddingTop: 7,
            }}
          >
            AJOUTER AU PANIER
          </Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
}
const styles = StyleSheet.create({
  circle: {
    marginTop: -320,
    alignSelf: "center",
    backgroundColor: "black",
    width: 500,
    height: 500,
    borderRadius: 500,
    zIndex: 0,
  },
  button_fond: {
    backgroundColor: "black",
    zIndex: 0,
    height: 47,
    width: 145,
    borderRadius: 30,
    alignSelf: "center",
    marginTop: -20,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",

    borderColor: "#F1F1F1",
    borderBottomWidth: 0,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  less: {
    backgroundColor: "black",
    zIndex: 1,
    height: 46,
    width: 50,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
  more: {
    backgroundColor: "black",
    zIndex: 1,
    height: 46,
    width: 50,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  description: {},
  ingredient: {},
  loop_square: {
    backgroundColor: "black",
    width: 52,
    height: 52,
    borderRadius: 10,
  },
  goback: {
    zIndex: 1,
  },
});

export default Product;
