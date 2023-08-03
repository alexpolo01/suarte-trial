import './styles/Heading.css';

export default function Heading({ children, className, small=false, medium=false, large=false }) {
  return (
    <>
      <span className={`heading-custom__component ${className} ${small ? "small" : ""} ${medium ? "medium" : ""} ${large ? "large" : ""}`}>
        {children}
      </span>
    </>
  );
}
