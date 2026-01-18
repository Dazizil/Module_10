import React, {useEffect, useState} from 'react';
import './suggestedPeople.css'
import axios from "axios";
import {SuggestedPeopleApiResponse} from "../../types/apiResponse";

const SuggestedPeople = () => {
    const [suggestePeople, setSuggestedPeople] = useState<SuggestedPeopleApiResponse[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        async function getSuggestedPeople() {
            const response = await axios.get('http://localhost:3000/api/getSuggested', {
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                }
            })

            console.log('Ответ по предложенным людям', response.data)
            setSuggestedPeople(response.data);
        }

        getSuggestedPeople()
    }, [])

    return (
        <section className={'suggested-people-container'}>
            <ul className={'users-container'}>
                <h2 className={'title'}>Suggested people</h2>
                {suggestePeople.map(user =>
                    <li className={'user-info-container'}>
                        <img className={'avatar-img'} src={user.photo} alt={'author avatar'}/>

                        <div className={'username-container'}>
                            <span>{user.firstName} {user.secondName}</span>
                            <span className={'username'}>@{user.username}</span>
                        </div>
                    </li>
                )}
            </ul>
        </section>
    );
};

export default SuggestedPeople;