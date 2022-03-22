import React, { useEffect, useState } from "react";
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { makeStyles } from "@material-ui/core/styles";
import FormatAlignLeft from "@material-ui/icons/FormatAlignLeft";

import Header from "../../../components/Header/Header";
import HeaderLinks from "../../../components/Header/HeaderLinks";
import SectionDailyAnalysisText from "../../../components/daly-analysis/sections/section-daily-analysis-text.js";
import Parallax from "../../../components/parallax/parallax";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";

import dailyAnalysisPageStyle from "../../../styles/jss/pages/daily-analysis-page-style";
import { useFeatureCodes, useFeatures } from "../../../services/api/daily-analysis";
import SectionDailyAnalysisPostInfo from "../../../components/daly-analysis/sections/section-daily-analysis-post-info";
import SectionSimilarDailyAnalysisPosts
  from "../../../components/daly-analysis/sections/section-similar-daily-analysis-posts";


const DailyAnalysisPage = (props) => {
  const useStyles = makeStyles(dailyAnalysisPageStyle);
  const classes = useStyles();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const { tickerId, datetime } = router.query;

  const featuresData = useFeatures(mounted, tickerId, datetime);
  const featuresCodeData = useFeatureCodes(mounted);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (featuresData.error) return <div>Failed to load</div>
  if (featuresData.isLoading) return <div>Loading...</div>

  return (
    <div>
      <Head>
        <title>{tickerId} - {datetime}</title>
        <meta property="og:title" content='213' key="title"/>
        <meta property="description" content='123' />
      </Head>
      <Header fixed color="primary" brand="Pandora Trading Solutions" links={<HeaderLinks />}/>

      <Parallax image="/img/bg/da.jpg" filter="dark" extraSmall>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem md={8} className={classes.textCenter}>
              <h1 className={classes.title}>{"Header"}</h1>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classes.main}>
        <div className={classes.container} id="post-content">

          <SectionDailyAnalysisText featuresData={featuresData} featuresCodeData={featuresCodeData} />

          <SectionDailyAnalysisPostInfo category={"DA"} date_published={"01.01.2021"}
                                        author={"master"}/>
        </div>
      </div>

      <SectionSimilarDailyAnalysisPosts similarPosts={[]}/>
    </div>
  );
}

export default DailyAnalysisPage;
