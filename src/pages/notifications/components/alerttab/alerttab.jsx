import "./AlertTab.css";

export default function AlertTab({
  children,
  className = "",
  index,
  setIndex,
}) {
  return (
    <>
      <div className={"notification__tab__container " + className}>
        <div
          className={"notification__tab " + (index == 0 ? "active" : "")}
          onClick={() => setIndex(0)}
        >
          <p className="notification__tab__title">All</p>
        </div>
        <div
          className={"notification__tab " + (index == 1 ? "active" : "")}
          onClick={() => setIndex(1)}
        >
          <p className="notification__tab__title">Interactions</p>
        </div>
        <div
          className={"notification__tab " + (index == 2 ? "active" : "")}
          onClick={() => setIndex(2)}
        >
          <p className="notification__tab__title">From Suarte</p>
        </div>
        {children}
      </div>
    </>
  );
}
