import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  Linking,
  SafeAreaView,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  ImageBackground,
  Share} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
class App extends Component {

  state = {
    inputUrl: "Qr Kodu Okutunuz"
  }

  onSuccess = e => {
    this.setState({ inputUrl: e.data })

  };
  openUrl() {
    Linking.openURL(this.state.inputUrl).catch(err =>
      alert('Lütfen Tekrar Deneyiniz')
    );
  };
  onShare = async () => {

    try {
      const result = await Share.share({
        title: 'QR Kod Linki:',
        message: `Web sitesine gitmek için QR kod linkine tıklayın , QR Kod Link :${this.state.inputUrl}`,
        url: this.state.inputUrl
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert('Beklenmedik Hata Oldu Daha Sonra Tekrar Deneyiniz');
    }
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.centerText}>
            Lütfen QR kod üzerine kameranızı yaklaştırınız !
            </Text>
        </View>
        <View style={styles.cameraContainer}>
          <QRCodeScanner
            onRead={this.onSuccess.bind(this)}
            showMarker={true}
            reactivate={true}
            reactivateTimeout={100}
          />
        </View>
        <View style={styles.footerContainer}>
          <TextInput
            style={{ height: '70%', width: '80%', borderColor: 'gray', borderWidth: 1, textAlign: 'center', color: 'red' }}
            editable={false}
            value={this.state.inputUrl}
          />
          <TouchableOpacity onPress={() => this.onShare()}>
            <View>
              <ImageBackground source={require('./image/share.png')}
                resizeMode='center'
                style={{ width: 50, height: 35 }} />

            </View>
          </TouchableOpacity>

        </View>
        <View style={styles.buttonStyle}>
          <Button color="#33BDE6" title="LİNKİ AÇ" onPress={this.openUrl.bind(this)} />

        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8bee9'
  },
  headerContainer: {
    flex: 1
  },
  cameraContainer: {
    flex: 25,
  },
  footerContainer: {
    display: 'flex',
    position: "absolute",
    bottom: 40,
    flexDirection: 'row',
    paddingLeft: 25
  },
  centerText: {
    fontSize: 16,
    paddingTop: '13%',
    paddingLeft: 13,
    color: 'crimson',
    fontWeight: 'bold'
  },
  buttonStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5
  }

});

export default App;
