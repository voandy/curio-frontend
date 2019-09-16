import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    Image,
    TouchableOpacity
} from "react-native";

// custom responsive design component
import {
    deviceHeigthDimension as hp,
    deviceWidthDimension as wd,
} from "../utils/responsiveDesign"

class UserDetail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={ styles.container }>
                {/* <Text style={ styles.comment }>{this.props.comment}</Text> */}
                <Text style={ styles.comment }>Omaewa Mo shindeiru</Text>
                
                
                <View style={ styles.user }>


                </View>

                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: wd(0.1),
        alignItems: "center",
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').width * 0.15,
    },

    comment:{
        fontFamily: "HindSiliguri-Regular",
        width: Dimensions.get('window').width * 0.8,
        borderWidth: 1,
        borderRadius: 5,
    },

    user: {
        flexDirection: "row",
    },  
});


// export
export default UserDetail;