// import libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Color } from '../theme/theme';
import { dySize } from '../theme/screen-size';
import * as Operator from '../lib/operator';

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  frontText: {
    width: dySize(70),
    color: Color.text,
  },
});

export default class CustomDatePicker extends Component {
    static propTypes = {
      onSelect: PropTypes.func.isRequired,
      date: PropTypes.string,
      placeholder: PropTypes.string,
      mode: PropTypes.string,
      front: PropTypes.string,
      minDate: PropTypes.string,
    }

    static defaultProps = {
      mode: 'date',
      date: '',
      front: '',
      placeholder: '',
      minDate: '',
    }

    constructor(props) {
      super(props);
      this.state = {

      };
    }

    componentDidMount() {
      // alert(Operator.getDateWithFormat(new Date().getTime()))
    }

    render() {
      const {
        date, mode, front, placeholder,
      } = this.props;
      return (
        <View style={styles.container}>
          <Text style={styles.frontText}>{front}</Text>
          <DatePicker
            style={{ width: dySize(250) }}
            date={date}
            mode={mode}
            placeholder={placeholder}
            format="YYYY-MM-DD"
            minDate={Operator.getDateWithFormat(new Date().getTime())}
            maxDate="2020-01-01"
            confirmBtnText="Select"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
              },
              dateInput: {
                  marginLeft: 36,
              },
            // ... You can check the source to find the other keys.
            }}
            onDateChange={dt => this.props.onSelect(dt)}
          />
        </View>
      );
    }
}

