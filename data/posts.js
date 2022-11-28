const fetchPost = async ({ id }) => {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

    if (res.status === 200) {
      return await res.json();
    }
  } catch (err) {
    return Promise.reject({
      error: err,
    });
  }
};

const fetchPosts = async ({ idArr }) => {
  //create an array of promises with those ids
  const postsPromiseArr = idArr.map((id) => fetchPost({ id }));
  const postArr = [];
  //use await in the for loop directly to run

  for await (const post of postsPromiseArr) {
    postArr.push(post);
  }

  return postArr;
};

export { fetchPost, fetchPosts };
