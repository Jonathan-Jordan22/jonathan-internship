import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NftCard from "../UI/NftCard";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [skeletonLoading, setSkeletonLoading] = useState(true);

  async function fetchExploreItems() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setExploreItems(data);
  }

  async function filterItems(filter) {
    setSkeletonLoading(false);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
    );

    setExploreItems(data);
    setSkeletonLoading(true);
  }

  useEffect(() => {
    fetchExploreItems();
  }, []);

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => filterItems(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {exploreItems.length && skeletonLoading ? (
        exploreItems.slice(0, visibleCount).map((item, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <NftCard item={item} />
          </div>
        ))
      ) : (
        <>
          {new Array(8).fill(0).map((_, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <Skeleton width="100%" height="400px" />
            </div>
          ))}
        </>
      )}
      <div className="col-md-12 text-center">
        {visibleCount !== 16 && (
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={() => setVisibleCount(visibleCount + 4)}
          >
            Load more
          </Link>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
