import {
  grayColor,
  container,
  title,
} from "../../../styles/jss/material-kit-pro-react.js";

import imagesStyles from "../../../styles/jss/components/imagesStyles.js";

const sectionTextStyle = {
  container,
  title,
  section: {
    paddingBottom: "0",
    backgroundPosition: "50%",
    backgroundSize: "cover",
    padding: "70px 0",
    "& p": {
      fontSize: "1.188rem",
      lineHeight: "1.5em",
      color: grayColor[15],
      marginBottom: "30px",
    },
  },
  quoteText: {
    fontSize: "1.5rem !important",
  },
  postCard: {
    maxWidth: 345,
    margin: 5
  },
  postCardMedia: {
    height: 140,
  },

  ...imagesStyles,
};

export default sectionTextStyle;
