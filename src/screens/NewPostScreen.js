import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AddNewPost from '../components/AddNewPost';

const NewPostScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <AddNewPost navigation={navigation} />
    </SafeAreaView>
  );
};

export default NewPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
