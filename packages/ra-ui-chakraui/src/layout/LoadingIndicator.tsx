import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Spinner, AspectRatio } from '@chakra-ui/react';
import { ReduxState, useRefreshWhenVisible } from 'ra-core';
import { IconButton } from '@chakra-ui/react';
import RefreshIconButton from '../button/RefreshIconButton';

import { ClassesOverride } from '../types';

const minL = '40px';

const LoadingIndicator = (props: LoadingIndicatorProps) => {
    const { classes: classesOverride, className, ...rest } = props;
    useRefreshWhenVisible();
    const loading = useSelector<ReduxState>(state => state.admin.loading > 0);
    // <RefreshIconButton className={classes.loadedIcon} />
    return loading ? (
        <Spinner size="xl" minW={minL} minH={minL} />
    ) : (
        <RefreshIconButton
            aria-label="Refresh page"
            size="xl"
            minW={minL}
            minH={minL}
        />
    );
};

const useStyles = makeStyles(
    theme => ({
        loader: {
            margin: theme.spacing(2),
        },
        loadedIcon: {},
    }),
    { name: 'RaLoadingIndicator' }
);

LoadingIndicator.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    width: PropTypes.string,
};

interface LoadingIndicatorProps {
    className?: string;
    classes?: ClassesOverride<typeof useStyles>;
}

export default LoadingIndicator;
