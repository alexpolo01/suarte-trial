import './styles/GenericInputStructure.css';

export default function GenericInputStructure({ element, placeholder="", children }) {
  return (
    <>
      <div className="generic-input-structure__container" id={`${element}_error`}>
        <label htmlFor={element} className="generic-input-structure__label element-non-selectable dots-on-overflow">{placeholder}</label>
        {children}
      </div>
    </>
  );
}
