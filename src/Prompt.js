import React, { Component } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

export default class Prompt extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    placeholder: PropTypes.string.isRequired,
    cancelText: PropTypes.string,
    submitText: PropTypes.string,
    isTransparent: PropTypes.bool,
    cancelButtonStyle: PropTypes.object,
    submitButtonStyle: PropTypes.object,
    cancelButtonTextStyle: PropTypes.object,
    submitButtonTextStyle: PropTypes.object,
    titleStyle: PropTypes.object,
    onChangeText: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    textInputProps: PropTypes.object
  };

  static defaultProps = {
    title: 'Title',
    visible: false,
    placeholder: 'Placeholder',
    cancelText: 'Cancel',
    submitText: 'Submit',
    textInputProps: {},
    cancelButtonStyle: {},
    cancelButtonTextStyle: {},
    submitButtonStyle: {},
    submitButtonTextStyle: {},
    titleStyle: {},
    isTransparent: true,
    onChangeText: () => {},
    onSubmit: () => {},
    onCancel: () => {}
  };

  state = { value: '' };

  _onChangeText = value => {
    this.setState({ value });
    this.props.onChangeText(value);
  };

  _onSubmit = () => {
    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  };

  _onCancel = () => {
    this.props.onCancel();
    this.setState({ value: '' });
  };
  render() {
    return (
      <Modal
        transparent={this.props.isTransparent}
        animationType="fade"
        visible={this.props.visible}
        onRequestClose={this._onCancel}
      >
        <View style={styles.screenOverlay}>
          <View style={styles.dialogPrompt}>
            <Text style={[styles.title, this.props.titleStyle]}>
              {this.props.title}
            </Text>
            <TextInput
              placeholder={this.props.placeholder}
              style={styles.textInput}
              onChangeText={this._onChangeText}
              onSubmitEditing={this._onSubmit}
              autoFocus={true}
              {...this.props.textInputProps}
            />
            <View style={styles.buttonsOuterView}>
              <View style={styles.buttonsInnerView}>
                <TouchableOpacity
                  style={[styles.button, this.props.cancelButtonStyle]}
                  onPress={this._onCancel.bind(this)}
                >
                  <Text
                    style={[
                      styles.cancelButtonText,
                      this.props.cancelButtonTextStyle
                    ]}
                  >
                    {this.props.cancelText}
                  </Text>
                </TouchableOpacity>
                <View style={styles.buttonsDivider} />
                <TouchableOpacity
                  style={[styles.button, this.props.submitButtonStyle]}
                  onPress={this._onSubmit.bind(this)}
                >
                  <Text
                    style={[
                      styles.submitButtonText,
                      this.props.submitButtonTextStyle
                    ]}
                  >
                    {this.props.submitText}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
