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
// import all register Constants
import { C } from "../../actions/registerTypes";
// import {
//   getName,
//   getEmail,
//   getPassword,
//   getPhoto
// } from "../../actions/registerActions";
// import reusable component
import MyButton from "../../component/MyButton";
// import widht/height responsive functions
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd,
  setToBottom
} from "../../utils/responsiveDesign";

// Load new page after each completed stage in sign up
class RegisterManager extends Component {
  render() {
    switch (this.props.registerStage) {
      case C.GET_NAME:
        return (
          <View style={styles.cardContainer}>
            {/* name */}
            <Text style={styles.inputText}>Hey, first tell us your name!</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Jon Snow"
              autoCapitalize="none"
              placeholderTextColor="#868686"
              onChangeText={val => this.props.nameHandler(val)}
            />
            {/* <Text style={styles.error}> {errors.name} </Text> */}
            {setToBottom(
              <MyButton
                onPress={() => this.props.stageHandler(C.GET_EMAIL)}
                text="Next"
              />
            )}
          </View>
        );
      case C.GET_EMAIL:
        return (
          <View style={styles.cardContainer}>
            {/* email */}
            <Text style={styles.inputText}>Now, enter your email address!</Text>
            <TextInput
              style={styles.inputField}
              placeholder="abc@email.com"
              autoCapitalize="none"
              placeholderTextColor="#868686"
              onChangeText={val => this.props.emailHandler(val)}
            />
            {/* <Text style={styles.error}> {errors.email} </Text> */}
            {setToBottom(
              <MyButton
                onPress={() => this.props.stageHandler(C.GET_PASSWORD)}
                text="Next"
              />
            )}
          </View>
        );
      case C.GET_PASSWORD:
        return (
          <View style={styles.cardContainer}>
            <Text style={[styles.inputText, styles.passwordTitle]}>
              Great, create your unique password!
            </Text>

            {/* password */}
            <Text style={[styles.inputText, styles.passwordFieldTitle]}>
              {" "}
              Password:{" "}
            </Text>
            <TextInput
              style={[styles.inputField, styles.passwordField]}
              secureTextEntry={true}
              autoCapitalize="none"
              placeholderTextColor="#868686"
              onChangeText={val => this.onChangeText("password", val)}
            />
            {/* <Text style={styles.error}> {errors.password} </Text> */}

            {/* Cfm password */}
            <Text style={[styles.inputText, styles.passwordFieldTitle]}>
              {" "}
              Confirm Password:{" "}
            </Text>
            <TextInput
              style={[styles.inputField, styles.passwordField]}
              secureTextEntry={true}
              autoCapitalize="none"
              placeholderTextColor="#868686"
              onChangeText={val => this.onChangeText("passwordCfm", val)}
            />
            {/* <Text style={styles.error}> {errors.passwordCfm} </Text> */}
            {setToBottom(
              <MyButton
                onPress={() => this.props.stageHandler(C.GET_PHOTO)}
                text="Next"
              />
            )}
          </View>
        );

      case C.GET_PHOTO:
        return (
          <View>
            <Text>Get Photo Stage</Text>
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
  //       <Text style={[styles.inputText, styles.passwordTitle]}>
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
  cardContainer: {
    flex: 1,
    flexDirection: "column",
    padding: wd(0.05)
  },
  inputField: {
    textAlign: "center",
    width: wd(0.7),
    height: hp(0.05),
    marginTop: 20,
    backgroundColor: "white",
    borderBottomWidth: 0.5,
    fontSize: 16,
    alignSelf: "center"
  },
  inputText: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: hp(0.026)
  },

  passwordTitle: {
    marginBottom: hp(0.024),
    fontSize: hp(0.024)
  },
  passwordFieldTitle: {
    fontSize: hp(0.022),
    alignSelf: "flex-start",
    marginLeft: wd(0.015)
  },
  passwordField: {
    marginTop: hp(0.01),
    fontSize: hp(0.02),
    height: hp(0.03),
    marginBottom: hp(0.05)
  }
  // error: {
  //   color: "red"
  // }
});

export default RegisterManager;
