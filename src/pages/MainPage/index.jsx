import { useDispatch, useSelector } from "react-redux";
import DetailedCard from "../../components/DetailedCard/Index.jsx";
import Layout from "../../components/Layout";
import { getPhotos, sendComment, toggleLike } from "../../redux/actions/photos";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Bars } from "react-loader-spinner";

import "./styles.css";

const MainPage = () => {
  const photos = useSelector((state) => state.photos.photos);
  const isLoading = useSelector((state) => state.photos.isPhotosLoading);
  const isError = useSelector((state) => state.photos.isPhotoError);
  const authorizedUser = useSelector((state) => state.users.authorizedUser);
  const total = useSelector((state) => state.photos.totalPhotos);
  const mutateLoading = useSelector((state) => state.photos.isMutateLoading);
  const dispatch = useDispatch();
  
  const [page, setPage] = useState(1);

  const [renderedPhotos, setRenderedPhotos] = useState(photos)
  const [sort, setSort] = useState('')

  const onUpClick = () => {setSort('up')}
  const onDownClick = () => {setSort('down')}

  useEffect(() => {
    const photosCopy = [...photos]
    const sortedPhotos = photosCopy.sort((a,b) => {
      if (sort === "up") {
        if (a.author.nickname < b.author.nickname) {
          return -1;
        }
        if (a.author.nickname > b.author.nickname) {
          return 1;
        }
        return 0;
      } else if (sort === "down"){
        if (a.author.nickname > b.author.nickname) {
          return -1;
        }
        if (a.author.nickname < b.author.nickname) {
          return 1;
        }
        return 0;
      }
    })
    setRenderedPhotos(sortedPhotos)
    console.log(sortedPhotos)
  },[photos, sort])

  useEffect(() => {
    dispatch(getPhotos(page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const nextHandler = () => {
    setPage(page + 1);
  };

  const onLikeClick = (photoId) => {
    dispatch(toggleLike(authorizedUser._id, photoId, photos));
  };

  const onCommentSendClick = (photoId, comment) => {
    dispatch(sendComment(authorizedUser._id, photoId, comment));
   
  };


  return (
    <Layout
      userName={authorizedUser.name}
      _id={authorizedUser._id}
      avatarUrl={authorizedUser.avatar}
    >
      <div className="cnMainPageRoot">
        {isLoading && <Bars color="#5F9EA0" height={15} width={15} />}
        {!isError && !isLoading && (
          <InfiniteScroll
            dataLength={photos.length}
            next={nextHandler}
            hasMore={photos.length < total}
            loader={
              <div className="cnMainPageLoaderContainer">
                <Bars color="#5F9EA0" height={15} width={15} />
              </div>
            }
            endMessage={<p className="cnMainPageLoaderContainer">Все прочитано!</p>}
          >
            {photos.map(({ author, image, _id, likes, comments, text, title, created_at, tags, comment }) => (
              <DetailedCard
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
                className="cnMainPageCard"
                onLikeClick={onLikeClick}
                onCommentSendClick={onCommentSendClick}
                mutateLoading={mutateLoading}
              />
            ))}
          </InfiniteScroll>
        )}
      </div>
    </Layout>
  );
};

export default MainPage;
