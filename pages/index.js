import classNames from "classnames";

import Link from 'next/link';

import Carousel from "react-slick";
import { makeStyles } from "@material-ui/core/styles";

import Button from '../components/CustomButtons/Button';
import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem.js';
import headersStyle from '../styles/jss/views/headersStyle';

import { PageLayout } from "../components/base/page-layout/page-layout";
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
    <PageLayout
      title="Главная страница"
      description="Pandora Trading Solutions"
      headerColor="transparent"
      headerAbsolute
    >
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
                    <Link href="/daily-analysis">
                      <Button
                        onClick={(e) => e.preventDefault()}
                        color="danger"
                        size="lg"
                      >
                        <i className="fas fa-play"/>
                        Get started
                      </Button>
                    </Link>
                  </GridItem>
                </GridContainer>
              </div>
            </div>
          </div>
          {/* Carousel 2 END */}
        </Carousel>
    </PageLayout>
  )
}
