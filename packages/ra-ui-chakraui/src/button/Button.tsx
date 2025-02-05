import * as React from 'react';
import { ReactElement, SyntheticEvent, ReactNode } from 'react';
import PropTypes from 'prop-types';
import {
    Button as MuiButton,
    PropTypes as MuiPropTypes,
} from '@material-ui/core';
import {
    Button as ChakraButton,
    Tooltip,
    useMediaQuery,
    IconButton,
} from '@chakra-ui/react';
import { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import classnames from 'classnames';
import { Record, RedirectionSideEffect, useTranslate } from 'ra-core';
import { LocationDescriptor } from 'history';

/**
 * A generic Button with side icon. Only the icon is displayed on small screens.
 *
 * The component translates the label. Pass the icon as child.
 * The icon displays on the left side of the button by default. Set alignIcon prop to 'right' to inverse.
 *
 * @example
 *
 * <Button label="Edit" color="secondary" onClick={doEdit}>
 *   <ContentCreate />
 * </Button>
 *
 */
const Button = (props: ButtonProps) => {
    const {
        alignIcon = 'left',
        children,
        classes: classesOverride,
        className,
        color,
        disabled,
        label,
        size,
        ...rest
    } = props;
    const translate = useTranslate();

    const [isXSmall] = useMediaQuery('(max-width: 980px)');
    const restProps = sanitizeButtonRestProps(rest);

    return isXSmall ? (
        <Tooltip
            title={translate(label, { _: label })}
            isDisabled={label && !disabled}
        >
            <IconButton
                aria-label={translate(label, { _: label })}
                className={className}
                color={color}
                {...restProps}
            >
                {children}
            </IconButton>
        </Tooltip>
    ) : (
        <ChakraButton
            color={color}
            size={size}
            aria-label={label ? translate(label, { _: label }) : undefined}
            disabled={disabled}
            {...restProps}
        >
            {alignIcon === 'left' &&
                children &&
                React.cloneElement(children, {
                    className: `iconClass`,
                })}
            {label && <span>{translate(label, { _: label })}</span>}
            {alignIcon === 'right' &&
                children &&
                React.cloneElement(children, {
                    className: `iconClass`,
                })}
        </ChakraButton>
    );
};

interface Props {
    alignIcon?: 'left' | 'right';
    children?: ReactElement;
    classes?: object;
    className?: string;
    color?: MuiPropTypes.Color;
    component?: ReactNode;
    to?: string | LocationDescriptor;
    disabled?: boolean;
    label?: string;
    size?: 'small' | 'medium' | 'large';
    icon?: ReactElement;
    redirect?: RedirectionSideEffect;
    variant?: string;
    // May be injected by Toolbar
    basePath?: string;
    handleSubmit?: (event?: SyntheticEvent<HTMLFormElement>) => Promise<Object>;
    handleSubmitWithRedirect?: (redirect?: RedirectionSideEffect) => void;
    invalid?: boolean;
    onSave?: (values: object, redirect: RedirectionSideEffect) => void;
    saving?: boolean;
    submitOnEnter?: boolean;
    pristine?: boolean;
    record?: Record;
    resource?: string;
    undoable?: boolean;
}

export type ButtonProps = Props & MuiButtonProps;

export const sanitizeButtonRestProps = ({
    // The next props are injected by Toolbar
    basePath,
    handleSubmit,
    handleSubmitWithRedirect,
    invalid,
    onSave,
    pristine,
    record,
    redirect,
    resource,
    saving,
    submitOnEnter,
    undoable,
    ...rest
}: any) => rest;

Button.propTypes = {
    alignIcon: PropTypes.oneOf(['left', 'right']),
    children: PropTypes.element,
    classes: PropTypes.object,
    className: PropTypes.string,
    color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
    disabled: PropTypes.bool,
    label: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
};

Button.defaultProps = {
    color: 'primary',
    size: 'small',
};

export default Button;
