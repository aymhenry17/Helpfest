import React from "react";
import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Component/Home";
import Product from "./Component/Product";
import Register from "./Component/auth/Register";
import Login from "./Component/auth/Login";
import Panier from "./Component/Panier";
import Command from "./Component/Command";
import { useReducer } from "react";
import { SimpleLineIcons } from '@expo/vector-icons';
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      IsLongin: true,
      tokenAPP: null,
      cart: [],
      user: "ok"
    };
    // this.send_Data();
    this.UpdateToken();
  }
  // this.setState({ object_of_product: object_of_product });
  UserFetch = async () => {
    try {
      let response = await fetch(`http://172.104.156.69:8000/api/infoUser/${this.state.user}`);
      let json = await response.json();
      let array_of_product = json;
      this.setState({ array_of_product: array_of_product });
      console.log(this.state.array_of_product);
    } catch (error) {
      console.error(error);
    }


  }


  storeToken = async (tokenValue) => {
    try {
      await AsyncStorage.setItem("token", tokenValue);

      this.setState({ tokenAPP: tokenValue });
      console.log("je suis dans app",this.state.tokenAPP);
      return tokenValue;
    } catch (e) {
      console.log(e);
    }
  };

  UpdateToken = async () => {Comment
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        this.setState({ tokenAPP: value });
        console.log("getdata", this.state.tokenAPP);
      }
    } catch (e) {
      // error reading value
    }
  };

  HomeStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen 
        name="Home" 
        component={Home}
        />
        <Stack.Screen 
        name="Product" 
        initialParams={{ id: 0, onAddProduct: selectedProduct => this.setState({cart: [...this.state.cart, selectedProduct]})} } 
        component={Product}
        />
      </Stack.Navigator>
    );
  }

  NavigatorTab = () => {
    if (this.state.tokenAPP != null) {
      return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let SimpleLineIcons
              if (route.name === "HomeStack") {
                iconName = focused ? "home" : "home";
              } else if (route.name === "Panier") {
                iconName = focused ? "shoppingcart" : "shoppingcart";
              }
              else if (route.name === "Commmande") {
                iconName = focused ? "creditcard" : "creditcard";
              }
              // You can return any component that you like here!
              return <AntDesign name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
          }}
        >
          <Tab.Screen name="HomeStack" component={this.HomeStack} />
          {/* <Tab.Screen name="Settings" component={() => <Product {}  /> */}
          <Tab.Screen name="Panier" children={() => <Panier cart={this.state.cart} />} />
          <Tab.Screen name="Commmande" component={() => <Command UnLogged={token => { this.setState({tokenAPP: token})}} />} />
        </Tab.Navigator>
      );
    } else {
      return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Register") {
                iconName = focused ? "addusergroup" : "addusergroup";
              } else if (route.name === "Login") {
                iconName = focused ? "login" : "login";
              }

              // You can return any component that you like here!
              return <AntDesign name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
          }}
        >
          <Tab.Screen name="Register"  children={() => <Register  onUserRegister={token => { this.setState({tokenAPP: token} )}} /> } />
          <Tab.Screen name="Login" children={() => <Login  onUserLogged={token => { this.setState({tokenAPP: token})}} /> }/>
          {/* // () => <Login onUserLogged={(token) => { this.setState({tokenAPP: token})}} /> */}
        </Tab.Navigator>
      );
    }
  };


  render() {
    return <NavigationContainer>{this.NavigatorTab()}</NavigationContainer>;
  }
}

// <>
//   {service.isConnected() &&

//   }
// </>
