import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  Platform,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import {USERS} from '../data/Users';
import {COMMENTS} from '../data/Comments';
import {launchImageLibrary} from 'react-native-image-picker';
import {addRequest} from '../controllers/Controller';

const PostUploader = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [profile_pic, setProfile_pic] = useState('');
  const [file, setFile] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [post_liked, setPost_liked] = useState();
  const [caption, setCaption] = useState('');
  const [comments, setComments] = useState([]);

  const getUser = () => {
    let loopOfComments = Math.floor(Math.random() * 10);
    let commentsArray = [];
    const arrayNo = Math.floor(Math.random() * (USERS.length - 1));
    setUsername(USERS[arrayNo].user);
    setProfile_pic(USERS[arrayNo].image);
    setPost_liked(Math.floor(Math.random() * 20 + 1));
    for (let i = 0; i < loopOfComments; i++) {
      commentsArray.push(
        COMMENTS[Math.floor(Math.random() * (USERS.length - 1))],
      );
    }
    setComments(commentsArray);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUser();
    });
    return unsubscribe;
  }, [navigation]);

  let options = {
    mediaType: 'mixed',
    videoQuality: 'high',
  };

  const openGallery = async () => {
    const result = await launchImageLibrary(options);
    setFile(result.assets[0].fileName);
    uploadFile(result.assets[0].uri);
  };

  const uploadFile = async props => {
    const uri = props;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    try {
      await storage()
        .ref(filename)
        .putFile(uploadUri)
        .then(async () => {
          const url = await storage().ref(filename).getDownloadURL();
          setImageUrl(url);
        });
      Alert.alert(
        'Photo uploaded!',
        'Your photo has been uploaded to Firebase Cloud Storage!',
      );
    } catch (e) {
      console.error(e);
    }
  };

  const onShareHandler = async () => {
    await addRequest(
      username,
      profile_pic,
      imageUrl,
      false,
      post_liked,
      caption,
      comments,
    ).then(() => {
      navigation.goBack();
    });
  };

  return (
    <View>
      <View style={styles.profileContainer}>
        {profile_pic ? (
          <Image
            source={{
              uri: profile_pic,
            }}
            style={styles.profilePic}
          />
        ) : null}
        <Text style={styles.userNameText}>{username}</Text>
      </View>
      <View style={styles.browseContainer}>
        <Text style={styles.browseText}>Add Image/Video from Gallery</Text>
        <TouchableOpacity style={styles.browseButton} onPress={openGallery}>
          <Text style={styles.browseBtnText}>Browse</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.filePathText}>
        {file ? `${file}` : 'No Files selected'}
      </Text>
      <TextInput
        style={styles.input}
        placeholder={'Write a caption...'}
        placeholderTextColor={'white'}
        multiline={true}
        onChangeText={input => setCaption(input)}
        value={caption}
      />
      <View style={styles.shareBtnContainer}>
        <TouchableOpacity onPress={onShareHandler} style={styles.shareBtn}>
          <Text style={styles.shareBtnText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostUploader;

const styles = StyleSheet.create({
  profileContainer: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  userNameText: {
    marginVertical: 12.5,
    marginLeft: 10,
    fontSize: 20,
    color: 'white',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  browseContainer: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  browseText: {
    fontSize: 15,
    color: 'white',
  },
  browseButton: {
    marginLeft: 'auto',
    backgroundColor: 'blue',
    width: 90,
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 5,
  },
  browseBtnText: {
    fontSize: 20,
    color: 'white',
    marginHorizontal: 10,
  },
  filePathText: {
    fontSize: 15,
    color: 'white',
    margin: 10,
  },
  input: {
    color: 'white',
    fontSize: 20,
    margin: 10,
    height: 150,
    borderColor: '#555',
    borderWidth: 2,
    paddingLeft: 20,
  },
  shareBtnContainer: {
    alignItems: 'flex-end',
  },
  shareBtn: {
    marginTop: 50,
    marginRight: 10,
    backgroundColor: '#09ab49',
    borderColor: '#555',
    borderWidth: 2,
    borderRadius: 10,
  },
  shareBtnText: {
    fontSize: 20,
    color: 'white',
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
