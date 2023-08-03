import AddressIcon from "./AddressIcon";
import ArtistIcon from "./ArtistIcon";
import ArtistVerifiedIcon from "./ArtistVerifiedIcon";
import ArtlistIcon from "./ArtlistIcon";
import ArtworkIcon from "./ArtworkIcon";
import CollectionIcon from "./CollectionIcon";
import ContractIcon from "./ContractIcon";
import EditIcon from "./EditIcon";
import FollowUserIcon from "./FollowUserIcon";
import GalleryCoolerIcon from "./GalleryCoolerIcon";
import InvoicesIcon from "./InvoicesIcon";
import LikeIcon from "./LikeIcon";
import PlayIcon from "./PlayIcon";
import RatingIcon from "./RatingIcon";
import SuarteroadIcon from "./SuarteroadIcon";
import ThoughtIcon from "./ThoughtIcon";
import UserIcon from "./UserIcon";

import "./NewIcons.css";

export default function NewIcons() {
  return (
    <>
      <div className="new-icons-grid">
        <LikeIcon className="new-icons-grid__icon"/>
        <UserIcon className="new-icons-grid__icon"/>
        <PlayIcon className="new-icons-grid__icon"/>
        <ArtistIcon className="new-icons-grid__icon"/>
        <RatingIcon className="new-icons-grid__icon"/>
        <ArtlistIcon className="new-icons-grid__icon"/>
        <ThoughtIcon className="new-icons-grid__icon"/>
        <CollectionIcon className="new-icons-grid__icon"/>
        <FollowUserIcon className="new-icons-grid__icon"/>
        <ArtistVerifiedIcon className="new-icons-grid__icon"/>
        <GalleryCoolerIcon className="new-icons-grid__icon"/>
        <AddressIcon className="new-icons-grid__icon"/>
        <EditIcon className="new-icons-grid__icon"/>
        <ContractIcon className="new-icons-grid__icon"/>
        <InvoicesIcon className="new-icons-grid__icon"/>
        <SuarteroadIcon className="new-icons-grid__icon"/>
        <ArtworkIcon className="new-icons-grid__icon"/>
      </div>
    </>
  );
}