import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import BottomTabs from '../components/BottomTabs';
import Header from '../components/Header';
import Post from '../components/Post';
import Stories from '../components/Stories';
import {TABS} from '../data/Tabs';
import {getRequest} from '../controllers/Controller';

const HomeScreen = ({navigation}) => {
  const [posts, setPosts] = useState([]);

  const getPostDetails = async () => {
    let postsArray = await getRequest();
    setPosts(postsArray);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPostDetails();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView>
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </ScrollView>
      <BottomTabs icons={TABS} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
});
