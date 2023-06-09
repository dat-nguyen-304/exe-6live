import CompanyProfile from '@/components/profile/CompanyProfile';
import KolProfile from '@/components/profile/KolProfile';
import useUser from '@/hooks/useUser';
import React from 'react';

export default function Profile() {
    const myUser = useUser();

    return (
        (myUser.user?.role === "kol") ? <KolProfile /> : <CompanyProfile />
    )
}