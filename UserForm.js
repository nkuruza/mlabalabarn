import React, {Component} from 'react';
import t from 'tcomb-form-native';
import {TouchableHighlight, Text, View} from 'react-native';
import styles from './style.js'

type Props = {};
const User = t.struct({
    username: t.String
});
var options = {
    label: 'User Details',
    auto: 'placeholders',
    fields:{
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
        this.state = { value: null };
        this.onChange = this.onChange.bind(this)
    }
    onChange(value) {
        this.setState({value: value});
    }
    onPress = () =>{
        this.props.navigation.navigate("Game");
    }
    render() {
        return (
            <View style={styles.container}>
                <Form ref="form"
                 onChange={this.onChange}
                 value={this.state.value} 
                 type={User} 
                 options={options}/>
                <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </View>
        );
    }
}