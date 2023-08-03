import './styles/AppNavigationPage.css';

export default function AppNavigationPage({ children }) {
  return (
    <>
      <div className="app-navigation-page__fix-inside-navigation">
        {children}
      </div>
    </>
  );
}
