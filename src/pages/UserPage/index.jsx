import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card";
import Layout from "../../components/Layout";
import UserBio from "../../components/UserBio";
import { toggleLike } from "../../redux/actions/photos";
import "./styles.css";

const UserPage = () => {
  const authorizedUser = useSelector((state) => state.users.authorizedUser);
  const dispatch = useDispatch();

  const onLikeClick = (photoId) => {
    dispatch(toggleLike(authorizedUser.id, photoId));
  };

  return (
    <Layout nickName={authorizedUser.nickname} id={authorizedUser.id} avatarUrl={authorizedUser.avatarUrl}>
      <div className="cnUserPageRoot">
        <UserBio
          avatarUrl={authorizedUser.avatarUrl}
          nickname={authorizedUser.nickname}
          subscribed={authorizedUser.subscribed.length}
          subscribers={authorizedUser.subscribers.length}
          firstName={authorizedUser.firstName}
          lastName={authorizedUser.lastName}
          dеscription={authorizedUser.dеscription}
          url={authorizedUser.url}
        />
      </div>
      <div className="cnUserPageRootContent">
        <Card imgUrl="" className="cnUserPageCard" likes={10} comments={10} isLikedByYou={true} onLikeClick={() => onLikeClick('')} />
        <Card imgUrl="" className="cnUserPageCard" likes={10} comments={10} />
        <Card imgUrl="" className="cnUserPageCard" likes={10} comments={10} />
      </div>
    </Layout>
  );
};

export default UserPage;
