import React, { Component } from "react";

import {
    StyleSheet,
    ScrollView,
    View,
    StatusBar,
    TextInput,
    Image,
    Text
} from "react-native";

// Custom component
import SearchFeed from "../../../component/SearchFeed";

// responsive design component
import {
    deviceWidthDimension as wd
} from "../../../utils/responsiveDesign";


export default class UserSearch extends Component {

    // TODO change this when results fill in after search
    state = {
        searchResults: 0
    }

    // Nav bar details
    static navigationOptions = {
        header: null
    };

    render() {

        // navigation in app
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>

                {/* search header */}
                <View style={styles.search}>
                    <TextInput

                        // TODO add onsubmit func
                        onSubmitEditing={this.props.onSubmit}
                        underlineColorAndroid="transparent"
                        pointerEvents="none"
                        placeholder="Search"
                        placeholderTextColor="#707070"
                        style={[styles.searchText, styles.font]}
                    />
                    <Image
                        style={styles.searchIcon}
                        source={require("../../../../assets/images/icons/search.png")}
                    />
                </View>

                {/* scrollable area for CONTENT */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                >

                    {this.state.searchResults === 0 ? (
                        <View style={styles.emptySearch}>
                            <Text style={styles.font}>Search for users to add into the group</Text>
                        </View>
                    ) : (
                            <View>
                                <SearchFeed heading="Bob" subHeading="bob" isGroup={false}
                                    image={require("../../../../assets/images/test-delete-this/boi1.jpg")} />
                                <SearchFeed heading="Sarah" subHeading="sarahLeee" isGroup={false}
                                    image={require("../../../../assets/images/test-delete-this/boi2.jpg")} />
                                <SearchFeed heading="MEME LEGEND" subHeading="5" isGroup={true}
                                    image={require("../../../../assets/images/test-delete-this/boi4.jpg")} />
                            </View>
                        )}



                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    },

    font: {
        fontFamily: "HindSiliguri-Bold"
    },

    search: {
        flexDirection: "row",
        marginHorizontal: wd(0.07),
        backgroundColor: "white",
        elevation: 9,
        marginVertical: 25,
        height: 45,
        borderRadius: 10
    },

    searchText: {
        flex: 1,
        marginLeft: 20,
        alignSelf: "center",
    },

    searchIcon: {
        width: 20,
        height: 20,
        alignSelf: "center",
        marginRight: 20,
        tintColor: "#707070"
    },

    emptySearch: {
        alignItems: "center",
        marginVertical: wd(0.2)
    }
});
