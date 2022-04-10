import { Text, TextInput, View, TouchableOpacity, Image, StatusBar, StyleSheet, Alert } from "react-native";
import React, { useState, useEffect   } from "react";
import  AsyncStorage  from '@react-native-async-storage/async-storage';

const Account =(props) =>{

    const [user, setUser] = useState("");

    useEffect(() => {
        console.log(""+props.navigation.getParam("userId"));
     addUser();
       }, [])

    const addUser = () => {
        fetch(`https://624826c94bd12c92f4080a60.mockapi.io/user/${props.navigation.getParam("userId")}`, {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((responseJson)=>{       
          setUser(responseJson);
        }).catch(err => console.error(err)); 
      };

    const logOut = async () =>{
      try {
       await AsyncStorage.removeItem("User");
       props.navigation.navigate("Login");

      } catch (error) {
      }


    }  
    
     return (
        <View style={styles.container}>
           <Text style={styles.TextImput}>Avatar</Text>
               <Image  style={{width: 50, height: 50}} source={{ uri: user.avatar }} />
     <Text style={styles.TextImput}>Name</Text>
     <Text style={styles.Text}> { user.name}</Text>
     <Text style={styles.TextImput}>Email</Text>
     <Text style={styles.Text}> { user.email}</Text>
     <TouchableOpacity style={styles.logoutBtn} onPress={() => logOut() }>
            <Text style={styles.loginText}>LOGOUT</Text>
          </TouchableOpacity>
   </View> 
      );
    }
     
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
      },
     
      image: {
        marginBottom: 40,
      },
     
      Text: {
        height: 5,
       flex: 0.1,
        padding: 5,
        marginLeft: 20,
      },
      TextImput: {
        height: 5,
       flex: 0.1,
        padding: 5,
        marginLeft: 20,
        fontSize: 20
      },
     
      logoutBtn: {
        width: "40%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#4169E1",
      },
    });
export default Account;