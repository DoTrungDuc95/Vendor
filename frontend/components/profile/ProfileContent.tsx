import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from 'react-icons/ai';
import { MdTrackChanges } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx';

import { Country, State } from 'country-state-city';

import UserProfile from './UserProfile';
import Orders from './Orders';
import Refund from './Refund';
import Inbox from './Inbox';
import TrackOrder from './TrackOrder';
import ChangePassword from './ChangePassword';
import Address from './Address';

type ProfileContentProps = {
  active: number;
};

const ProfileContent = ({ active }: ProfileContentProps) => {
  return (
    <section className="w-full">
      {active === 1 && <UserProfile />}
      {active === 2 && <Orders />}
      {active === 3 && <Refund />}
      {active === 4 && <Inbox />}
      {active === 5 && <TrackOrder />}
      {active === 6 && <ChangePassword />}
      {active === 7 && <Address />}
    </section>
  );
};

export default ProfileContent;
