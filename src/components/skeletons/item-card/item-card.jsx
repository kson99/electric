import React from 'react'
import './item-card.css'
import Skeleton from 'react-loading-skeleton'

function ItemCardSkel({ count }) {
    return Array(count).fill(0).map((_, i) => (
        <div key={i}
            className="item-card-skel"
        >
            <div className="image">
                <Skeleton height={"200px"} />
            </div>
            <div className="item-details">
                <p className="category">
                    <Skeleton width={"100%"} height={15} />
                </p>
                <h3 className="title">
                    <Skeleton width={"100%"} />
                </h3>

                <h3 className="price">
                    <Skeleton width={"100%"} />
                </h3>

                <div className="item-buttons">
                    <div>
                        <Skeleton borderRadius={"100%"} height={"100%"} />
                    </div>
                    <div>
                        <Skeleton borderRadius={"100%"} height={"100%"} />
                    </div>
                </div>
            </div>

        </div>
    ))
}

export default ItemCardSkel