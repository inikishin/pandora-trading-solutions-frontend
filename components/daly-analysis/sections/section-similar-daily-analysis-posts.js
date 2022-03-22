import React from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
// @material-ui/icons

// core components
import GridContainer from "../../Grid/GridContainer";
import GridItem from "../../Grid/GridItem";
import Card from "../../card/card.js";
import CardHeader from "../../card/card-header.js";
import CardBody from "../../card/card-body.js";
import Primary from "../../typography/primary";

import sectionSimilarDailyAnalysisPostsStyle from './section-similar-daily-analysis-posts-style';


const useStyles = makeStyles(sectionSimilarDailyAnalysisPostsStyle);

export default function SectionSimilarDailyAnalysisPosts({similarPosts}) {
    const classes = useStyles();

    return (
        <div className={classes.section}>
            <div className={classes.container}>
                <GridContainer>
                    <GridItem md={12}>
                        <h2 className={classes.title + " " + classes.textCenter}>
                            Similar posts
                        </h2>
                        <br/>
                        <GridContainer>
                            {similarPosts.map(item => (
                                <SimilarPost key={item.slug} {...item} />
                            ))}
                        </GridContainer>
                    </GridItem>
                </GridContainer>
            </div>
        </div>
    );
}

function SimilarPost({header, description, slug, category, image_url}) {

    const classes = useStyles();

    const postLink = `blog/${category}/${slug}`;
    const categoryLink = `blog/${category}`;

    return (
        <GridItem xs={12} sm={4} md={4}>
            <Card blog>
                <CardHeader image>
                    <a href={postLink}>
                        <img src={image_url.src} alt={slug}/>
                    </a>
                    <div className={classes.coloredShadow} style={{
                        backgroundImage: "url(" + image_url + ")",
                        opacity: "1",
                    }}
                    />
                </CardHeader>
                <CardBody>
                    <Primary>
                        <a href={categoryLink}>
                            <h6>{category}</h6>
                        </a>
                    </Primary>
                    <h4 className={classes.cardTitle}>
                        <a href={postLink}>{header}</a>
                    </h4>
                    <p className={classes.description}>
                        {description}
                        <a href={postLink}> readMore </a>
                    </p>
                </CardBody>
            </Card>
        </GridItem>
    );
}
