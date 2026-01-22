import React, {useEffect, useState} from 'react';
import styles from './communities.module.css'
import axios from "axios";
import {CommunitiesApiResponse} from "@/types/apiResponse";
import {useAuth} from "@/context/AuthContext";
import {memberNumberConverter} from "@/utils/helpers";
import Image from "next/image";

const Communities = () => {
    const {logout} = useAuth();
    const [communities, setCommunities] = useState<CommunitiesApiResponse[]>([]);

    useEffect(() => {
        async function fetchGroups () {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:3000/api/groups', {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : '',
                    }
                })

                setCommunities(response.data);
                console.log('Ответ по группам', response.data);
            } catch (error: any) {
                if (error.response?.status === 401) {
                    logout();
                }
                console.log(error);
            }
        }

        fetchGroups();
    }, [])

    return (
        <section className={styles['communities-section']} data-testid={'communities-section'}>
            <ul className={styles['communities-container']}>
                <h2 className={styles['title']}>Communities you might like</h2>
                {communities.map(community =>
                    <li className={styles['community-info-container']} data-testid={'community-item'} key={community.id}>
                        <Image width={48} height={48} className={styles['communities-avatar-img']} src={community.photo} alt={''} />

                        <div className={styles['community-name-container']}>
                            <span>{community.title}</span>
                            <span
                                className={styles['community-name']}>{memberNumberConverter(community.membersCount)} members</span>
                        </div>
                    </li>
                )}
            </ul>
        </section>
    );
};

export default Communities;