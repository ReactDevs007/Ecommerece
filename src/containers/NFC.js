/* eslint-disable */
import React, { Component } from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Linking,
  TextInput,
  ScrollView,
} from 'react-native';
import NfcManager, { NdefParser } from 'react-native-nfc-manager';

const RtdType = {
  URL: 0,
  TEXT: 1,
};

function strToBytes(str) {
  const result = [];
  for (let i = 0; i < str.length; i++) {
    result.push(str.charCodeAt(i));
  }
  return result;
}

function buildUrlPayload(valueToWrite) {
  const urlBytes = strToBytes(valueToWrite);
  // in this example, we always use `http://`
  const headerBytes = [0xD1, 0x01, (urlBytes.length + 1), 0x55, 0x03];
  return [...headerBytes, ...urlBytes];
}

function buildTextPayload(valueToWrite) {
  const textBytes = strToBytes(valueToWrite);
  // in this example. we always use `en`
  const headerBytes = [0xD1, 0x01, (textBytes.length + 3), 0x54, 0x02, 0x65, 0x6e];
  return [...headerBytes, ...textBytes];
}

class NFC extends Component {
  state = {
    supported: true,
    enabled: false,
    isWriting: false,
    urlToWrite: 'www.google.com',
    rtdType: RtdType.TEXT,
    parsedText: null,
    tag: {},
  };

  componentDidMount() {
    NfcManager.isSupported()
      .then((supported) => {
        this.setState({ supported });
        if (supported) {
          this._startNfc();
        }
      });
  }

  componentWillUnmount() {
    if (this._stateChangedSubscription) {
      this._stateChangedSubscription.remove();
    }
  }

  render() {
    const {
      supported, enabled, tag, isWriting, urlToWrite, parsedText, rtdType
    } = this.state;
    return (
      <ScrollView style={{ flex: 1 }}>
        { Platform.OS === 'ios' && <View style={{ height: 60 }} /> }

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>
            {`Is NFC supported ? ${supported}`}
          </Text>
          <Text>
            {`Is NFC enabled (Android only)? ${enabled}`}
          </Text>

          <TouchableOpacity style={{ marginTop: 20 }} onPress={this._startDetection}>
            <Text style={{ color: 'blue' }}>
Start Tag Detection
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginTop: 20 }} onPress={this._stopDetection}>
            <Text style={{ color: 'red' }}>
Stop Tag Detection
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginTop: 20 }} onPress={this._clearMessages}>
            <Text>
Clear
            </Text>
          </TouchableOpacity>

          {
            <View style={{ padding: 10, marginTop: 20, backgroundColor: '#e0e0e0' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <TextInput
                  style={{ width: 200 }}
                  value={urlToWrite}
                  onChangeText={urlToWrite => this.setState({ urlToWrite })}
                />
              </View>

              <TouchableOpacity
                style={{
                  marginTop: 20, borderWidth: 1, borderColor: 'blue', padding: 10
                }}
                onPress={isWriting ? this._cancelNdefWrite : this._requestNdefWrite}
              >
                <Text style={{ color: 'blue' }}>
                  {`(android) ${isWriting ? 'Cancel' : 'Write NDEF'}`}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  marginTop: 20, borderWidth: 1, borderColor: 'blue', padding: 10
                }}
                onPress={isWriting ? this._cancelNdefWrite : this._requestFormat}
              >
                <Text style={{ color: 'blue' }}>
                  {`(android) ${isWriting ? 'Cancel' : 'Format'}`}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  marginTop: 20, borderWidth: 1, borderColor: 'blue', padding: 10
                }}
                onPress={isWriting ? this._cancelAndroidBeam : this._requestAndroidBeam}
              >
                <Text style={{ color: 'blue' }}>
                  {`${isWriting ? 'Cancel ' : ''}Android Beam`}
                </Text>
              </TouchableOpacity>
            </View>
          }

          <Text style={{ marginTop: 20 }}>
            {`Current tag JSON: ${JSON.stringify(tag)}`}
          </Text>
          { parsedText && (
            <Text style={{ marginTop: 10, marginBottom: 20, fontSize: 18 }}>
              {`Parsed Text: ${parsedText}`}
            </Text>
          )}
        </View>
      </ScrollView>
    );
  }

  _requestFormat = () => {
    const { isWriting } = this.state;
    if (isWriting) {
      return;
    }

    this.setState({ isWriting: true });
    NfcManager.requestNdefWrite(null, { format: true })
      .then(() => console.log('format completed'))
      .catch(err => console.warn(err))
      .then(() => this.setState({ isWriting: false }));
  };

  _requestNdefWrite = () => {
    const { isWriting, urlToWrite } = this.state;
    if (isWriting) {
      return;
    }

    const bytes = buildTextPayload(urlToWrite);
    this.setState({ isWriting: true });
    NfcManager.requestNdefWrite(bytes)
      .then(() => console.log('write completed'))
      .catch(err => console.warn(err))
      .then(() => this.setState({ isWriting: false }));
  };

  _cancelNdefWrite = () => {
    this.setState({ isWriting: false });
    NfcManager.cancelNdefWrite()
      .then(() => console.log('write cancelled'))
      .catch(err => console.warn(err));
  };

  _requestAndroidBeam = () => {
    const { isWriting, urlToWrite, rtdType } = this.state;
    if (isWriting) {
      return;
    }

    const bytes = buildTextPayload(urlToWrite);

    this.setState({ isWriting: true });
    NfcManager.setNdefPushMessage(bytes)
      .then(() => console.log('beam request completed'))
      .catch(err => console.warn(err));
  };

  _cancelAndroidBeam = () => {
    this.setState({ isWriting: false });
    NfcManager.setNdefPushMessage(null)
      .then(() => console.log('beam cancelled'))
      .catch(err => console.warn(err));
  }

  _startNfc() {
    NfcManager.start({
      onSessionClosedIOS: () => {
        console.log('ios session closed');
      }
    })
      .then((result) => {
        console.log('start OK', result);
      })
      .catch((error) => {
        console.warn('start fail', error);
        this.setState({ supported: false });
      });

    if (Platform.OS === 'android') {
      NfcManager.getLaunchTagEvent()
        .then((tag) => {
          console.log('launch tag', tag);
          if (tag) {
            this.setState({ tag });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      NfcManager.isEnabled()
        .then((enabled) => {
          this.setState({ enabled });
        })
        .catch((err) => {
          console.log(err);
        });
      NfcManager.onStateChanged(
        (event) => {
          if (event.state === 'on') {
            this.setState({ enabled: true });
          } else if (event.state === 'off') {
            this.setState({ enabled: false });
          } else if (event.state === 'turning_on') {
            // do whatever you want
          } else if (event.state === 'turning_off') {
            // do whatever you want
          }
        }
      )
        .then((sub) => {
          this._stateChangedSubscription = sub;
          // remember to call this._stateChangedSubscription.remove()
          // when you don't want to listen to this anymore
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  }

  _onTagDiscovered = (tag) => {
    console.log('Tag Discovered', tag);
    this.setState({ tag });
    const url = this._parseUri(tag);
    if (url) {
      Linking.openURL(url)
        .catch((err) => {
          console.warn(err);
        });
    }

    const text = this._parseText(tag);
    this.setState({ parsedText: text });
  }

  _startDetection = () => {
    NfcManager.registerTagEvent(this._onTagDiscovered)
      .then((result) => {
        console.log('registerTagEvent OK', result);
      })
      .catch((error) => {
        console.warn('registerTagEvent fail', error);
      });
  }

  _stopDetection = () => {
    NfcManager.unregisterTagEvent()
      .then((result) => {
        console.log('unregisterTagEvent OK', result);
      })
      .catch((error) => {
        console.warn('unregisterTagEvent fail', error);
      });
  }

  _clearMessages = () => {
    this.setState({ tag: null });
  }

  _parseUri = (tag) => {
    if (tag.ndefMessage) {
      const result = NdefParser.parseUri(tag.ndefMessage[0]);


      const uri = result && result.uri;
      if (uri) {
        console.log(`parseUri: ${uri}`);
        return uri;
      }
    }
    return null;
  }

  _parseText = (tag) => {
    if (tag.ndefMessage) {
      return NdefParser.parseText(tag.ndefMessage[0]);
    }
    return null;
  }
}

export default NFC;
