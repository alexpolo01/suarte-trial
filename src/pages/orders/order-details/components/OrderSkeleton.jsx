import './styles/OrderSkeleton.css';

export default function OrderSkeleton() {
  return (
    <>
      <main className="order-skeleton-page__container">
        <div className="order-skeleton-page__image"/>

        <div className="order-skeleton-page__section">
          <div className="order-skeleton-page__text-skeleton --big" style={{ width: "60%" }}/>

          <div className="order-skeleton-page__card">
            <div className="order-skeleton-page__order-card">
              <div className="order-skeleton-page__order-image"/>

              <div className="order-skeleton-page__order-card-info">
                <div className="order-skeleton-page__text-skeleton --normal" style={{ width: "68%" }}/>

                <div>
                  <div className="order-skeleton-page__text-skeleton --small" style={{ width: "43%", marginBottom: "10px", minWidth: "130px" }}/>
                  <div className="order-skeleton-page__text-skeleton --small" style={{ width: "32%", marginBottom: "10px", minWidth: "110px" }}/>
                  <div className="order-skeleton-page__text-skeleton --small" style={{ width: "27%", minWidth: "80px" }}/>
                </div>

                <div className="order-skeleton-page__text-skeleton --small" style={{ width: "30%", minWidth: "90px" }}/>
              </div>
            </div>
          </div>

          <div className="order-skeleton-page__card">
            <div className="order-skeleton-page__text-skeleton --normal" style={{ width: "25%", marginBottom: "10px" }}/>
            <div className="order-skeleton-page__text-skeleton --small" style={{ width: "30%", marginBottom: "10px" }}/>
            <div className="order-skeleton-page__text-skeleton --small" style={{ width: "43%", marginBottom: "10px" }}/>
            <div className="order-skeleton-page__text-skeleton --small" style={{ width: "61%" }}/>
          </div>

          <div className="order-skeleton-page__card --conversation">
            <div className="order-skeleton-page__text-skeleton" style={{ width: "25px", height: "25px" }}/>

            <div className="order-skeleton-page__text-skeleton --normal" style={{ width: "56%" }}/>
          </div>
        </div>
      </main>
    </>
  );
}
