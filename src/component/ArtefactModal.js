// import React, { Component } from "react";
// import {
//     View,
//     StyleSheet,
//     Button,
//     Text,
//     TextInput,
//     Dimensions,
//     Image,
//     TouchableOpacity
// } from "react-native";

// import Modal from "react-native-modal";
// import DatePicker from 'react-native-datepicker';


// // custom responsive design component
// import {
//     deviceHeigthDimension as hp,
//     deviceWidthDimension as wd,
//     setToBottom
// } from "../utils/responsiveDesign"

// class ArtefactModal extends Component {

//     constructor(props) {
//         super(props);
//     }

//     render() {

//         return (
//             <Modal isVisible={this.props.isModalVisible} onRequestClose={this.props.toggleModal}>
//                 <View style={{ backgroundColor: "white", flex: 1 }}>








// {/* 
//                     <TextInput
//                         placeholder="Add Title"
//                         autoCapitalize="none"
//                         placeholderTextColor="#868686"
//                         // onChangeText={value => this.onNewArtefactChange("title", value)}
//                         // value={this.state.newArtefact.title}
//                     />

//                     <TextInput
//                         placeholder="Description"
//                         autoCapitalize="none"
//                         placeholderTextColor="#868686"
//                         // onChangeText={value => this.onNewArtefactChange("description", value)}
//                         // value={this.state.newArtefact.description}
//                     />

//                     <TextInput
//                         style={styles.inputField}
//                         placeholder="Category"
//                         autoCapitalize="none"
//                         placeholderTextColor="#868686"
//                         // onChangeText={(value) => this.onNewArtefactChange("category", value)}
//                         // value={this.state.newArtefact.category}
//                     />

//                     <DatePicker
//                         style={{ width: 200 }}
//                         // date={this.state.newArtefact.dateObtained}
//                         mode="date"
//                         // value={this.state.newArtefact.dateObtained}
//                         placeholder="select date"
//                         format="YYYY-MM-DD"
//                         // minDate="2016-05-01"
//                         // maxDate="2016-06-01"
//                         confirmBtnText="Confirm"
//                         cancelBtnText="Cancel"
//                         customStyles={{
//                             dateIcon: {
//                                 position: 'absolute',
//                                 left: 0,
//                                 top: 4,
//                                 marginLeft: 0
//                             },
//                             dateInput: {
//                                 marginLeft: 36
//                             }
//                             // ... You can check the source to find the other keys.
//                         }}
//                         // onDateChange={(date) => this.onNewArtefactChange("dateObtained", date)}
//                     /> */}

//                     {/* Image button */}
//                     {/* <TouchableOpacity activeOpacity={0.5} onPress={this._pickImage}>
//                         {this.state.newArtefact.imageURL !== "" ? (
//                             <Image
//                                 style={[styles.profilePic, styles.profilePicBorder]}
//                                 source={{ uri: this.state.newArtefact.imageURL }}
//                             />
//                         ) : (
//                                 <Image
//                                     style={styles.profilePic}
//                                     source={require("../../../assets/images/plus-profile-pic.png")}
//                                 />
//                             )}
//                     </TouchableOpacity> */}

//                     <Button
//                         title="Post Artefact"
//                         // onPress={() => this.postNewArtefact()}
//                     />
//                 </View>
//             </Modal>
//         );
//     }
// }

// const styles = StyleSheet.create({
// });


// export default ArtefactModal;
