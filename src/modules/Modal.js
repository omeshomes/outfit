import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Text,
  Modal,
  TouchableHighlight,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
const {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'native-base';
import _ from 'underscore';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import {uploadPicturesThunk} from '../thunks/uploadPicturesThunk'
class NewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "#c5c7c8",
      view: 0,
      content: null,
      rate: null,
      firstPicture: "",
      secondPicture: "",
    }
  }

  handleClick(i) {
    this.setState({color: color_enum[i]});
    this.setState({rate: i});
  }

  handleNextClick() {
    if (this.state.firstPicture) {
      this.setState({view: 1})
    } else {
      Alert.alert('Choose a picture !');
    }
  }

  handleDoneClick() {
    if (this.state.firstPicture && this.state.secondPicture) {
      this.props.uploadPictures(this.state.firstPicture, this.state.secondPicture, this.props.id);
    }
    this.props.closeModal();
  }

  handleCamera() {
    takeImage = async () => {
      let result = await ImagePicker.launchCameraAsync({
        quality: 0.75,
        base64: true,
        exif: true,
      });
      console.log("TAKE IMAGE", result.uri);

      if (!result.cancelled) {
        // AsyncStorage.setItem('image', result.uri).then(() => {
        //   this.props.navigation.navigate('VisionTest');
        // });
        this.setState({firstPicture: result.uri});
      }
    };
    takeImage()
  }

  handleCamera2() {
    takeImage = async () => {
      let result = await ImagePicker.launchCameraAsync({
        quality: 0.75,
        base64: true,
        exif: true,
      });
      console.log("TAKE IMAGE", result.uri);

      if (!result.cancelled) {
        // AsyncStorage.setItem('image', result.uri).then(() => {
        //   this.props.navigation.navigate('VisionTest');
        // });
        this.setState({secondPicture: result.uri});
      }
    };
    takeImage()
  }

  handleFolder() {
    choosePicture = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        quality: 0.75,
        base64: true,
        exif: true,
      });
      console.log("TAKE IMAGE", result.uri);

      if (!result.cancelled) {
        // AsyncStorage.setItem('image', result.uri).then(() => {
        //   this.props.navigation.navigate('VisionTest');
        // });
        this.setState({firstPicture: result.uri});
      }
    };
    choosePicture()
  }

  handleFolder2() {
    choosePicture = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        quality: 0.75,
        base64: true,
        exif: true,
      });
      console.log("TAKE IMAGE", result.uri);

      if (!result.cancelled) {
        // AsyncStorage.setItem('image', result.uri).then(() => {
        //   this.props.navigation.navigate('VisionTest');
        // });
        this.setState({secondPicture: result.uri});
      }
    };
    choosePicture()
  }

  render() {
    return (
      <TouchableOpacity style={styles.outer} onPress={() => this.handleDoneClick()}>
        <View style={styles.card}>
           {this.state.view === 0 ?
             (
               <View>
                  <View style={{borderColor: 'black', width: 240, height: 320, marginLeft: 'auto', marginRight: 'auto', marginTop: 30}} >
                    {this.state.firstPicture ? <Image source={{uri: this.state.firstPicture}} style={{width: 240, height: 320}}/> : 
                    <Text style={{marginTop: 150, marginLeft: 15}}>Take or choose the first picture</Text>}
                  </View>
                  <View style={{flex: 1, flexDirection: 'row', marginTop: 10, justifyContent: 'space-around'}}>
                    <Button onPress={() => this.handleCamera()}>
                      <Icon name='ios-camera'style={{fontSize: 20}}/>
                    </Button>
                    <Button onPress={() => this.handleFolder()}>
                      <Icon name='ios-folder' style={{fontSize: 20}}/>
                    </Button>
                    <Button success onPress={() => this.handleNextClick()}>
                      <Icon name='ios-navigate' style={{fontSize: 20}}/>
                  </Button>
                  </View>
                </View>
            ) : (
              <View>
                  <View style={{borderColor: 'black', width: 240, height: 320, marginLeft: 'auto', marginRight: 'auto', marginTop: 30}} >
                    {this.state.secondPicture ? <Image source={{uri: this.state.secondPicture}} style={{width: 240, height: 320}}/> : 
                    <Text style={{marginTop: 150, marginLeft: 15}}>Take or choose the second picture</Text>}
                  </View>
                  <View style={{flex: 1, flexDirection: 'row', marginTop: 10, justifyContent: 'space-around'}}>
                    <Button onPress={() => this.handleCamera2()}>
                      <Icon name='ios-camera'style={{fontSize: 20}}/>
                    </Button>
                    <Button onPress={() => this.handleFolder2()}>
                      <Icon name='ios-folder' style={{fontSize: 20}}/>
                    </Button>
                    <Button success onPress={() => this.handleDoneClick()}>
                      <Icon name='ios-done-all' style={{fontSize: 20}}/>
                    </Button>
                  </View>
                </View>
            )}
      </View>
    </TouchableOpacity>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.userReducer.user._id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch({type: 'CLOSE_MODAL'}),
    uploadPictures: (first, second, id) => uploadPicturesThunk(first, second, id)(dispatch)
    // goToNext: () => dispatch({type:'NEXT_MODAL'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewModal);

const color_enum = ['#0693e3', '#8ed1fc', '#00D084', '#F78DA7', '#EB144C'];

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#cccccc',
    height: height-200,
    width: width-40,
    position: 'absolute',
    backgroundColor: '#F8F9FA',
    top: 110,
    left: 20
  },
  slider: {
    marginTop: 30,
    width: width - 100,
    marginLeft: 10
  },
  outer: {
    position: 'absolute',
    height:height,
    width: width,
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  track: {
    height: 10,
    borderRadius: 1,
  },
  thumb: {
    width: 8,
    height: 20,
    borderRadius: 5,
    top: 25,
    backgroundColor: '#838486',
  }
})
