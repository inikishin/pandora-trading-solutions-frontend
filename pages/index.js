import classNames from "classnames";

import Head from 'next/head';
import Image from 'next/image';

import Carousel from "react-slick";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import Header from '../components/Header/Header';
import Button from '../components/CustomButtons/Button';
import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem.js';
import headersStyle from '../styles/jss/views/headersStyle';

import bg1 from '../public/img/bg/dg2.jpg';

const useStyles = makeStyles(headersStyle);

export default function Home() {
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  return (
    <div>
      <Head>
        <title>Pandora Trading Solutions</title>
        <meta name="description" content="Pandora Trading Solutions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Header
          absolute
          brand="Pandora Trading Solutions"
          color="transparent"
          links={
            <List className={classes.list + " " + classes.mlAuto}>
              <ListItem className={classes.listItem}>
                <Button
                  href="/"
                  className={classes.navLink}
                  onClick={(e) => e.preventDefault()}
                  color="transparent"
                >
                  Home
                </Button>
              </ListItem>
            </List>
          }
        />
        <Carousel {...settings}>
          {/* Carousel 2 START */}
          <div>
            <div
              className={classes.pageHeader}
              style={{ backgroundImage: `url("${bg1.src}")` }}
            >
              <div className={classes.container}>
                <GridContainer>
                  <GridItem
                    xs={12}
                    sm={8}
                    md={8}
                    className={classNames(
                      classes.mlAuto,
                      classes.mrAuto,
                      classes.textCenter
                    )}
                  >
                    <h1 className={classes.title}>Pandora Trading Solutions</h1>
                    <h4>
                      Ваш проводник в мире финансовых рынков. Технический анализ инструментов, торговые сигналы, прогнозы
                      цены с использованием искусственного интеллекта.
                    </h4>
                    <br />
                  </GridItem>
                </GridContainer>
              </div>
            </div>
          </div>
          {/* Carousel 2 END */}
        </Carousel>
      </div>
    </div>
  )
}
