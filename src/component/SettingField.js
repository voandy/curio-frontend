import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";

// import reusable components
import {
    deviceHeigthDimension as hp,
    deviceWidthDimension as wd
} from "../utils/responsiveDesign";

class SettingField extends Component {
    constructor(props) {
        super(props);
    }

    // placeholder for editable settings
    editableColour = () => {

        // can edit
        if (this.props.editable === true) {
            return {
                color: "#000000"   // black
            }
        }
        // can't edit
        else {
            return {
                color: "#939090"   // gray
            }
        }
    }

    render() {
        return (

            <View style={styles.container}>

                <View style={{ flex: 0.35 }}>
                    <Text style={styles.fieldName}>{this.props.field}</Text>
                </View>

                <View style={{ flex: 0.65 }}>
                    <Text style={[styles.fieldInput, this.editableColour()]}>{this.props.input}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        width: wd(0.8),
        height: wd(0.1),
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        flexDirection: "row",
    },

    fieldName: {
        fontFamily: 'HindSiliguri-Bold',
        fontSize: 16,
    },

    fieldInput: {
        fontFamily: 'HindSiliguri-Regular',
    }
});

export default SettingField;
