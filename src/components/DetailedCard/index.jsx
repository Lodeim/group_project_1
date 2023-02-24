import { useState } from 'react';
import UserBadge from "../UserBadge";
import Comment from "../Comment";
import "./styles.css";

const DetailedCard = ({
  userName,
  avatarUrl,
  userId,
  imgUrl,
  likes,
  isLikedByYou,
  comments
}) => {
  const [isCommentsShown, setIsCommentsShown] = useState(false);


  const renderComments = () => {
    if (comments.length > 2 && !isCommentsShown) {
        const commentsCopy = [...comments];
        const commentForRender = commentsCopy.splice(comments.length - 2, 2);

        return (
            <>
                <span className="cnDetailedCardCommentTitle" onClick={() => setIsCommentsShown(true)}>{`Показать еще ${comments.length - commentForRender.length} комментариев`}</span>
                {commentForRender.map((comment) => <Comment {...comment} />)}
            </>
        )
    }

    return comments.map((comment) => <Comment {...comment} />)
};

  return (
    <div className="cnDetailedCardRoot">
      <div className="cnDetailedCardHeader">
        <UserBadge nickName={userName} avatarUrl={avatarUrl} id={userId} />
      </div>
      <div>
        <img src={imgUrl} alt="img" className="cnDetailedCardImg" />
      </div>
      <div className="cnDetailedCardButtons">
        <i
          className={`${
            isLikedByYou ? "fas" : "far"
          } fa-heart cnDetailedCardLikeIcon`}
        />
        <i className="fas fa-comment cnDetailedCardLikeComment" />
      </div>
      <div className="cnDetailedCardLikes">{`Оценили ${likes} человек`}</div>
      <div className="cnDetailedCardComments">{renderComments()}</div>
      <textarea className="cnDetailedCardTextAria"></textarea>
    </div>
  );
};

export default DetailedCard;
