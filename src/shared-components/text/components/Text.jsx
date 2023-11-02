import './styles/Text.css';

export default function Text({ children, className, style, extraSmallPlus=false, extraSmall=false, small=false, medium=false, large=false, justify=false, paragraph=false, onClick=null }) {
  const parsed = children && ['"', '“'].indexOf(children[0]) !== -1 ? children.substring(1, children.length - 2) : children;

  if(paragraph) {
    return (
      <p style={style} className={`text-custom__component ${className} ${extraSmallPlus ? "extra-small-plus" : ""} ${extraSmall ? "extra-small" : ""} ${small ? "small" : ""} ${medium ? "medium" : ""} ${large ? "large" : ""} ${justify ? "justify" : ""} paragraph`} onClick={onClick}>
        {parsed}
      </p>
    ); 
  }

  return (
    <>
      <span style={style} className={`text-custom__component ${className} ${extraSmallPlus ? "extra-small-plus" : ""} ${extraSmall ? "extra-small" : ""} ${small ? "small" : ""} ${medium ? "medium" : ""} ${large ? "large" : ""} ${justify ? "justify" : ""}`} onClick={onClick}>
        {parsed}
      </span>
    </>
  );
}
