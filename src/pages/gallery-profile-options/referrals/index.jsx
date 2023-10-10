import config from '@/config';
import useCache from '@/hooks/useCache';
import useGoBack from '@/hooks/useGoBack';
import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';
import Text from '@/shared-components/text/components/Text';

import ReferralLink from './components/ReferralLink';
import Skeleton from './components/Skeleton';
import VirtualList from './components/VirtualList';

import './index.css';

export default function Referrals() {
  const { loading, fetchData, loadMoreData } = useCache("user_referrals", `${config.apis.api.url}/referrals`, {
    injectToken: true
  });
  const goBackHandler = useGoBack("/profile");

  return (
    <>
      <div className="referrals__page">
        <div className="referrals__wrapper">
          <div className="referrals__header">
            <span className="referrals__header-text lt-s">
                            Referral system 
            </span>

            <BackArrowIcon className="referrals__back-button" onClick={goBackHandler}/>
          </div>

          {
            loading ?
              <Skeleton/>
              :
              <>
                <ReferralLink fetchData={fetchData}/>

                <Text className="referrals__text" paragraph justify small>
                                    Boost your earnings with Suarte's referral program! Share your unique referral link,
                                    and you'll earn 1% of the final sale price for every purchase made by the users who joined
                                    through your referral - not just once, but for every purchase they make. This ongoing passive
                                    income will be reflected in your monthly electronic bill.
                </Text>

                {/* <Text className="referrals__large-text" paragraph justify large>
                                    Your referral income:{" "} 

                                    <span>
                                        ${Utils.numberWithCommas(fetchData.referral_income)}
                                    </span>
                                </Text> */}

                {
                  fetchData.data.length === 0 ?
                    <Text className="referrals__empty-text" paragraph small>
                                            New referrals will be displayed here. Share the link and start receiving passive income. 
                    </Text>
                    :
                    <>
                      <Text className="referrals__text" style={{ marginBottom: "12px" }} paragraph justify medium>
                                                You currently have{" "}

                        <span>
                          {fetchData.totalDocs} referrals:
                        </span>
                      </Text>

                      <VirtualList items={fetchData} onLoadMore={loadMoreData}/>
                    </>
                }
              </>
          }
        </div>
      </div>
    </>
  );
}
