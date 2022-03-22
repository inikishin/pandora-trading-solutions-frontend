import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import GridContainer from "../../Grid/GridContainer";
import GridItem from "../../Grid/GridItem";
import Badge from "../../badge/badge";
import Card from "../../card/card";
import CardAvatar from "../../card/card-avatar";

import profileImage from "../../../public/img/blank-avatar.jpeg";

import sectionDailyAnalysisPostInfoStyle from "./section-daily-analysis-post-info-style";
import {format} from "date-fns";

const useStyles = makeStyles(sectionDailyAnalysisPostInfoStyle);

export default function SectionDailyAnalysisPostInfo({category, date_published, author}) {
  const classes = useStyles();

  const postDate = Date.parse(date_published);

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={10} md={8}>
          <GridContainer>
            <GridItem xs={12} sm={6} md={6}>
              <div className={classes.blogTags}>
                Tags:
                <Badge color="primary">{category}</Badge>
              </div>
            </GridItem>
            <GridItem xs={12} sm={6} md={6}>
              Date published:
              <Badge color="primary">{format(postDate, 'dd.MM.yyyy')}</Badge>
            </GridItem>
          </GridContainer>
          <hr />
          <Card plain profile className={classes.card}>
            <GridContainer>
              <GridItem xs={12} sm={2} md={2}>
                <CardAvatar plain profile>
                  <img src={profileImage.src} alt="avatar" />
                </CardAvatar>
              </GridItem>
              <GridItem xs={12} sm={8} md={8}>
                <h4 className={classes.cardTitle}>{author}</h4>
                <p className={classes.description}>
                  Admin
                </p>
              </GridItem>
            </GridContainer>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
