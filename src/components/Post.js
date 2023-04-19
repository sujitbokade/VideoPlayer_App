import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ICONS} from '../data/Icons';
import VideoPlayer from 'react-native-video-player';

const Post = ({post}) => {
  return (
    <View style={styles.container}>
      <PostHeader post={post} />
      <View style={styles.postContainer}>
        <PostFile post={post} />
        <PostFooter post={post} handleLike={null} />
        <PostLikes post={post} />
        <PostCaption post={post} />
        <PostCommentSection post={post} />
        {post.comments.length > 1 ? <PostComments post={post} /> : null}
      </View>
    </View>
  );
};

const PostHeader = ({post}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.userContainer}>
        <Image source={{uri: post.profile_pic}} style={styles.story} />
        <Text style={styles.userName}>{post.username.toLowerCase()}</Text>
      </View>
      <Text style={styles.postDetailsText}>...</Text>
    </View>
  );
};

const PostFile = ({post}) => {
  return (
    <View style={styles.postFileContainer}>
      {post.fileUrl.includes('mp4') ? (
        <VideoPlayer
          video={{uri: post.fileUrl}}
          autoplay={false}
          videoWidth={1500}
          videoHeight={1500}
        />
      ) : (
        <Image source={{uri: post.fileUrl}} style={styles.imgStyle} />
      )}
    </View>
  );
};

const PostFooter = ({handleLike, post}) => {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.leftFooterIconContainer}>
        <TouchableOpacity onPress={null}>
          <Image
            style={styles.footerIcon}
            source={{
              uri: post.liked ? ICONS[0].likedImageUrl : ICONS[0].imageUrl,
            }}
          />
        </TouchableOpacity>
        <Icon imgStyle={styles.footerIcon} imgUrl={ICONS[1].imageUrl} />
        <Icon imgStyle={styles.footerIcon} imgUrl={ICONS[2].imageUrl} />
      </View>

      <View>
        <Icon imgStyle={styles.footerIcon} imgUrl={ICONS[3].imageUrl} />
      </View>
    </View>
  );
};

const Icon = ({imgStyle, imgUrl}) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={{uri: imgUrl}} />
  </TouchableOpacity>
);

const PostLikes = ({post}) => (
  <View style={styles.postLikeContainer}>
    <Text style={styles.likeText}>{post.post_liked} likes</Text>
  </View>
);

const PostCaption = ({post}) => (
  <View style={styles.captionContainer}>
    <Text style={styles.captionUserText}>{post.username.toLowerCase()}</Text>
    <Text style={styles.captionText}>{post.caption}</Text>
  </View>
);

const PostCommentSection = ({post}) => (
  <View style={styles.commentsContainer}>
    {!!post.comments.length && (
      <Text style={styles.commentsDetailsText}>
        View {post.comments.length > 1 ? 'all' : ''} {post.comments.length}{' '}
        {post.comments.length > 1 ? 'comments' : 'comment'}
      </Text>
    )}
  </View>
);

const PostComments = ({post}) => (
  <>
    {post.comments.map(
      (comment, index) =>
        index < 2 && (
          <View key={index} style={styles.commentView}>
            <Text style={styles.commentSectionText}>
              <Text style={styles.commentUserText}>{comment.user.toLowerCase()}</Text>{' '}
              {comment.comment}
            </Text>
          </View>
        ),
    )}
  </>
);

export default Post;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    alignItems: 'center',
  },
  story: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.5,
    borderColor: '#ff8501',
  },
  userName: {
    fontWeight: 700,
    color: 'white',
    marginLeft: 5,
  },
  footerIcon: {
    height: 33,
    width: 33,
  },
  leftFooterIconContainer: {
    flexDirection: 'row',
    width: '32%',
    justifyContent: 'space-between',
  },
  postContainer: {
    marginHorizontal: 15,
    marginTop: 10,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postDetailsText: {
    color: 'white',
    fontWeight: 700,
  },
  postFileContainer: {
    width: '100%',
    height: 450,
  },
  imgStyle: {
    height: '100%',
    resizeMode: 'cover',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  postLikeContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  likeText: {
    color: 'white',
    fontWeight: 600,
  },
  captionContainer: {
    marginTop: 5,
    flexDirection: 'row',
  },
  captionUserText: {
    fontWeight: 600,
    color: 'white',
  },
  captionText: {
    color: 'white',
    marginHorizontal: 10,
  },
  commentsContainer: {
    marginTop: 5,
  },
  commentsDetailsText: {
    color: 'gray',
  },
  commentView: {
    flexDirection: 'row',
    marginTop: 5,
  },
  commentSectionText: {
    color: 'white',
  },
  commentUserText: {
    fontWeight: 600,
  },
});
