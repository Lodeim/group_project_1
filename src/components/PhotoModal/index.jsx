import { useEffect } from "react";
import Modal from "react-modal";
import Comment from "../Comment";
import UserBadge from "../UserBadge";
import TextArea from "../TextArea";
import { nanoid } from "nanoid";
import ImageWithLoader from "../ImageWithLoader";
import { timeConverter } from "../../utils";

import "./styles.css";

const PhotoModal = ({
  isOpen,
  onClose,
  imgUrl,
  userName,
  avatarUrl,
  userId,
  comments,
  commentValue,
  setCommentValue,
  onCommentSubmit,
  isCommentLoading,
  isLikedByYou,
  onLikeClick,
  aboutUser,
  text,
  tags,
  title,
  createdPost,
  _id,
  author,
  onCommentDelete
}) => {
  useEffect(() => {
    const body = document.querySelector("body");
    if (isOpen) {
      body.classList.add("cnBodyOverflow");
    } else {
      body.classList.remove("cnBodyOverflow");
    }
  }, [isOpen]);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="cnModal"
      overlayClassName="cnModalOverlay"
      ariaHideApp={false}
    >
      <div className="cnModalRoot">
        <div className="cnModalImgWrapper">
          <ImageWithLoader src={imgUrl} alt={imgUrl} className="cnModalImg" />
        </div>
        <div className="cnModalCommentsBlock">
          <div>
            <div className="cnModalHeader">
              <UserBadge
                userName={userName}
                avatarUrl={avatarUrl}
                _id={userId}
                aboutUser={aboutUser}
              />
            </div>
            <div className="cnModalInfoWrapper">
              <div className="cnModalTime">{timeConverter(createdPost)}</div>
              <h2 className="cnModalTitle">{title}</h2>
              <div className="cnModalDescription">
                <p>{text}</p>
              </div>
              <div className="cnModalTags">
                {tags.map((e) => {
                  if (e === "") {
                    return "";
                  } else {
                    return <span key={nanoid()}>{`${e}`}</span>;
                  }
                })}
              </div>
              <div className="cnModalComments">
                <div className="cnModalCommentsTitle">Комментарии</div>
                {comments.map(({ author, text, created_at, _id, post, update_at }) => (
              <Comment
                key={nanoid()}
                author={author}
                text={text}
                createdAt={created_at}
                updateAt={update_at}
                id={_id}
                post={post}
                onCommentDelete={onCommentDelete}
              />
            )
                )}
              </div>
              <div className="cnModalIcons">
                <i
                  onClick={onLikeClick}
                  className={`${
                    isLikedByYou ? "fa" : "far"
                  } fa-heart cnModalLikeIcon`}
                />
              </div>
            </div>
          </div>
          <div>
            <TextArea
              placeholder="Введите комментарий"
              value={commentValue}
              onChange={setCommentValue}
              buttonText="Отправить"
              onSubmit={onCommentSubmit}
              isLoading={isCommentLoading}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PhotoModal;
