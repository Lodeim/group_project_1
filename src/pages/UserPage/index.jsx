import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card";
import Layout from "../../components/Layout";
import UserBio from "../../components/UserBio";
import { useEffect, useState } from "react";
import {
  getPostsByUser,
  sendCommentOnUserPage,
  togglePostLike,
} from "../../redux/actions/postsByUser";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Bars } from "react-loader-spinner";
import {
  getUser,
  mutateUser,
  mutateUserAvatar,
} from "../../redux/actions/users";

import "./styles.css";

const UserPage = () => {
  const authorizedUser = useSelector((state) => state.users.authorizedUser);
  const user = useSelector((state) => state.users.user);
  const posts = useSelector((state) => state.postsByUser.posts);
  const userPosts = posts.filter((e) => e.author._id === user._id);
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
    const filteredPosts = posts.filter((e) => e.author._id === user._id);
    const newPosts = [...filteredPosts];
    if (newPosts.length) {
      setPostsForRender(newPosts.splice(0, 12));
    }
  }, [posts, user._id]);

  useEffect(() => {
    dispatch(getPostsByUser());
    dispatch(getUser(_id));
  }, [_id, dispatch]);

  const onLikeClick = (photoId) => {
    dispatch(togglePostLike(authorizedUser._id, photoId, posts));
  };

  const onCommentSendClick = (photoId, comment) => {
    dispatch(
      sendCommentOnUserPage(authorizedUser.name, photoId, user._id, comment)
    );
  };

  const nextHandler = () => {
    const filteredPosts = posts.filter((e) => e.author._id === user._id);
    const newPosts = [...filteredPosts];
    const offset = 12 * (page + 1);
    setPostsForRender([...filteredPosts, ...newPosts.splice(offset + 12)]);
    setPage(page + 1);
  };

  const onEdit = async (data) => {
    await dispatch(mutateUser(data));
  };
  const onEditAvatar = async (data) => {
    await dispatch(mutateUserAvatar(data));
  };

  return (
    <Layout
      userName={authorizedUser.name}
      _id={authorizedUser._id}
      avatarUrl={authorizedUser.avatar}
    >
      {isPostsLoading || isUserLoading ? (
        <div className="cnUserPageLoaderContainer">
          <Bars color="#5f9ea0" height={80} width={80} />
        </div>
      ) : (
        <div className="cnUserPageRoot">
          {!isUserError && (
            <UserBio
              avatarUrl={user.avatar}
              nickname={user.name}
              description={user.about}
              url={user.url}
              isMyPage={user._id === authorizedUser._id}
              onEdit={onEdit}
              onEditAvatar={onEditAvatar}
              formLoading={isUserMutateLoading}
              count={userPosts.length}
            />
          )}
          <div className="cnUserPageRootContent">
            {postsForRender.length ? (
              <InfiniteScroll
                dataLength={postsForRender.length}
                next={nextHandler}
                hasMore={postsForRender.length < userPosts.length}
                loader={
                  <div className="cnUserPageLoaderContainer">
                    <Bars color="#5f9ea0" height={15} width={15} />
                  </div>
                }
                endMessage={
                  <div className="cnUserPageLoaderContainer cnAndUserPostsContainer">
                    Это все посты
                  </div>
                }
                className="cnUserPageScroll"
              >
                {postsForRender.map(
                  ({
                    author,
                    image,
                    _id,
                    likes,
                    comments,
                    text,
                    title,
                    created_at,
                    tags
                  }) => (
                    <div>
                      <Card
                        key={_id}
                        _id={_id}
                        userName={author.name}
                        avatarUrl={author.avatar}
                        aboutUser={author.about}
                        userId={author._id}
                        imgUrl={image}
                        text={text}
                        tags={tags}
                        likes={likes.length}
                        isLikedByYou={likes.includes(authorizedUser._id)}
                        comments={comments}
                        title={title}
                        createdPost={created_at}
                        className="cnUserPageCard"
                        onLikeClick={onLikeClick}
                        onCommentSendClick={onCommentSendClick}
                        mutateLoading={mutateLoading}
                      />
                    </div>
                  )
                )}
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
