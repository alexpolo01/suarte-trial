import ViewsIcon from "@/shared-components/icons/components/user-profile/ViewsIcon";
import Text from "@/shared-components/text/components/Text";
import Utils from "@/utils";

import './styles/PostInfo.css';

export default function PostInfo({ fetchData }) {
  return (
    <>
      <h1 className="post__title">
        {fetchData.post_container.post_title}
      </h1>

      <div className="post__info">
        <div className="post__info-date-user">
          <Text className="post__info-date" small>
            {Utils.getDateInStringFromTimestamp(new Date(fetchData.createdAt).getTime())}
          </Text>

          <div className="post__info-separator"/>

          <Text className="post__info-user" small>
            {fetchData.gallery.user_username}
          </Text>
        </div>

        <Text className="post__info-views" small>
          {Utils.numberParserMillionThousand(fetchData.post_visits)}
          <ViewsIcon className="post__info-views-icon"/>
        </Text>
      </div>

      <Text className="post__main-text" paragraph justify medium>
        {fetchData.post_container.post_main_text}
      </Text>
    </>
  );
}
