import React, {useEffect, useState} from 'react';
import './suggestedPeople.css'
import axios from "axios";
import {SuggestedPeopleApiResponse} from "../../types/apiResponse";

const SuggestedPeople = () => {
    const [suggestedPeople, setSuggestedPeople] = useState<SuggestedPeopleApiResponse[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        async function getSuggestedPeople() {
            const response = await axios.get('http://localhost:3000/api/getSuggested', {
                headers: {
                    Authorization: token ? `Bearer ${token}` : '',
                }
            })

            console.log('Ответ по предложенным людям', response.data)
            setSuggestedPeople(response.data);
        }

        getSuggestedPeople()
    }, [])

    return (
        <section className={'suggested-people-container'} data-testid={'suggested-people-container'}>
            <ul className={'users-container'} data-testid={'users-container'}>
                <h2 className={'title'}>Suggested people</h2>
                {suggestedPeople.map(user =>
                    <li className={'user-info-container'} key={user.id} data-testid={'user-info-container'}>
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