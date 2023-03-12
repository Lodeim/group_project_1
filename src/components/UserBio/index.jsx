import React, { useEffect, useState } from "react";
import UserCounter from "../UserCounter";
import './styles.css'
import Button from "../Button";

const UserBio = ({
    avatarUrl,
    nickname,
    subscribed,
    subscribers,
    firstname,
    lastname,
    description,
    url,
    isMyPage,
    isSubscribed,
}) => {
    const [btnProps, setBtnProps] = useState({ onClick: () => false, children: 'Подписаться'});
    useEffect(() => {
        if (isMyPage){
            setBtnProps({ onClick: () => false, children: 'Редактировать'})
        } else if (isSubscribed) {
            setBtnProps({ onClick: () => false, children: 'Отписаться'})
        } else {
            setBtnProps({ onClick: () => false, children: 'Подписаться'})
        }
    }, [isMyPage, isSubscribed])
    return(
        <div className="cnUserBioRoot">
            <div>
                <img className='cnUserBioAvatar' src={avatarUrl} alt='avatar' />
            </div>
            <div className="cnUserBioInfo">
                <div className="cnUserBioRow">
                     <span className="cnUserBioNickname">{nickname}</span>
                     <Button {...btnProps} />
                </div>
                <div className="cnUserBioRow">
                    <UserCounter count={5} text="Публикаций" className="cnUserBioCounter"/>
                    <UserCounter count={subscribers} text="Подписчиков" className="cnUserBioCounter" />
                    <UserCounter count={subscribed} text="Подписок" />
                </div>
                <div className="cnUserBioRow">
                    <span className="cnUserBioName">{firstname} {lastname}</span>
                </div>
                <div className="cnUserBioRow">
                    <span>{description}</span>
                </div>
                <a href={url}>{url}</a>
            </div>
        </div>
    )
}

export default UserBio