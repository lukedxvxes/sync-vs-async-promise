import { fetchPost, fetchPosts } from './data/posts.js';
import { getRange } from './utils/getRange.js';
const fetchPostBtn = document.querySelector(".btn.fetch[data-type='post']");

//concurrently fetch post range elems
const fetchPostsBtn = document.querySelector(
  ".btn.fetch[data-type='post-range']"
);
const startIdInput = document.querySelector(".id-range[data-type='start-id']");
const endIdInput = document.querySelector(".id-range[data-type='end-id']");

//syncronously fetch post range elems
const fetchPostsSyncBtn = document.querySelector(
  ".btn.fetch[data-type='post-range-sync']"
);
const startIdSyncInput = document.querySelector(
  ".id-range[data-type='start-id-sync']"
);
const endIdSyncInput = document.querySelector(
  ".id-range[data-type='end-id-sync']"
);

// if you know each promise is different you can wrap them in promise.all()
// - this is a bad example since its using the same promise
fetchPostBtn.addEventListener('click', async () => {
  const postPromise = fetchPost({ id: 1 });
  const post2Promise = fetchPost({ id: 2 });
  const post3Promise = fetchPost({ id: 3 });

  const [post, post2, post3] = await Promise.all([
    postPromise,
    post2Promise,
    post3Promise,
  ]);

  console.log({ post, post2, post3 });
});

//if you want to execute the same promise multiple times but with different ids
fetchPostsBtn.addEventListener('click', async () => {
  const startId = +startIdInput.value;
  const endId = +endIdInput.value;
  const postsArr = [];

  if (!startId || !endId) {
    console.log('fill in both values');
    return;
  }
  //create an array with the ids needed
  const idRangeArr = getRange(startId, endId);
  console.time('async');
  //create an array of promises with those ids
  const postsPromiseArr = idRangeArr.map((id) => fetchPost({ id }));

  //use await in the for loop directly to run
  for await (const post of postsPromiseArr) {
    postsArr.push(post);
  }

  console.log({ postsArr });
  console.timeEnd('async');
});

fetchPostsSyncBtn.addEventListener('click', async () => {
  const startId = +startIdSyncInput.value;
  const endId = +endIdSyncInput.value;
  const postsArr = [];

  if (!startId || !endId) {
    console.log('fill in both sync values');
    return;
  }

  //create an array with the ids needed
  const idRangeArr = getRange(startId, endId);
  console.time('syncronously');
  //use await inside the for loop to synchonously call each promise
  for (const id of idRangeArr) {
    const post = await fetchPost({ id });
    postsArr.push(post);
  }

  console.log({ postsArr });
  console.timeEnd('syncronously');
});

// console.log(await fetchPosts({ idArr: getRange(4, 104) }));
