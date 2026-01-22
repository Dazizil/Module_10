import React, {useEffect, useState} from 'react';
import styles from './suggestedPeople.module.css'
import axios from "axios";
import {SuggestedPeopleApiResponse} from "../../types/apiResponse";
import Image from "next/image";

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
        <section className={styles['suggested-people-container']} data-testid={'suggested-people-container'}>
            <ul className={styles['users-container']} data-testid={'users-container'}>
                <h2 className={styles['title']}>Suggested people</h2>
                {suggestedPeople.map(user =>
                    <li className={styles['user-info-container']} key={user.id} data-testid={'user-info-container'}>
                        <Image width={48} height={48} className={styles['suggested-people-avatar-img']} src={user.photo} alt={'author avatar'}/>

                        <div className={styles['username-container']}>
                            <span>{user.firstName} {user.secondName}</span>
                            <span className={styles['username']}>@{user.username}</span>
                        </div>
                    </li>
                )}
            </ul>
        </section>
    );
};

export default SuggestedPeople;