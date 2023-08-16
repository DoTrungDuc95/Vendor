import ProfileContent from '@/components/profile/ProfileContent';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Profile = () => {
  const { status } = useSession();

  const router = useRouter();

  const [active, setActive] = useState(1);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/');
  }, [status]);

  if (status === 'unauthenticated' || status === 'loading')
    return <main className="fixed z-[1000] inset-0 bg-white"></main>;

  return (
    <main className="section flex bg-[#f5f5f5] py-10">
      <aside className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
        <ProfileSidebar active={active} setActive={setActive} />
      </aside>
      <ProfileContent active={active} />
    </main>
  );
};

export default Profile;
