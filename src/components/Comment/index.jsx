
import "./styles.css";

const Comment = ({
  author, 
  text,
}) => {
  return (
   
    <div className="cnCommentRoot">
      <span className="cnCommentName">{author.name}:</span>
      <span>{text}</span>
    </div>
  );
};

export default Comment;
