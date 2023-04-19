import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PostUploader from './PostUploader';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddNewPost = ({navigation}) => (
  <View style={styles.container}>
    <Header navigation={navigation} />
    <PostUploader navigation={navigation} />
  </View>
);

const Header = ({navigation}) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity style={styles.btnView}onPress={() => navigation.goBack()}>
      <Ionicons
        name="arrow-back" size={30} color="white"
      />
    </TouchableOpacity>
    <Text style={styles.headerText}>NEW POST</Text>
  </View>
);

export default AddNewPost;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  headerText: {
    color: 'white',
    fontWeight: 700,
    fontSize: 20,
    marginRight: 10,
  },
  btnView: {
    marginLeft: 10,
  },
});
