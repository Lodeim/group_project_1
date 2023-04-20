import { useSelector } from "react-redux";
import "./styles.css";

const Comment = ({ author, text, id, post, onCommentDelete }) => {
  const authorizedUser = useSelector((state) => state.users.authorizedUser);
  return (
    <div className="cnCommentRoot">
      <div>
        <span className="cnCommentName">
          {author.name ? author.name : author}:
        </span>
        <span>{text}</span>
      </div>
      {author._id === authorizedUser._id ? (
        <i
          className="fa-regular fa-square-minus"
          onClick={() => onCommentDelete(post, id)}
        />
      ) : null}
    </div>
  );
};

export default Comment;
