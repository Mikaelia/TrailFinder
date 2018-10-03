import React from "react";
import styles from "../../styles/text.css";

export default () => {
  return (
    <div style={{ marginTop: "9rem" }}>
      <h1 className={styles.quote}>
        <p className={styles.primary}>
          {/* <span className={styles.iconLeft}>
            <i className="fas fa-quote-left" />
          </span> */}
          Of all the paths you take in life...{" "}
        </p>
        <p style={{ marginBottom: "2rem" }}>
          <span className={styles.primary}>
            make sure a few of them are{" "}
            <span style={{ color: "rgb(23, 111, 226)" }}>
              dirt
              {/* <span className={styles.iconRight}>
                <i className="fas fa-quote-right" />
              </span> */}
            </span>
          </span>

          <span className={styles.small}>- John Muir</span>
        </p>
      </h1>
    </div>
  );
};
