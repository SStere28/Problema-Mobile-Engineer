import { Text, TextInput, View, TouchableOpacity, Image, StatusBar, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";

const Login =(props) =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const addLogin = () => {
        let item={email, password};
        console.log(email+" ep "+password);
        if(email.length>0 && password.length>0){
        fetch(`https://624826c94bd12c92f4080a60.mockapi.io/login`, {
          method: 'POST',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify(item)
        }).then((result) => {
          result.json().then((resp) => {
            console.log("Login merge "+resp.userId);
         
          return props.navigation.navigate("Home", {userId: resp.userId});
          })
        })
      }else {
       showAlert();
        }
    }
    const showAlert = () =>{
        Alert.alert(
           'Insert Username and Password'
        )
     }

     return (
        <View style={styles.container}>
          <Image style={styles.image} source={require("../assets/favicon.png")} />
     
          <StatusBar style="auto" />
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email."
              placeholderTextColor="#003f5c"
              onChangeText={(email) => setEmail(email)}
            />
          </View>
     
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password."
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>
     
     
          <TouchableOpacity style={styles.loginBtn} onPress={() =>addLogin()}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      );
    }
     
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
     
      image: {
        marginBottom: 40,
      },
     
      inputView: {
        backgroundColor: "#DCDCDC",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
     
        alignItems: "center",
      },
     
      TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
      },
     
     
      loginBtn: {
        width: "40%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#4169E1",
      },
    });
export default Login;