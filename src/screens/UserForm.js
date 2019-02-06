import React, { Component } from 'react';
import t from 'tcomb-form-native';
import { TouchableHighlight, Text, View } from 'react-native';
import styles from '../style.js'
import { MlabaApi } from '../service/MlabaApi.js';
import { StorageHelper} from '../service/Storage';


var DeviceInfo = require('react-native-device-info');

type Props = {};
const User = t.struct({
    name: t.String
});
var options = {
    label: 'User Details',
    auto: 'placeholders',
    fields: {
        password: {
            secureTextEntry: true
        }
    }
}

const Form = t.form.Form;

export default class UserForm extends Component<Props>{
    static navigationOptions = {
        title: 'Welcome',
    };
    constructor(props) {
        super(props);
        this.state = { value: null, deviceId: null };
        this.onChange = this.onChange.bind(this)
    }
    componentDidMount() {
        var id = DeviceInfo.default.getUniqueID();
        this.setState({ deviceId: id });
        
        this.checkPlayer(id);
    }
    checkPlayer(id){
        MlabaApi.getPlayerByDevice(id)
            .then( response => {
                //console.log(response);
                if(response && response.id > 0){
                    StorageHelper.put("player", response);
                    this.props.navigation.navigate("Lobby");
                }
            });
    }
    onChange(value) {
        this.setState({ value: value });
    }
    onPress = () => {
        MlabaApi.addPlayerApi({ name: this.state.value.name, deviceId: this.state.deviceId })
            .then(response => {
                if (response.id > 0){
                    StorageHelper.put("player", response);
                    this.props.navigation.navigate("Lobby");
                }
            });
    }
    render() {
        return (
            <View style={styles.container}>
                <Form ref="form"
                    onChange={this.onChange}
                    value={this.state.value}
                    type={User}
                    options={options} />
                <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </View>
        );
    }
}