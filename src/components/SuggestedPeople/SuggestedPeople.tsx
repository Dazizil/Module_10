import React from 'react';
import {mockUsers} from "../../mockData";
import './suggestedPeople.css'

const SuggestedPeople = () => {
    return (
        <section className={'suggested-people-container'}>
            <ul className={'users-container'}>
                <h2 className={'title'}>Suggested people</h2>
                {mockUsers.map(user =>
                    <li className={'user-info-container'}>
                        <img className={'avatar-img'} src={user.avatar} alt={'author avatar'}/>

                        <div className={'username-container'}>
                            <span>{user.name} {user.lastname}</span>
                            <span className={'username'}>@{user.username}</span>
                        </div>
                    </li>
                )}
            </ul>
        </section>
    );
};

export default SuggestedPeople;