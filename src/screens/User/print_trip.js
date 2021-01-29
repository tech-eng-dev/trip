// import libraries
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Content } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RNPrint from 'react-native-print';

import { ActionCreators } from '../../redux/actions';
import CustomHeader from '../../components/header';
import CustomButton from '../../components/button';
import * as Operator from '../../lib/operator';
import { Color } from '../../theme/theme';
import { dySize } from '../../theme/screen-size';

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 15,
  },
  tripItemFront: {
    padding: 10,
    backgroundColor: Color.white,
    borderBottomWidth: 1,
    borderColor: Color.green,
    width: dySize(375),
  },
  tripItemLine: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
  },
  ItemLeftText: {
    width: 100,
    fontSize: 16,
    color: Color.text,
  },
  ItemRightText: {
    flex: 1,
    fontSize: 16,
    color: Color.text,
    height: 20,
  },
  text: {
    color: Color.text,
    padding: 10,
  },
});

class UserPrintTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empty: false,
      printTrips: [],
    };
  }

  componentDidMount() {
    const { myRecords } = this.props;
    const CT = new Date();
    const Month = CT.getMonth();
    let count = 0;
    const temp = [];
    Object.keys(myRecords).map((key) => {
      const trip = myRecords[key];
      if (this.checkForNextMonth(trip, Month)) {
        temp.push(trip);
        count += 1;
      }
      return true;
    });
    if (count === 0) this.setState({ empty: true });
    else this.setState({ printTrips: temp });
  }

  checkForNextMonth(trip, m) {
    return Number(trip.startDate.split('-')[1]) === m + 2;
  }

  async onPrint() {
    const CT = new Date();
    const Month = CT.getMonth();
    let html = `<center><h2>Travel Plans On ${Operator.getMonthString(Month + 1, true)}</h2></center>`;
    const { myRecords } = this.props;
    Object.keys(myRecords).map((key) => {
      const trip = myRecords[key];
      if (Number(trip.startDate.split('-')[1]) === Month + 2) {
        html += `<p><b>Destination: </b><span>${trip.location.description}</span></p>`;
        html += `<p><b>StartDate: </b><span>${trip.startDate}</span></p>`;
        html += `<p><b>EndDate: </b><span>${trip.endDate}</span></p>`;
        html += `<p><b>Comment: </b><span>${trip.comment}</span></p>`;
        html += '<hr>';
      }
      return true;
    });
    html += '<center>Printed by Mobile Application @2018 </center>';
    console.log('Print Html: ', html);
    await RNPrint.print({
      html,
    });
  }

  render() {
    const { empty, printTrips } = this.state;
    return (
      <View testID="print-root" style={{ flex: 1, backgroundColor: Color.white }}>
        <CustomHeader
          left="ios-arrow-back"
          title="Print"
          onPressLeft={() => this.props.navigation.goBack()}
        />
        <Content contentContainerStyle={styles.content}>
          <Text style={styles.text}>You will get printed Trips for next month.</Text>
          {
            empty ?
              <Text style={styles.text}>But you have no travel plans next month.</Text>
            : null
          }
          {
            printTrips.length === 0 ? null
            :
            <CustomButton testID="print" text="Print" onPress={this.onPrint.bind(this)} />
          }
        </Content>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  myRecords: state.myRecords,
}), mapDispatchToProps)(UserPrintTrip);

