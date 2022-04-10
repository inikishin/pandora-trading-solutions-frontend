import React from "react";
import ReactMarkdown from 'react-markdown'
import { format } from 'date-fns'
import Link from 'next/link';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardActionArea, CardMedia, CardActions, CardContent, Typography } from "@material-ui/core";
// @material-ui/icons
import VisibilityIcon from '@material-ui/icons/Visibility';

// core components
import GridContainer from "../../Grid/GridContainer.js";
import GridItem from "../../Grid/GridItem.js";
import Table from "../../table/table.js";
import Button from "../../CustomButtons/Button.js";

import sectionTextStyle from "./section-daily-analysis-list-style";

const useStyles = makeStyles(sectionTextStyle);

export default function SectionDailyAnalysisList({availablePostsList}) {
  const classes = useStyles();

  const roundButtons = (tickerId) => {
    return (
      <Link href={`/daily-analysis/${tickerId}/1`}>
        <Button round justIcon size="sm" color="success">
          <VisibilityIcon/>
        </Button>
      </Link>
    );
  };

  const imgClasses = classNames(
    classes.imgRaised,
    classes.imgRounded,
    classes.imgFluid
  );

  const imgComponent = {
    img: ({node, ...props}) => (
      <p style={{textAlign: 'center'}}>
        <img src={props.src} alt={props.alt} className={imgClasses}/>
      </p>
    )
  };

  console.log(availablePostsList)

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={8} md={8}>

        </GridItem>
      </GridContainer>
      <GridContainer justify="center">
        {availablePostsList && availablePostsList.map(item => (
          <GridItem key={item.ticker} xs={12} sm={6} md={4} lg={3}>
            <DailyAnalysisCardCompact tickerId={item.ticker} ticker={item.ticker__code} datetime={item.datetime}/>
          </GridItem>
        ))}
      </GridContainer>
    </div>
  );
}


function DailyAnalysisCardCompact({tickerId, ticker, datetime}) {
  const classes = useStyles();

  return (
    <Link href={`/daily-analysis/${tickerId}/${format(new Date(datetime), 'yyyyMMdd')}`}>
      <Card className={classes.postCard}>
        <CardActionArea>
          <CardMedia
            className={classes.postCardMedia}
            image="/img/bg/da.jpg"
            title="bg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {`${ticker.toUpperCase()}-${format(new Date(datetime), 'dd.MM.yyyy')}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Ежедневный анализ инструмента {ticker.toUpperCase()} за {format(new Date(datetime), 'dd.MM.yyyy')}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Link>
  );
}
