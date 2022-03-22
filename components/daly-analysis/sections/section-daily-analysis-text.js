import React from "react";
import ReactMarkdown from 'react-markdown'
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import GridContainer from "../../Grid/GridContainer.js";
import GridItem from "../../Grid/GridItem.js";
// core components

import sectionTextStyle from "./section-daily-analysis-text-style";
import SectionPostDaily from "./section-post-daily/section-post-daily";


export default function SectionDailyAnalysisText({featuresData, featuresCodeData}) {
  const useStyles = makeStyles(sectionTextStyle);
  const classes = useStyles();

  const imgClasses = classNames(
    classes.imgRaised,
    classes.imgRounded,
    classes.imgFluid
  );

  const imgComponent = {img: ({node, ...props}) => (
      <p style={{textAlign: 'center'}}>
          <img src={props.src} alt={props.alt} className={imgClasses} />
      </p>
      )};

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={8} md={8}>
            <ReactMarkdown components={imgComponent}>
              ##Содержание:
                1. Анализ недельного графика
                1. Анализ дневного графика
                1. Стратегия: Прорыв волатильности
                1. Сопровождение открытых позиций
            </ReactMarkdown>

          <SectionPostDaily data={featuresData} featureCodes={featuresCodeData} />
          <ul>
            {featuresCodeData.featureCodes && featuresCodeData.featureCodes.map(item => (<li key={item.id}>{item.code}</li>))}
          </ul>

          <ul>
            {featuresData.features && featuresData.features.slice(0, 10).map(item => (<li key={item.id}>
              <hr />
              <p>
                {`${item.datetime} ${item.ticker} ${item.timeframe} ${item.open} ${item.high} ${item.low} ${item.close} ${item.volume}`}
              </p>
              <p>
                {item.features}
              </p>
            </li>))}
          </ul>
        </GridItem>
      </GridContainer>
    </div>
  );
}
