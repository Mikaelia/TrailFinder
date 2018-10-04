import React from "react";
import styles from "../../styles/trailview.css";

// Trail View Result

export default props => {
  const {
    name,
    length,
    location,
    summary,
    difficulty,
    stars,
    starVotes,
    url,
    imgMedium,
    ascent,
    descent,
    conditionDetails,
    conditionDate
  } = props.trailDetails;
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{name}</h1>
      <ul className="list-group">
        <li className={styles.li} style={{ textAlign: "center" }}>
          <div>
            <img
              className={styles.img}
              src={imgMedium}
              alt="your next neat trail"
            />
          </div>
        </li>

        <li className={styles.li}>
          <span className={styles.strongblue}>Link:</span>{" "}
          <a style={{ overflowWrap: "break-word" }}>{url}</a>
        </li>
        <li className={styles.li}>
          <span className={styles.strongblue}>Length:</span> {length} miles
        </li>
        <li className={styles.li}>
          <span className={styles.strongblue}>Location:</span> {location}
        </li>
        <li className={styles.li}>
          <span className={styles.strongblue}>Description:</span> {summary}
        </li>
        <li className={styles.li}>
          <span className={styles.strongblue}>Difficulty:</span> {difficulty}
        </li>
        <li className={styles.li}>
          <span className={styles.strongblue}>Rating:</span> {stars} stars,{" "}
          {starVotes} reviews
        </li>
        <li className={styles.li}>
          <span className={styles.strongblue}>Elevation Change:</span> {ascent},{" "}
          {descent}
        </li>
        {{ conditionDetails } ? (
          <li className={styles.li}>
            <span className={styles.strongblue}>Condition Details:</span>{" "}
            {conditionDetails} {conditionDate}
          </li>
        ) : null}
        {props.children}
      </ul>
    </div>
  );
};
