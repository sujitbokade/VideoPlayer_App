import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {USERS} from '../data/Users';

const Stories = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.map((user, index) => (
          <View key={index} style={styles.storyView}>
            <Image source={{uri: user.image}} style={styles.story} />
            <Text style={styles.text}>
              {user.user.length > 12
                ? user.user.slice(0, 11).toLowerCase() + '...'
                : user.user.slice(0, 11).toLowerCase()}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Stories;

const styles = StyleSheet.create({
  story: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 3,
    borderColor: '#ff8501',
    margin: 10,
  },
  container: {
    marginBottom: 13,
  },
  storyView: {
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});
