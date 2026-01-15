import React from 'react';
import {mockCommunities} from "../../mockData";
import './communities.css'
import {memberNumberConverter} from "../../utils/helpers";


const Communities = () => {
    return (
        <section className={'communities-section'}>
            <ul className={'communities-container'}>
                <h2 className={'title'}>Communities you might like</h2>
                {mockCommunities.map(community =>
                    <li className={'community-info-container'}>
                        <img className={'avatar-img'} src={community.avatar} alt={'Community avatar'}/>

                        <div className={'community-name-container'}>
                            <span>{community.name}</span>
                            <span
                                className={'community-name'}>{memberNumberConverter(community.numberOfMembers)} members</span>
                        </div>
                    </li>
                )}
            </ul>
        </section>
    );
};

export default Communities;