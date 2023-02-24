import "./styles.css";

const Comment = ({ nickName, text }) => {
  return (
    <div className="cnCommentRoot">
      <span className="cnCommentName">{nickName}:</span>
      <span>{text}</span>
    </div>
  );
};

export default Comment;
