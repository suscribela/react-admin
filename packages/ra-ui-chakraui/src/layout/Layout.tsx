import React, {
    Component,
    createElement,
    useEffect,
    useRef,
    useState,
    ErrorInfo,
    ReactElement,
    ComponentType,
    HtmlHTMLAttributes,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
    ChakraProvider,
    HStack,
    Box,
    Flex,
    Stack,
    ThemeConfig,
} from '@chakra-ui/react';
import { ComponentPropType, CoreLayoutProps } from 'ra-core';
import compose from 'lodash/flowRight';

import DefaultAppBar, { AppBarProps } from './AppBar';
import DefaultSidebar from './Sidebar';
import DefaultMenu, { MenuProps } from './Menu';
import DefaultNotification from './Notification';
import DefaultError from './Error';
import defaultTheme from '../defaultTheme';
import SkipNavigationButton from '../button/SkipNavigationButton';

class LayoutWithoutTheme extends Component<
    LayoutWithoutThemeProps,
    LayoutState
> {
    state: LayoutState = { hasError: false, error: null, errorInfo: null };

    constructor(props) {
        super(props);
        /**
         * Reset the error state upon navigation
         *
         * @see https://stackoverflow.com/questions/48121750/browser-navigation-broken-by-use-of-react-error-boundaries
         */
        props.history.listen(() => {
            if (this.state.hasError) {
                this.setState({ hasError: false });
            }
        });
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({ hasError: true, error, errorInfo });
    }

    render() {
        const {
            appBar,
            children,
            classes,
            className,
            error: ErrorComponent,
            dashboard,
            logout,
            menu,
            notification,
            open,
            sidebar,
            title,
            // sanitize react-router props
            match,
            location,
            history,
            staticContext,
            ...props
        } = this.props;
        const { hasError, error, errorInfo } = this.state;
        return (
            <>
                <div {...props}>
                    <SkipNavigationButton />
                    <Stack>
                        {createElement(appBar, { title, open, logout })}
                        <Flex paddingTop="0.5em">
                            <Box>
                                {createElement(sidebar, {
                                    children: createElement(menu, {
                                        logout,
                                        hasDashboard: !!dashboard,
                                    }),
                                })}
                            </Box>
                            <Box
                                id="main-content"
                                flexGrow={1}
                                flexBasis={0}
                                padding="8px 24px 24px 24px"
                                zIndex={2}
                                flexDirection="column"
                            >
                                {hasError ? (
                                    <ErrorComponent
                                        error={error}
                                        errorInfo={errorInfo}
                                        title={title}
                                    />
                                ) : (
                                    children
                                )}
                            </Box>
                        </Flex>
                    </Stack>
                </div>
                {createElement(notification)}
            </>
        );
    }

    static propTypes = {
        appBar: ComponentPropType,
        children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
        classes: PropTypes.object,
        className: PropTypes.string,
        dashboard: ComponentPropType,
        error: ComponentPropType,
        history: PropTypes.object.isRequired,
        logout: PropTypes.element,
        menu: ComponentPropType,
        notification: ComponentPropType,
        open: PropTypes.bool,
        sidebar: ComponentPropType,
        title: PropTypes.node.isRequired,
    };

    static defaultProps = {
        appBar: DefaultAppBar,
        error: DefaultError,
        menu: DefaultMenu,
        notification: DefaultNotification,
        sidebar: DefaultSidebar,
    };
}

export interface LayoutProps
    extends CoreLayoutProps,
        Omit<HtmlHTMLAttributes<HTMLDivElement>, 'title'> {
    appBar?: ComponentType<AppBarProps>;
    classes?: any;
    className?: string;
    error?: ComponentType<{
        error?: Error;
        errorInfo?: ErrorInfo;
        title?: string | ReactElement<any>;
    }>;
    menu?: ComponentType<MenuProps>;
    notification?: ComponentType;
    sidebar?: ComponentType<{ children: JSX.Element }>;
    theme?: ThemeConfig;
}

export interface LayoutState {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

interface LayoutWithoutThemeProps
    extends RouteComponentProps,
        Omit<LayoutProps, 'theme'> {
    open?: boolean;
}

const mapStateToProps = state => ({
    open: state.admin.ui.sidebarOpen,
});

const EnhancedLayout = compose(
    connect(
        mapStateToProps,
        {} // Avoid connect passing dispatch in props
    ),
    withRouter
)(LayoutWithoutTheme);

const Layout = ({
    theme: themeOverride,
    ...props
}: LayoutProps): JSX.Element => {
    // const themeProp = useRef(themeOverride);
    // const [theme, setTheme] = useState(() => createMuiTheme(themeOverride));

    // useEffect(() => {
    //     if (themeProp.current !== themeOverride) {
    //         themeProp.current = themeOverride;
    //         setTheme(createMuiTheme(themeOverride));
    //     }
    // }, [themeOverride, themeProp, theme, setTheme]);

    return (
        <ChakraProvider>
            <EnhancedLayout {...props} />
        </ChakraProvider>
    );
};

Layout.propTypes = {
    theme: PropTypes.object,
};

Layout.defaultProps = {
    theme: defaultTheme,
};

export default Layout;
