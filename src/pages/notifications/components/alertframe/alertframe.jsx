import './alertframe.css';

export default function AlertFrame({children, className=""}) {
  return (
    <>
      <div className={"alertbox " + className}>
        {children}
      </div>
    </>
  );
}
