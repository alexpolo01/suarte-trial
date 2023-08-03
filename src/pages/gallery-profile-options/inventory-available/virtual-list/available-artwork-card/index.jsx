import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InventoryCard from '@/shared-components/cards/components/InventoryCard';
import LimitedEditionIcon from '@/shared-components/icons/components/artwork/LimitedEditionIcon';
import ContractIcon from '@/shared-components/icons/components/new-icons/ContractIcon';
import EditIcon from '@/shared-components/icons/components/new-icons/EditIcon';

import ArtworkContract from './components/ArtworkContract';
import RequestLimitedEditions from './components/RequestLimitedEditions';

import './index.css';

export default function AvailableArtworkCard({ artworkData, onActivateLimitedEdition, onContractRenewalChange, onWithdrawArtwork }) {
  const [openLimitedEdition, setOpenLimitedEdition] = useState(false);
  const [openContract, setOpenContract] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="available-artwork-card__container" onClick={()=>navigate(`/artwork/${artworkData._id}`, { state: { from: true } })}>
        <InventoryCard artworkData={artworkData} type="artwork">
          <div className="available-artwork-card__icons">
            <LimitedEditionIcon className={`available-artwork-card__icon ${!artworkData.artwork_about.artwork_limited_edition ? "not-requested" : ""}`} onClick={e=>{e.stopPropagation(); setOpenLimitedEdition(true);}}/>

            <ContractIcon className="available-artwork-card__icon" onClick={e=>{e.stopPropagation(); setOpenContract(true);}}/>

            <EditIcon className="available-artwork-card__icon" onClick={e=>{e.stopPropagation(); navigate("/profile/edit-artwork", { state: { from: true, artworkData } });}}/>
          </div>
        </InventoryCard>
      </div>

      <RequestLimitedEditions
        open={openLimitedEdition}
        close={()=>setOpenLimitedEdition(false)}
        artworkData={artworkData}
        onActivateLimitedEdition={onActivateLimitedEdition}
      />

      <ArtworkContract
        open={openContract}
        close={()=>setOpenContract(false)}
        artworkData={artworkData}
        onContractRenewalChange={onContractRenewalChange}
        onWithdrawArtwork={onWithdrawArtwork}
      />
    </>
  );
}
