export const getRequest = async () => {
  return fetch('http://192.168.1.5:4003/postdetails')
    .then(response => response.json())
    .then(json => {
      return json;
    });
};

export const addRequest = async (
  username,
  profile_pic,
  fileUrl,
  liked,
  post_liked,
  caption,
  comments,
) => {
  try {
    await fetch('http://192.168.1.5:4003/postdetails', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        profile_pic: profile_pic,
        fileUrl: fileUrl,
        liked: liked,
        post_liked: post_liked,
        caption: caption,
        comments: comments,
      }),
    });
  } catch (e) {
    console.log(e);
  }
};

// export const putRequest = async () => {
//   const res = await axios({
//     method: 'get',
//     url: 'http://10.0.2.2:4003/customer',
//   });
//   return res;
// };
