import CommunityThoughtCard from '@/shared-components/cards/components/CommunityThoughtCard';

import './styles/ThoughtNotification.css';

export default function ThoughtNotification({ data }) {
  return (
    <>
      <CommunityThoughtCard data={data.data}/>
    </>
  );
}
