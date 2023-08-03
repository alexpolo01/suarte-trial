import './styles/Content.css';

export default function Content({ artworkData }) {
  if(!artworkData) {
    return "Loading experience...";
  }
    
  return (
    <>
      <h1>this is a template</h1>
    </>
  );
}
