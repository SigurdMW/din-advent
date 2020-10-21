import { PricingItemData } from "app/price"
import React, { FC } from "react"
import classes from "./PricingItem.module.scss"

interface PricingItemProps {
  item: PricingItemData
  /**
   * @default false
   */
  featured?: boolean
}

const CheckSvg = (
  <svg height="24" width="24" version="1.1">
    <g transform="translate(0 -1028.4)">
      <path
        d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z"
        transform="translate(0 1029.4)"
        fill="#27ae60"
      />
      <path
        d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z"
        transform="translate(0 1028.4)"
        fill="#2ecc71"
      />
      <path
        d="m16 1037.4-6 6-2.5-2.5-2.125 2.1 2.5 2.5 2 2 0.125 0.1 8.125-8.1-2.125-2.1z"
        fill="#27ae60"
      />
      <path
        d="m16 1036.4-6 6-2.5-2.5-2.125 2.1 2.5 2.5 2 2 0.125 0.1 8.125-8.1-2.125-2.1z"
        fill="#ecf0f1"
      />
    </g>
  </svg>
)

// thanks to https://codepen.io/xhepigerta/pen/oxxQaw
export const PricingItem: FC<PricingItemProps> = ({
  item: { name, price, features = [] },
  featured = false,
  children,
}) => {
  return (
    <div className={`${classes.pricingItem} ${featured ? classes.pricingItemFeatured : ""}`}>
      <div className={classes.pricingDeco}>
        <svg
          enableBackground="new 0 0 300 100"
          height="100px"
          id="Layer_1"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 300 100"
          width="300px"
          x="0px"
          y="0px"
        >
          <path
            className={classes.path1}
            d="M30.913,43.944c0,0,42.911-34.464,87.51-14.191c77.31,35.14,113.304-1.952,146.638-4.729&#x000A;	c48.654-4.056,69.94,16.218,69.94,16.218v54.396H30.913V43.944z"
            fill="#FFFFFF"
            opacity="0.6"
          ></path>
          <path
            className={classes.path2}
            d="M-35.667,44.628c0,0,42.91-34.463,87.51-14.191c77.31,35.141,113.304-1.952,146.639-4.729&#x000A;	c48.653-4.055,69.939,16.218,69.939,16.218v54.396H-35.667V44.628z"
            fill="#FFFFFF"
            opacity="0.6"
          ></path>
          <path
            d="M43.415,98.342c0,0,48.283-68.927,109.133-68.927c65.886,0,97.983,67.914,97.983,67.914v3.716&#x000A;	H42.401L43.415,98.342z"
            fill="#FFFFFF"
            opacity="0.7"
          ></path>
          <path
            d="M-34.667,62.998c0,0,56-45.667,120.316-27.839C167.484,57.842,197,41.332,232.286,30.428&#x000A;	c53.07-16.399,104.047,36.903,104.047,36.903l1.333,36.667l-372-2.954L-34.667,62.998z"
            fill="#FFFFFF"
          ></path>
        </svg>
        <div className={classes.price}>{price}</div>
        <h2>{name}</h2>
      </div>
      <p>For {price} kroner får du:</p>
      <ul>
        {features.map((f) => (
          <li key={f}>
            {CheckSvg} {f}
          </li>
        ))}
      </ul>
      {children}
    </div>
  )
}

export default PricingItem
