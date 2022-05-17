import {Text, View} from 'react-native';
import React, {Component} from 'react';

export class Ahmet extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text>{this.props.kutay}</Text>
      </View>
    );
  }
}

export default Ahmet;
