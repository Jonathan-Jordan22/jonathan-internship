import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const [author, setAuthor] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  async function fetchAuthor() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    setAuthor(data);
    setIsLoading(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAuthor();
  }, [id]);

  const handleFollow = () => {
    setAuthor((prevAuthor) => {
      return {
        ...prevAuthor,
        followers: isFollowing
          ? prevAuthor.followers - 1
          : prevAuthor.followers + 1,
      };
    });
    setIsFollowing(!isFollowing);
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {isLoading ? (
                <>
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <Skeleton
                            width="150px"
                            height="150px"
                            borderRadius="50%"
                          />
                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              <Skeleton width="200px" height="24px" />
                              <span className="profile_username">
                                <Skeleton width="120px" height="20px" />
                              </span>
                              <span id="wallet" className="profile_wallet">
                                <Skeleton width="250px" height="20px" />
                              </span>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            <Skeleton width="100px" height="20px" />
                          </div>
                          <Skeleton width="100px" height="40px" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <div className="tab-1">
                          <div className="row">
                            {new Array(8).fill(0).map((_, index) => (
                              <div
                                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                                key={index}
                              >
                                <div className="nft__item">
                                  <div className="author_list_pp">
                                    <Skeleton
                                      width="50px"
                                      height="50px"
                                      borderRadius="50%"
                                    />
                                    <i className="fa fa-check"></i>
                                  </div>
                                  <div
                                    className="nft__item_wrap"
                                    style={{ marginTop: "40px" }}
                                  >
                                    <Skeleton width="100%" height="200px" />
                                  </div>
                                  <div className="nft__item_info">
                                    <Skeleton width="100px" height="20px" />
                                    <div className="nft__item_price">
                                      <Skeleton width="60px" height="20px" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img src={author.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {author.authorName}
                              <span className="profile_username">
                                @{author.tag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {author.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            {author.followers} followers
                          </div>
                          <button className="btn-main" onClick={handleFollow}>
                            {isFollowing ? "Unfollow" : "Follow"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      <AuthorItems author={author} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
