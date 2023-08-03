import './styles/BarsLoader.scss';

export default function BarsLoader({ className }) {
  return (
    <>
      <div className={`bars-loader ${className}`}>
        <div className="bar-loader bar-loader1"></div>
        <div className="bar-loader bar-loader2"></div>
        <div className="bar-loader bar-loader3"></div>
        <div className="bar-loader bar-loader4"></div>
      </div>
    </>
  );
}
