import * as React from 'react';
import { MouseEvent, ReactElement, useState } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { ImportResourceDialog } from './ImportResourceDialog';
import {
    ListItemIcon,
    MenuItem,
    MenuItemProps,
    Tooltip,
} from '@material-ui/core';

export const NewResourceMenuItem = (
    props: MenuItemProps<'li', { button?: true } & { sidebarIsOpen: boolean }>
) => {
    const { sidebarIsOpen, ...rest } = props;
    const [showImportResourceDialog, setShowImportResourceDialog] = useState(
        false
    );

    const handleClick = (
        event: MouseEvent<HTMLAnchorElement> & MouseEvent<HTMLLIElement>
    ) => {
        setShowImportResourceDialog(true);
        props.onClick(event);
    };

    const handleCloseImportNewResourceDialog = () => {
        setShowImportResourceDialog(false);
    };

    const primaryText = 'New resource';

    const renderMenuItem = (): ReactElement => (
        <MenuItem
            // @ts-ignore
            component="button"
            tabIndex={0}
            {...rest}
            onClick={handleClick}
        >
            <ListItemIcon>
                <AddIcon />
            </ListItemIcon>
            {primaryText}
        </MenuItem>
    );

    return (
        <>
            {sidebarIsOpen ? (
                renderMenuItem()
            ) : (
                <Tooltip title={primaryText} placement="right">
                    {renderMenuItem()}
                </Tooltip>
            )}
            <ImportResourceDialog
                open={showImportResourceDialog}
                onClose={handleCloseImportNewResourceDialog}
            />
        </>
    );
};

// const useStyles = makeStyles(
//     theme => ({
//         root: {
//             color: theme.palette.text.secondary,
//         },
//         active: {
//             color: theme.palette.text.primary,
//         },
//         icon: { minWidth: theme.spacing(5) },
//     }),
//     { name: 'RaMenuItemLink' }
// );
