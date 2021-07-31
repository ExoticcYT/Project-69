import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class ScanScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal',
    };
  }
  getCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status == 'granted',
      buttonState: 'clicked',
      scanned: false,
    });
  };
  handleBarCodeScanner = async ({ type, data }) => {
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: 'normal',
    });
  };
  render() {
    const hasCameraPermission = this.state.hasCameraPermission;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;
    if (buttonState === 'clicked' && hasCameraPermission) {
      return (
        <BarCodeScanner
          onBarCodeScanned={
            scanned
              ? undefined && Alert.alert('Bar Code is now Scanned')
              : this.handleBarCodeScanner
          }
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else if (buttonState === 'normal') {
      return (
        <View style={styles.container}>
          <Image
            style={styles.imageCropper}
            source={require('../BarCodeScanner.jpg')}
          />
          <Text style={styles.displayText}>
            {' '}
            {hasCameraPermission === true
              ? this.state.scannedData
              : 'Request for Camera permission'}
          </Text>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={this.getCameraPermissions}
            title="Barcode Scanner">
            <Text style={styles.buttonText}>Scan Barcode</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  imageCropper: { height: 110, width: 110 },
  scanButton: { backgroundColor: '#2196F3', padding: 10, margin: 10 },
  buttonText: { fontSize: 20 },
  displayText: {fontSize: 15, textDecorationLine: "underline"}
});
