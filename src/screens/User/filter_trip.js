// import libraries
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../../redux/actions';
import CustomHeader from '../../components/header';
import CustomButton from '../../components/button';
import CustomDatePicker from '../../components/datepicker';
import { Color } from '../../theme/theme';
import * as Operator from '../../lib/operator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  radioView: {
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginVertical: 40,
  },
  bottomView: {
    alignItems: 'center',
  },
});

const FilterOptions = [
  { label: 'Filter By StartDate', value: 0 },
  { label: 'Filter By EndDate', value: 1 },
];

export class UserFilterTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: 0,
      startDate: this.props.filterOption.from,
      endDate: this.props.filterOption.to,
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onFilter() {
    const { startDate, endDate } = this.state;
    const option = {
      by: this.state.filterValue,
      from: startDate === undefined ? Operator.getDateWithFormat(new Date().getTime()) : startDate,
      to: endDate === undefined ? Operator.getDateWithFormat(new Date().getTime()) : endDate,
    };
    // alert(JSON.stringify(option));
    this.props.setFilterOption(option);
    this.props.navigation.goBack();
  }

  onCancelFilter() {
    this.props.setFilterOption({});
    this.props.navigation.goBack();
  }

  render() {
    const { startDate, endDate } = this.state;
    const { filterOption } = this.props;
    return (
      <View style={styles.container}>
        <CustomHeader
          left="ios-arrow-back"
          title="Filter Option"
          onPressLeft={() => this.props.navigation.goBack()}
        />
        <View style={{ flex: 1, backgroundColor: Color.white }}>
          <RadioForm
            radio_props={FilterOptions}
            initial={filterOption.by}
            onPress={(value) => this.setState({ filterValue: value })}
            style={styles.radioView}
          />

          <View style={styles.bottomView}>
            <CustomDatePicker date={startDate} future front="From" onSelect={date => this.setState({ startDate: date })} />
            <CustomDatePicker date={endDate} future front="To" onSelect={date => this.setState({ endDate: date })} />
            <CustomButton testID="filter" onPress={this.onFilter.bind(this)} text="Filter" />
            <CustomButton testID="cancel-filter" onPress={this.onCancelFilter.bind(this)} text="Cancel Filter" />
          </View>
        </View>
      </View>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  myProfile: state.myProfile,
  filterOption: state.filterOption,
}), mapDispatchToProps)(UserFilterTrip);
