// MOMENT
import moment from 'moment';

// AXIOS
import instance from '../../common/axios';

// REDUX
import { imgActions } from './image';
import { searchActions } from './search';

// ACTION
const GET_POST = 'GET_POST';
const GET_MORE_POST = 'GET_MORE_POST';
const POST_CREATE = 'POST_CREATE';
const POST_UPDATE = 'POST_UPDATE';
const POST_DELETE = 'POST_DELETE';

const GET_REACTION = 'GET_REACTION';
const GET_MORE_REACTION = 'GET_MORE_REACTION';

const EDIT_PROFILE_IMAGE = 'EDIT_PROFILE_IMAGE';

// ACTION CREATOR
const getPostList = (postList, start) => ({ type: GET_POST, postList, start });
const getMorePostList = (postList, start) => ({ type: GET_MORE_POST, postList, start });
const createPost = (post) => ({ type: POST_CREATE, post });
const updatePost = (postId, post) => ({ type: POST_UPDATE, postId, post });
const deletePost = (postId) => ({ type: POST_DELETE, postId });

const getReaction = (reactionList, start) => ({ type: GET_REACTION, reactionList, start });
const getMoreReaction = (reactionList, start) => ({ type: GET_MORE_REACTION, reactionList, start });

const editProfileImg = (userId, imgUrl) => ({ type: EDIT_PROFILE_IMAGE, userId, imgUrl });

// INITIAL STATE
const initialState = {
  list: [],
  start: 0,
  reaction: [],
  reactionStart: 0,
};

// MIDDLEWARE
const getPostListDB = (limit = 10) => {
  return function (dispatch, getState) {
    const start = getState().post.start;

    if (start === null) return;

    instance
      .get(`/api/post/posts?start=${start}&limit=${limit + 1}`)
      .then((res) => {
        if (res.data.result.length < limit + 1) {
          dispatch(getMorePostList(res.data.result, null));
          return;
        }

        res.data.result.pop();
        dispatch(getMorePostList(res.data.result, start + limit));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const getDetailPostDB = (query, limit = 10) => {
  return function (dispatch) {
    instance
      .get(`/api/post${query}`)
      .then((res) => {
        if (res.data.result.length < limit + 1) {
          dispatch(getPostList(res.data.result, null));
          return;
        }

        res.data.result.pop();
        dispatch(getPostList(res.data.result, limit));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const createPostDB = (post) => {
  return function (dispatch, getState) {
    const imgFile = getState().image.file;

    if (imgFile.length) {
      dispatch(
        imgActions.uploadImageDB(() => {
          const imgUrl = getState().image.imageUrl;
          const postInfo = {
            ...post,
            img: imgUrl,
          };

          instance
            .post('/api/post', { ...postInfo })
            .then((res) => {
              const userInfo = getState().user;

              const newPost = {
                ...postInfo,
                ...userInfo,
                postId: res.data.postId,
                reactionCount: 0,
                favorite: 'N',
                follow: 'N',
                createdAt: moment(),
              };

              dispatch(createPost(newPost));
              dispatch(imgActions.setInitialState());
            })
            .catch((error) => {
              console.error(error);
            });
        })
      );

      return;
    }

    const postInfo = {
      ...post,
      img: [],
    };

    instance
      .post('/api/post', { ...postInfo })
      .then((res) => {
        const userInfo = getState().user;

        const newPost = {
          ...postInfo,
          ...userInfo,
          postId: res.data.postId,
          reactionCount: 0,
          favorite: 'N',
          follow: 'N',
          createdAt: moment(),
        };

        dispatch(createPost({ ...newPost, postId: res.data.postId }));
        dispatch(imgActions.setInitialState());
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const updatePostDB = (postId, post) => {
  return function (dispatch, getState) {
    if (post.img.length) {
      dispatch(
        imgActions.uploadImageDB(() => {
          const imgUrl = getState().image.imageUrl;
          const postInfo = {
            ...post,
            img: imgUrl,
          };
          const { title, reBlog, tag, content, img } = postInfo;

          instance
            .put('/api/post', { postId, title, reBlog, tag, content, img })
            .then((res) => {
              dispatch(updatePost(postId, postInfo));
              dispatch(imgActions.setInitialState());
              dispatch(searchActions.updateSearchPost(postId, postInfo));
            })
            .catch((error) => {
              console.error(error);
            });
        })
      );

      return;
    }

    const { title, reBlog, tag, content, img } = post;

    instance
      .put('/api/post', { postId, title, reBlog, tag, content, img })
      .then((res) => {
        dispatch(updatePost(postId, post));
        dispatch(imgActions.setInitialState());
        dispatch(searchActions.updateSearchPost(postId, post));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const deletePostDB = (postId) => {
  return function (dispatch) {
    instance
      .delete('/api/post', { data: { postId } })
      .then((res) => {
        dispatch(deletePost(postId));
        dispatch(searchActions.delSearchPost(postId));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const getReactionDB = (postId, limit = 20) => {
  return function (dispatch) {
    instance
      .get(`/api/reaction?postId=${postId}&start=0&limit=${limit + 1}`)
      .then((res) => {
        if (res.data.result.length < limit + 1) {
          dispatch(getReaction(res.data.result, null));
          return;
        }

        res.data.result.pop();
        dispatch(getReaction(res.data.result, limit));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const getMoreReactionDB = (postId, limit = 20) => {
  return function (dispatch, getState) {
    const start = getState().post.reactionStart;

    if (start === null) return;

    instance
      .get(`/api/reaction?postId=${postId}&start=${start}&limit=${limit + 1}`)
      .then((res) => {
        if (res.data.result.length < limit + 1) {
          dispatch(getMoreReaction(res.data.result, null));
          return;
        }

        res.data.result.pop();
        dispatch(getMoreReaction(res.data.result, start + limit));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

// REDUCER
export default function post(state = initialState, action) {
  switch (action.type) {
    case GET_POST:
      return { ...state, list: action.postList, start: action.start };

    case GET_MORE_POST:
      return { ...state, list: [...state.list, ...action.postList], start: action.start };

    case POST_CREATE:
      const newPostList = [action.post, ...state.list];
      return { ...state, list: newPostList };

    case POST_UPDATE:
      const updateList = state.list.map((post) => {
        if (post.postId === action.postId) {
          return action.post;
        }
        return post;
      });

      return { ...state, list: updateList };

    case POST_DELETE:
      const deleteList = state.list.filter((post) => post.postId !== action.postId);

      return { ...state, list: deleteList };

    case GET_REACTION:
      return { ...state, reaction: action.reactionList, reactionStart: action.start };

    case GET_MORE_REACTION:
      return {
        ...state,
        reaction: [...state.reaction, ...action.reactionList],
        reactionStart: action.start,
      };

    case EDIT_PROFILE_IMAGE:
      const editProfile = state.list.map((post) => {
        if (post.userId === action.userId) {
          return { ...post, profileImg: action.imgUrl };
        }

        return post;
      });

      return { ...state, list: editProfile };

    default:
      return state;
  }
}

export const postActions = {
  getPostList,
  createPost,
  updatePost,
  deletePost,
  getReaction,
  editProfileImg,
  getPostListDB,
  getDetailPostDB,
  createPostDB,
  updatePostDB,
  deletePostDB,
  getReactionDB,
  getMoreReactionDB,
};
