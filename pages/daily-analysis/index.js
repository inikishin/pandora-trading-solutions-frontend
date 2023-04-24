
import ButtonGroup from "@material-ui/core/ButtonGroup";

// @material-ui/icons
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import ViewCompactIcon from '@material-ui/icons/ViewCompact';

import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from "../../components/CustomButtons/Button";
import Parallax from "../../components/parallax/parallax";

import dailyAnalysisPageStyle from "../../styles/jss/pages/daily-analysis-page-style";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import SectionDailyAnalysisList from "../../components/daly-analysis/sections/section-daily-analysis-list";
import { useTickers } from "../../services/api/quotes";
import { useAvailableDailyAnalysisPosts } from "../../services/api/daily-analysis";
import { PageLayout } from "components/base/page-layout/page-layout";

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
    <PageLayout
      title="Daily analysis - Pandora Trading Solutions"
      description="Daily analysis - Pandora Trading Solutions"
      headerColor="primary"
      headerAbsolute={false}
    >
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
    </PageLayout>
  )
}
