import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class ScanScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal',
        }
    }

    getCameraPermissions = async () => {

        const {status} = await Permissions.askAsync(Permissions.CAMERA)

        this.setState({
            hasCameraPermissions: status === 'granted',
            buttonState:'clicked',
            scanned : false
        })
    }

    haddleBarCodeScanner = async ({type, data})=>{
        this.setState({
            scanned:true,
            scannedData: data,
            buttonState: 'normal'
        })
    }

    render() {
        const hasCameraPermissions = this.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState

        if (buttonState === 'clicked' && hasCameraPermissions){
            return(
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.haddleBarCodeScanner}
                />
            )
        }

        else if (buttonState === 'normal'){
            return(
            <View>

                <Text>
                    {hasCameraPermissions === true ? this.state.scannedData : "request camera permission"}
                </Text>

                <TouchableOpacity
                onPress = {this.getCameraPermissions}>
                    
                    <Text>
                        scan code
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }
    }

}