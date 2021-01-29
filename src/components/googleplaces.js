// import libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Color } from '../theme/theme';
import { dySize } from '../theme/screen-size';


const Query = {
  // available options: https://developers.google.com/places/web-service/autocomplete
  key: 'AIzaSyCxTEst__Vbg0waRjgtd3dOdDESrTOTZPc',
  language: 'en', // language of the results
};

export default class GooglePlacePicker extends Component {
    static propTypes = {
      onPress: PropTypes.func.isRequired,
      width: PropTypes.number,
      defaultValue: PropTypes.string,
    }

    static defaultProps = {
      width: dySize(320),
      defaultValue: '',
    }

    constructor(props) {
      super(props);
      this.state = {

      };
    }

    render() {
      const { width, defaultValue } = this.props;
      const Style = {
        textInputContainer: {
          backgroundColor: Color.gray,
          borderWidth: 1,
          borderRadius: 4,
          width,
          padding: 0,
        },
        textInput: {
          height: 38,
          color: Color.text,
          fontSize: 16,
          margin: 0,
          padding: 10,
          backgroundColor: 'transparent',
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
        listView: {
          backgroundColor: Color.blue,
          width,
          padding: 0,
        },
      };
      if (defaultValue === '') {
        return (
          <GooglePlacesAutocomplete
            placeholder="Enter Location"
            minLength={2}
            autoFocus={false}
            returnKeyType="default"
            fetchDetails
            query={Query}
            onPress={(data, details) => { // 'details' is provided when fetchDetails = true
              const place = data;
              place.geometry = details.geometry;
              this.props.onPress(place);
              // alert(JSON.stringify(details))
            }}
            styles={Style}
          />
        );
      }
      return (
        <GooglePlacesAutocomplete
          placeholder="Enter Location"
          minLength={2}
          autoFocus={false}
          returnKeyType="default"
          fetchDetails
          query={Query}
          onPress={(data, details) => { // 'details' is provided when fetchDetails = true
            const place = data;
            place.geometry = details.geometry;
            this.props.onPress(place);
            // alert(JSON.stringify(details))
          }}
          styles={Style}
          getDefaultValue={() => defaultValue}
        />
      );
    }
}
