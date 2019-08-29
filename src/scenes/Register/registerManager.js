import React, { Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  StyleSheet,
  Text
} from "react-native";
import { C } from "../../actions/registerTypes";
import {
  getName,
  getEmail,
  getPassword,
  getPhoto
} from "../../actions/registerActions";
import MyButton from "../../component/MyButton";

// Load new page after each completed stage in sign up
class RegisterManager extends Component {
  render() {
    switch (this.props.registerStage) {
      case C.GET_NAME:
        return (
          <View>
            {/* name */}
            <Text style={styles.inputText}>Hey, first tell us your name!</Text>
            <TextInput
              style={styles.input}
              placeholder="Jon Snow"
              autoCapitalize="none"
              placeholderTextColor="#868686"
              onChangeText={val => this.props.nameHandler(val)}
            />
            {/* <Text style={styles.error}> {errors.name} </Text> */}
            <View styles={styles.nextButtonContainer}>
              <MyButton text="Next" />
            </View>
          </View>
        );
      default:
        return (
          <View>
            <Text>error 404</Text>
          </View>
        );
    }
  }
  // switch (register_stage) {
  //   case C.GET_NAME:
  //     return (
  //       <View>
  //         {/* name */}
  //         <Text style={styles.inputText}> Hey, first tell us your name! </Text>
  //         <TextInput
  //           style={styles.input}
  //           placeholder="Jon Snow"
  //           autoCapitalize="none"
  //           placeholderTextColor="#868686"
  //           onChangeText={val => this.props.nameHandler(val)}
  //         />
  //         {/* <Text style={styles.error}> {errors.name} </Text> */}
  //       </View>
  //     );
  // case 1:
  //   return (
  //     <View>
  //       {/* email */}
  //       <Text style={styles.inputText}> Now, enter your email address! </Text>
  //       <TextInput
  //         style={styles.input}
  //         placeholder="abc@email.com"
  //         autoCapitalize="none"
  //         placeholderTextColor="#868686"
  //         onChangeText={val => this.onChangeText("email", val)}
  //       />
  //       {/* <Text style={styles.error}> {errors.email} </Text> */}
  //     </View>
  //   );
  // case 2:
  //   return (
  //     <View>
  //       <Text style={[styles.inputText, styles.passwordSpacing]}>
  //         {" "}
  //         Great, create your unique password!{" "}
  //       </Text>

  //       {/* password */}
  //       <Text style={[styles.inputText, styles.password]}> Password: </Text>
  //       <TextInput
  //         style={styles.input}
  //         secureTextEntry={true}
  //         autoCapitalize="none"
  //         placeholderTextColor="#868686"
  //         onChangeText={val => this.onChangeText("password", val)}
  //       />
  //       {/* <Text style={styles.error}> {errors.password} </Text> */}

  //       {/* Cfm password */}
  //       <Text style={[styles.inputText, styles.password]}>
  //         {" "}
  //         Confirm Password:{" "}
  //       </Text>
  //       <TextInput
  //         style={styles.input}
  //         secureTextEntry={true}
  //         autoCapitalize="none"
  //         placeholderTextColor="#868686"
  //         onChangeText={val => this.onChangeText("passwordCfm", val)}
  //       />
  //       {/* <Text style={styles.error}> {errors.passwordCfm} </Text> */}
  //     </View>
  //   );
  // case 3:
  //   return <View></View>;
  //   default:
  //     return (
  //       <View>
  //         <Text>error 404</Text>
  //       </View>
  //     );
  // }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center"
  // },
  // titleText: {
  //   fontSize: 30,
  //   fontWeight: "bold",
  //   alignSelf: "flex-start",
  //   marginLeft: Dimensions.get("window").width * 0.07
  //   // fontFamily: 'HindSiliguri-Bold'
  // },
  // subTitleText: {
  //   fontSize: 25,
  //   marginBottom: 50,
  //   fontWeight: "bold",
  //   alignSelf: "flex-start",
  //   marginLeft: Dimensions.get("window").width * 0.07
  //   // fontFamily: 'HindSiliguri-Bold'
  // },
  // card: {
  //   width: Dimensions.get("window").width * 0.9,
  //   height: Dimensions.get("window").height * 0.6,
  //   borderColor: "#E2E2E2",
  //   borderRadius: 30,
  //   borderTopWidth: 0.5,
  //   borderRightWidth: 2,
  //   borderLeftWidth: 0.5,
  //   borderBottomWidth: 2,
  //   marginBottom: 50,
  //   alignContent: "center",
  //   alignItems: "center"
  // },
  input: {
    width: Dimensions.get("window").width * 0.78,
    height: 30,
    marginTop: 20,
    backgroundColor: "white",
    borderBottomWidth: 0.5,
    fontSize: 16
  },
  inputText: {
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: Dimensions.get("window").width * 0.05,
    marginTop: 30,
    fontSize: 20
  },
  nextButtonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "red"
  }
  // button: {
  //   justifyContent: "center",
  //   backgroundColor: "#FF6E6E",
  //   width: Dimensions.get("window").width * 0.4,
  //   height: 50,
  //   margin: 10,
  //   borderRadius: 40,
  //   elevation: 3,
  //   position: "absolute",
  //   bottom: 40
  // },
  // buttonText: {
  //   fontSize: 18,
  //   fontWeight: "bold",
  //   alignSelf: "center",
  //   color: "white"
  //   // fontFamily: 'HindSiliguri-Regular'
  // },
  // passwordSpacing: {
  //   marginBottom: 30
  // },
  // password: {
  //   marginTop: 5,
  //   fontSize: 16
  // },
  // error: {
  //   color: "red"
  // }
});

export default RegisterManager;
