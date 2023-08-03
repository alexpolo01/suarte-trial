import ArtworkImageTemplateIcon from '@/shared-components/icons/components/artwork/ArtworkImageTemplateIcon';

import './styles/ArtworkTemplateCard.css';

export default function ArtworkTemplateCard({ className }) {
  return (
    <>
      <div className={className}>
        <div className="artwork-template-card__image">
          <ArtworkImageTemplateIcon className="artwork-template-card__image-icon"/>
        </div>

        <div className="artwork-template-card__text large"/>
        <div className="artwork-template-card__text small"/>
        <div className="artwork-template-card__text medium"/>
        <div className="artwork-template-card__text extra-small"/>
      </div>
    </>
  );
}
