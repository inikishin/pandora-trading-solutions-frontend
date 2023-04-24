import React, {ReactElement} from 'react';

import Head from 'next/head';
import { Box } from '@mui/material';

import Header from 'components/Header/Header';
import HeaderLinks from "components/Header/HeaderLinks";

type LayoutType = {
  title: string;
  description: string;
  headerColor: string;
  headerAbsolute: boolean;
  children: ReactElement | ReactElement[];
};

export const PageLayout: React.FC<LayoutType> = ({
                                                     title,
                                                     description,
                                                     headerColor,
                                                     headerAbsolute,
                                                     children
                                                 }) => {
    return (
        <>
            <Head>
                <title>{title} - Pandora Trading Solutions</title>
                <meta name="description" content={description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box>
                <Box>
                    <Header
                      fixed={!headerAbsolute}
                      absolute={headerAbsolute}
                      brand="Pandora Trading Solutions"
                      color={headerColor}
                      links={<HeaderLinks />}
                    />
                </Box>
                <Box>
                    {children}
                </Box>
            </Box>
        </>
    );
}
