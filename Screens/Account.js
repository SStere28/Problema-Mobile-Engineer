import { Text, TextInput, View, TouchableOpacity, Image, StatusBar, StyleSheet, Alert } from "react-native";
import React, { useState, useEffect   } from "react";

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
          console.log("Merge "+ responseJson);
        }).catch(err => console.error(err)); 
      };
    

     return (
        <View style={styles.container}>
               
     <Text > Name</Text>
     <Text > { user.name}</Text>
     <Text > Avatar</Text>
     <Text > { user.avatar}</Text>
     <Text > Email</Text>
     <Text > { user.email}</Text>

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
export default Account;