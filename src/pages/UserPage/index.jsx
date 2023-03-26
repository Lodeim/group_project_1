import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card";
import Layout from "../../components/Layout";
import UserBio from "../../components/UserBio";
import { useEffect, useState } from "react";
import {
  getPostsByUser,
  sendCommentOnUserPage,
  toggleLikeOnPost,
} from "../../redux/actions/postsByUser";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Bars } from "react-loader-spinner";
import { getUser, mutateUser } from "../../redux/actions/users";

import "./styles.css";

const UserPage = () => {
  const authorizedUser = useSelector((state) => state.users.authorizedUser);
  const user = useSelector((state) => state.users.user);
  const posts = useSelector((state) => state.postsByUser.posts);
  const isPostsError = useSelector((state) => state.postsByUser.isPostsError);
  const isPostsLoading = useSelector(
    (state) => state.postsByUser.isPostsLoading
  );
  const isUserLoading = useSelector((state) => state.users.isUserLoading);
  const isUserMutateLoading = useSelector(
    (state) => state.users.isMutateLoading
  );
  const isUserError = useSelector((state) => state.users.isUserError);
  const mutateLoading = useSelector((state) => state.photos.isMutateLoading);
  const dispatch = useDispatch();
  const { _id } = useParams();
  const [postsForRender, setPostsForRender] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const newPosts = [...posts];
    if (newPosts.length) {
      setPostsForRender(newPosts.splice(0, 12));
    }
  }, [posts]);

  useEffect(() => {
    dispatch(getPostsByUser(_id));
    dispatch(getUser(_id));
  }, [_id, dispatch]);

  const onLikeClick = (photoId) => {
    dispatch(toggleLikeOnPost(authorizedUser._id, photoId, _id));
  };

  const onCommentSendClick = (photoId, comment) => {
    dispatch(
      sendCommentOnUserPage(authorizedUser.name, photoId, user._id, comment)
    );
  };

  const nextHandler = () => {
    const newPosts = [...posts];
    const offset = 12 * (page + 1);
    setPostsForRender([...postsForRender, ...newPosts.splice(offset + 12)]);
    setPage(page + 1);
  };

  const onEdit = async (data) => {
    await dispatch(mutateUser(data, user._id));
  };
  return (
    <Layout
      userName={authorizedUser.name}
      _id={authorizedUser._id}
      avatarUrl={authorizedUser.avatar}
    >
      {isPostsLoading || isUserLoading ? (
        <div className="cnMainPageLoaderContainer">
          <Bars color="#000BFF" height={80} width={80} />
        </div>
      ) : (
        <div className="cnUserPageRoot">
          {!isUserError && (
            <UserBio
              avatarUrl={user.avatar}
              nickname={user.name}
              description={user.about}
              url={user.url}
              // сравнение id == authorizedUser.id без приведения
              // eslint-disable-next-line
              isMyPage={_id == authorizedUser._id}
              onEdit={onEdit}
              formLoading={isUserMutateLoading}
            />
          )}
          <div className="cnUserPageRootContent">
            {postsForRender.length ? (
              <InfiniteScroll
                dataLength={postsForRender.length}
                next={nextHandler}
                hasMore={postsForRender.length < posts.length}
                loader={
                  <div className="cnMainPageLoaderContainer">
                    <Bars color="#000BFF" height={15} width={15} />
                  </div>
                }
                endMessage={
                  <p className="cnMainPageLoaderContainer">Это все посты</p>
                }
                className="cnUserPageScroll"
              >
                {postsForRender.map(({ comments, likes, imgUrl, _id }) => (
                  <Card
                    key={_id}
                    imgUrl={imgUrl}
                    className="cnUserPageCard"
                    likes={likes.length}
                    comments={comments}
                    isLikedByYou={likes.includes(authorizedUser._id)}
                    onLikeClick={() => onLikeClick(_id)}
                    userData={{
                      userName: user.name,
                      avatarUrl: user.avatar,
                      userId: user._id,
                    }}
                    onCommentSubmit={(comment) =>
                      onCommentSendClick(_id, comment)
                    }
                    isMutateLoading={mutateLoading}
                  />
                ))}
              </InfiniteScroll>
            ) : (
              !isPostsError && (
                <p className="cnUserPageNoPosts">Постов еще нет!</p>
              )
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default UserPage;
