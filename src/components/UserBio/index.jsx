import React, { useCallback, useEffect, useMemo, useState } from "react";
import UserCounter from "../UserCounter";
import Button from "../Button";
import Input from "../Input";
import FormTextArea from "../FormTextArea";
import "./styles.css";
import { UserAddPost } from "../UserAddPost";
import { AvatarEditModal } from "../AvatarEditModal";

const requiredText = "Поле обязательное";
const validateText = (text, cb) => {
  if (!text) {
    cb(requiredText);
    return true;
  }
  if (text < 3) {
    cb("Слишком короткий текст");
    return true;
  }
  return false;
};

const UserBio = ({
  avatarUrl,
  nickname,
  description,
  onEdit,
  onEditAvatar,
  formLoading,
  isMyPage,
  count,
}) => {
  const [btnProps, setBtnProps] = useState({
    onClick: () => false,
    children: "Редактировать",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [formUserName, setFormUserName] = useState(nickname);

  const [formDescription, setFormDescription] = useState(description);
  const [userNameError, setUserNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const onSaveEditForm = useCallback(async () => {
    const isUserNameError = validateText(formUserName, setUserNameError);
    let isErrors = isUserNameError;

    if (!formDescription) {
      isErrors = true;
      setDescriptionError(requiredText);
    }
    if (isErrors) {
      return;
    }
    await onEdit({
      name: formUserName,
      about: formDescription,
    });

    setIsEditMode(false);
    // eslint-disable-next-line
  }, [formUserName, formDescription]);

  useEffect(() => {
    if (isEditMode) {
      setBtnProps({
        onClick: () => onSaveEditForm(),
        children: "Сохранить",
        className: "cnUserEditButton",
        disabled: formLoading,
      });
    } else {
      setBtnProps({
        onClick: () => setIsEditMode(true),
        children: "Редактировать",
      });
    }
  }, [isEditMode, formLoading, onSaveEditForm]);

  const [isAddPostVisible, setIsAddPostVisible] = useState(false);
  const onCloseAddPost = (e) => {
    e.stopPropagation();
    setIsAddPostVisible(false);
  };
  const onOpenAddPost = () => {
    setIsAddPostVisible(true);
  };

  const [isAvatarEditVisible, setIsAvatarEditVisible] = useState(false);
  const onOpenEditAvatar = (e) => {
    setIsAvatarEditVisible(true);
  };
  const onCloseEditAvatar = (e) => {
    setIsAvatarEditVisible(false);
  };

  const fields = useMemo(() => {
    if (isEditMode) {
      return {
        name: (
          <Input
            value={formUserName}
            onChange={({ target: { value } }) => setFormUserName(value)}
            errorText={userNameError}
            className="cnInput"
          />
        ),
        about: (
          <FormTextArea
            value={formDescription}
            onChange={({ target: { value } }) => setFormDescription(value)}
            className="cnInput"
            errorText={descriptionError}
          />
        ),
        firstButtonClassName: "cnUserBioButtonRow",
      };
    }
    return {
      name: <span className="cnUserBioNickname">{nickname}</span>,
      about: <span>{description}</span>,
      firstButtonClassName: "cnUserBioRow",
    };
  }, [
    isEditMode,
    nickname,
    description,
    formUserName,
    formDescription,
    userNameError,
    descriptionError,
  ]);
  return (
    <div className="cnUserBioRoot">
      <div className="cnUserBioAvatarWrapper">
        <img className="cnUserBioAvatar" src={avatarUrl} alt="avatar" />
        <button className="cnUserBioAvatarEditBtn" onClick={onOpenEditAvatar}>
          <i className="fa-regular fa-image" />
        </button>
        <AvatarEditModal
          isOpen={isAvatarEditVisible}
          onClose={onCloseEditAvatar}
          onEditAvatar={onEditAvatar}
        />
      </div>
      <div className="cnUserBioInfo">
        <div className="cnUserBioRow">
          <label> {fields.name}</label>
        </div>
        <div className="cnUserBioRow">
          <label htmlFor="">
            <div>О себе</div>
            {fields.about}
          </label>
        </div>
        <div className="cnUserBioRow">
          <UserCounter
            count={count}
            text="Публикаций"
            className="cnUserBioCounter"
          />
        </div>
        <div className="cnUserBioRow">
          <div className={fields.firstButtonClassName}>
            {isMyPage ? (
              <>
                <Button {...btnProps} />
                <Button onClick={onOpenAddPost}>Добавить пост</Button>
              </>
            ) : (
              ""
            )}
            <UserAddPost isOpen={isAddPostVisible} onClose={onCloseAddPost} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
