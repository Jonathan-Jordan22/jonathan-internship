import React from "react";
import NftCard from "../UI/NftCard";

const AuthorItems = ({author}) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {author.nftCollection &&
            author.nftCollection.map((item) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={item.nftId}
              >
                <NftCard
                  item={{
                    ...item,
                    authorId: author.authorId,
                    authorImage: author.authorImage,
                  }}
                  showCountdown={false}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
