import React, { Component } from "react";
import { StyleSheet } from "react-native";
import OptionsMenu from "react-native-options-menu";

import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../utils/responsiveDesign";

/**3 dot button, that shows a dropdown menu
 * used in selected artefacts page to "edit" or "delete" the artefact
 */
class OptionButton extends Component {
  constructor(props) {
    super(props);
  }

  // only show options that have been included (remove blank spaces)
  showButtons = () => {
    var optionList = [];

    if (this.props.firstOption !== undefined) {
      optionList.push(this.props.firstOption);
    }
    if (this.props.secondOption !== undefined) {
      optionList.push(this.props.secondOption);
    }
    if (this.props.thirdOption !== undefined) {
      optionList.push(this.props.thirdOption);
    }
    return optionList;
  };

  // only shows the functional toggles for each button available
  toggleButtons = () => {
    var toggleList = [];

    if (this.props.toggleFirstOption !== undefined) {
      toggleList.push(this.props.toggleFirstOption);
    }
    if (this.props.toggleSecondOption !== undefined) {
      toggleList.push(this.props.toggleSecondOption);
    }
    if (this.props.toggleThirdOption !== undefined) {
      toggleList.push(this.props.toggleThirdOption);
    }
    return toggleList;
  };

  render() {
    return (
      <OptionsMenu
        button={require("../../assets/images/icons/option.png")}
        buttonStyle={styles.icon}
        destructiveIndex={1} // only on ios (red indicator)
        options={this.showButtons()}
        actions={this.toggleButtons()}
      />
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: wd(0.04),
    height: wd(0.04),
    marginVertical: wd(0.05),
    marginHorizontal: wd(0.02),
    resizeMode: "cover"
  }
});

export default OptionButton;
