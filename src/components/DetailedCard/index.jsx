import UserBadge from "../UserBadge";
import "./styles.css";

const DetailedCard = ({
  userName,
  avatarUrl,
  userId,
  imgUrl,
  likes,
  isLikedByYou,
  comments,
}) => {
  return (
    <div className="cnDetailedCardRoot">
      <div className="cnDetailedCardHeader">
        <UserBadge nickName={userName} avatarUrl={avatarUrl} id={userId} />
      </div>
      <div>
        <img src={imgUrl} alt="img" className="DetailedCardImg" />
      </div>
      <div className="DetailedCardButtons">
        <i className={`${isLikedByYou ? "fas" : "far"} fa-heart`}></i>
        <i className="fas fa-comment"></i>
        comments
      </div>
      <div className="DetailedCardLikes">`Оценили ${likes} человек`</div>
      <div className="DetailedCardComments">comments comments comments</div>
      <textarea className="DetailedCardTextAria"></textarea>
    </div>
  );
};

export default DetailedCard;
