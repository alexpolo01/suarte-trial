import Text from './Text';

import './styles/CookiesText.css';

export default function CookiesText() {
  return (
    <>
      <div className="cookies-text__container">
        <Text className="cookies-text__heading" large>
                    How we use Cookies and Related Technologies
        </Text>

        <Text className="cookies-text__text margin" paragraph justify medium>
                    We may utilize cookies, tracking URLs, and similar tools to gather information about your interaction with our Services, content, emails, 
                    and advertisements on or outside our Services. This assists us in operating, developing, improving, and personalizing our Services, 
                    content, and marketing efforts. Your browser is typically set to automatically accept cookies, though you have the option to reject 
                    non-essential cookies. Be aware that rejecting cookies may limit your ability to sign in or utilize certain interactive features 
                    of our Services, which may depend on cookies to function.
        </Text>

        <Text className="cookies-text__heading" large>
                    Understanding these technologies
        </Text>

        <ul>
          <li className="cookies-text__list-item">
            <Text className="cookies-text__text" paragraph justify medium>
                            Cookies are tiny files that store data on your computer or device. For instance, one cookie may recognize your 
                            browser while another stores your preferences, helping us personalize our Services. We use two types of cookies:
                            “session cookies,” which expire when you close your browser and “constant cookies,” which stay on your 
                            device until they expire or are deleted.
            </Text>
          </li>

          <li className="cookies-text__list-item">
            <Text className="cookies-text__text" paragraph justify medium>
                            Web beacons, also known as “pixel tags” or “clear GIFs”, are small pieces of code on a webpage or email 
                            that monitor engagement with emails, web pages, or ads and interact with cookies. 
            </Text>
          </li>

          <li className="cookies-text__list-item">
            <Text className="cookies-text__text margin" paragraph justify medium>
                            Tracking URLs are unique URLs that track engagement with emails or web pages.
            </Text>
          </li>
        </ul>

        <Text className="cookies-text__heading" large>
                    Third-Party Services
        </Text>

        <Text className="cookies-text__text" paragraph justify medium>
                    We may work with third-party service providers to better understand how our Services and content are used, which helps us improve our offerings. 
                    These providers may use cookies, web beacons, and similar tools to collect information about user interactions with our Services, content, 
                    emails, and ads. Our third-party analytics and service providers include, but are not limited to, Google Analytics. We may also collaborate 
                    with third-party advertisers to display ads on our services or other websites, including personalized ads based on previous online activity. 
        </Text>

        <Text className="cookies-text__text" paragraph justify medium>
                    These service providers might also gather information such as your IP address, your device's unique identifier, 
                    or an Identifier for Advertisers (IDFA). Our third-party advertising providers include, among others, Google Analytics. 
                    We utilize its Remarketing and Demographics and Interest Reporting capabilities, which allow Google Analytics to gather 
                    data on our Services' traffic via Google's advertising cookies and anonymous identifiers. We and third-party service providers, 
                    including Google Analytics, may employ first-party cookies (cookies placed by the website you're currently visiting) 
                    and third-party cookies (cookies set by a website other than the one you're currently visiting) to deliver, refine, 
                    and present advertisements based on your previous visits to our Services. We don't have control over any third-party 
                    providers' actions, and our Cookie Policy and our broader Privacy Policy doesn't encompass the use of cookies, 
                    web beacons, or similar technologies by these third parties.
        </Text>

        <Text className="cookies-text__text" paragraph justify medium>
                    We may work with various third-party service providers to gain deeper insights into the usage of our Services and content, 
                    which enables us to improve our offerings. These providers deploy tools such as cookies, web beacons, and similar 
                    technologies to accumulate data about how users interact with our Services, content, emails, and advertisements. 
                    Our list of third-party analytics and service providers includes, but is not restricted to, Google Analytics. 
                    We may also collaborate with third-party advertisers to display ads on our services or other websites, 
                    including personalized ads based on previous online activity.
        </Text>

        <Text className="cookies-text__text margin" paragraph justify medium>
                    These third-party providers may also collect certain data, like your IP address, your device's distinct identifier, 
                    or an Identifier for Advertisers (IDFA). Our list of third-party advertising providers includes Google Analytics, 
                    among others. We take advantage of their remarketing and demographics and interest reporting features to allow 
                    Google Analytics to collect data about traffic on our Services using Google's advertising cookies and anonymous 
                    identifiers. Both we and third-party service providers, including Google Analytics, might use first-party cookies, 
                    which are set by the website you're currently visiting, and third-party cookies, set by a different website, to 
                    refine and present advertisements tailored from your prior visits to our Services. However, it's important to 
                    note that we don't control the practices of these third-party providers. Our Cookie Policy, along with the 
                    Privacy Policy, doesn't cover the usage of cookies, web beacons, or similar technologies employed by 
                    third parties.
        </Text>

        <Text className="cookies-text__heading" large>
                    Opt-Out Options
        </Text>

        <Text className="cookies-text__text" paragraph justify medium>
                    You may have the option to opt out of receiving cookies from third-party providers by visiting their websites or those 
                    of industry groups like the Network Advertising Initiative and the Digital Advertising Alliance. Remember, if you opt out 
                    of receiving cookies from a provider, they may place a cookie on your device to remember your preference. Hence, if you delete cookies, 
                    switch browsers, or use a new device, you might have to opt out again. To stop receiving marketing materials, please email us at privacy@suarte.net. 
                    Policy Updates: This Cookie Policy forms part of our Privacy Policy and may be updated at any time as described in our Privacy Policy. 
                    We encourage you to regularly review this Cookie Policy to stay informed about any changes.
        </Text>

        <Text className="cookies-text__text" paragraph justify medium>
                    Third-party providers may offer you a way to opt-out of receiving cookies from them by visiting their own websites. For example, you may opt-out of 
                    receiving ad-related cookies from Google through its Ad Settings. If you opt-out of receiving cookies from one of these providers, it may place a 
                    cookie on your device to remember your preference. Accordingly, if you delete cookies, install a new browser, or start using a new device, you 
                    may need to repeat the opt-out process. You can send us an email at privacy@suarte.art to opt out of receiving any marketing materials.
        </Text>
      </div>
    </>
  );
}
