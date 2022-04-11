import { Text, TextInput, View, TouchableOpacity, Image, StatusBar, StyleSheet, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { Checkbox } from 'react-native-paper';
import  AsyncStorage  from '@react-native-async-storage/async-storage';

const Login =(props) =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(false);

    useEffect(() => {
      checkAccount();

     }, [])

    const checkAccount  = async ()=>{
      
        try {
          const value = await AsyncStorage.getItem("User");
          if (value !== null) {
          return props.navigation.navigate("Home", {userId: JSON.parse(value).userId});
          }
        } catch (error) {
        }
    }

    const addLogin = () => {
        let item={email, password};

        if(email.length>0 && password.length>0){
        fetch(`https://624826c94bd12c92f4080a60.mockapi.io/login`, {
          method: 'POST',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify(item)
        }).then( (result) => {
          result.json().then( (resp) => {
            console.log("Login merge "+JSON.stringify(resp));
            if(checked){
               AsyncStorage.setItem("User",JSON.stringify(resp));
              console.log("Salvare date in cache "+JSON.stringify(resp));
            }
            setPassword("");
            setEmail("");
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
              value={email}
              onChangeText={(email) => setEmail(email)}
            />
          </View>
     
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password."
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              value={password}
              onChangeText={(password) => setPassword(password)}
            />
          </View>
          <View  style={{flexDirection: "row",} }>
          <Text style={{marginTop:8}}> Remember me</Text>
          <Checkbox
           
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => {
        setChecked(!checked);
      }}
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