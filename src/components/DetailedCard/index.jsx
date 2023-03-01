import { useState } from "react";
import { nanoid } from "nanoid";
import "./styles.css";
import UserBadge from "../UserBadge";
import Comment from "../Comment";
import cn from "classnames";

const DetailedCard = ({
  userName,
  avatarUrl,
  userId,
  imgUrl,
  likes,
  isLikedByYou,
  comments,
  className,
  onLikeClick,
  id,
}) => {
  const [isCommentsShown, setIsCommentsShown] = useState(false);

  const renderComments = () => {
    if (comments.length > 2 && !isCommentsShown) {
      const commentsCopy = [...comments];
      const commentsForRender = commentsCopy.splice(comments.length - 2, 2);

      return (
        <>
          <span
            className="cnDetailedCardCommentTitle"
            onClick={() => setIsCommentsShown(true)}
          >{`Показать еще ${
            comments.length - commentsForRender.length
          } комментариев`}</span>
          {commentsForRender.map((comment) => (
            <Comment {...comment} key={nanoid()} />
          ))}
        </>
      );
    }
    return comments.map((comment) => <Comment {...comment} key={nanoid()} />);
  };
  return (
    <div className={cn("cnDetailedCardRoot", className)}>
      <div className="cnDetailedCardHeader">
        <UserBadge nickName={userName} avatarUrl={avatarUrl} id={userId} />
      </div>
      <div>
        <img src={imgUrl} alt="img" className="cnDetailedCardImg" />
      </div>
      <div className="cnDetailedCardButtons">
        <i
          onClick={() => onLikeClick(id)}
          className={`${
            isLikedByYou ? "fas" : "far"
          } fa-heart cnDetailedCardLikeIcon`}
        />
        <i className="fas fa-comment cnDetailedCardLikeComment" />
      </div>
      <div className="cnDetailedCardLikes">{`оценили ${likes} человек`}</div>
      <div className="cnDetailedCardComments">{renderComments()}</div>
      <textarea className="cnDetailedCardTextArea" />
    </div>
  );
};

export default DetailedCard;
