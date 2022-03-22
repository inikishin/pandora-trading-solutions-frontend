import classNames from "classnames";

import Head from "next/head";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ButtonGroup from "@material-ui/core/ButtonGroup";

// @material-ui/icons
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import ViewCompactIcon from '@material-ui/icons/ViewCompact';

import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from "../../components/CustomButtons/Button";
import Header from "../../components/Header/Header";
import HeaderLinks from "../../components/Header/HeaderLinks";
import Parallax from "../../components/parallax/parallax";

import dailyAnalysisPageStyle from "../../styles/jss/pages/daily-analysis-page-style";
import { makeStyles } from "@material-ui/core/styles";
import SectionDailyAnalysisText from "../../components/daly-analysis/sections/section-daily-analysis-text";
import React from "react";
import SectionDailyAnalysisList from "../../components/daly-analysis/sections/section-daily-analysis-list";
import { useTickers } from "../../services/api/quotes";
import { useAvailableDailyAnalysisPosts } from "../../services/api/daily-analysis";

const useStyles = makeStyles(dailyAnalysisPageStyle);

export default function DailyAnalysis() {
  const classes = useStyles();

  const [postsViewCompact, setPostsViewCompact] = React.useState(true);

  const tickerData = useTickers();
  const availableDailyAnalysisPosts = useAvailableDailyAnalysisPosts();

  if (availableDailyAnalysisPosts.error) return <div>Failed to load</div>
  if (availableDailyAnalysisPosts.isLoading) return <div>Loading...</div>

  const handlePostViewCompactChange = (e) => {
    e.preventDefault();
    setPostsViewCompact(!postsViewCompact);
  }

  return (
    <>
      <Head>
        <title>Daily analysis - Pandora Trading Solutions</title>
        <meta name="description" content="Daily analysis - Pandora Trading Solutions"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Header fixed color="primary" brand="Pandora Trading Solutions" links={<HeaderLinks />}/>

      <Parallax
        image="/img/bg/da.jpg"
        filter="dark"
        small
      >
        <div className={classes.container}>
          <GridContainer justifyContent="center">
            <GridItem xs={12} sm={12} md={8} className={classes.textCenter}>
              <h2 className={classes.title}>
                Daily Analysis
              </h2>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classes.main}>
        <div className={classes.container}>
          <div className={classes.viewToggle}>
            <ButtonGroup>
              <Button round color={'primary'} disabled={postsViewCompact} size="sm"
                      onClick={handlePostViewCompactChange}><ViewComfyIcon/></Button>
              <Button round color={'primary'} disabled={!postsViewCompact} size="sm"
                      onClick={handlePostViewCompactChange}><ViewCompactIcon/></Button>
            </ButtonGroup>
          </div>
          <SectionDailyAnalysisList availablePostsList={availableDailyAnalysisPosts.posts} />
        </div>
      </div>
    </>
  )
}
