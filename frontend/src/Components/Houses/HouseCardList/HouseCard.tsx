import React from 'react';
import { Link } from 'react-router-dom';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';

import { formatDate } from '../../../Utilities/Date';

import styles from './styles.module.css';
import { HouseCardPropsType } from '../interfaces';

const HouseCard = (props: HouseCardPropsType) => {
    const { house } = props;

    const renderCardFooterSection = () => {
        const { isApproved } = house;

        return (
            <Box className={styles.cardFooterActions}>
                <Box className={styles.footerLeft}>
                    <span
                        style={{
                            padding: '3.5px 10px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            color: isApproved ? '#158901' : 'red',
                            border: isApproved ? '1px solid #158901' : '1px solid red',
                        }}
                    >
                        {isApproved ? <span>Approved</span> : <span>Approval pending</span>}
                    </span>
                </Box>
                <Box className={styles.footerRight}>
                    <IconButton size="small" onClick={() => {}} aria-label="edit">
                        <EditIcon
                            fontSize="small"
                            className={styles.editIcon}
                            sx={{ color: '#158901' }}
                        />
                    </IconButton>
                    <IconButton size="small" onClick={() => {}} aria-label="delete">
                        <DeleteIcon fontSize="small" className={styles.deleteIcon} />
                    </IconButton>
                </Box>
            </Box>
        );
    };

    const renderAddressSection = () => {
        const { area, upazilla, district, addressLine } = house.address;

        return (
            <Typography variant="body2" style={{ marginTop: '15px' }}>
                <div className={styles.cardBodyItemSectionTitle}>Address</div>
                <Box className="key-value-layout" style={{ marginTop: '5px' }}>
                    <Typography variant="body2" className="key-value-row">
                        <span className={'text-normal key-value-label'}>Address Line</span>
                        <span>{addressLine}</span>
                    </Typography>
                    <Typography variant="body2" className="key-value-row">
                        <span className={'text-normal key-value-label'}>Area</span>
                        <span>{area}</span>
                    </Typography>
                    <Typography variant="body2" className="key-value-row">
                        <span className={'text-normal key-value-label'}>Upazilla</span>
                        <span>{upazilla}</span>
                    </Typography>
                    <Typography variant="body2" className="key-value-row">
                        <span className={'text-normal key-value-label'}>District</span>
                        <span>{district}</span>
                    </Typography>
                </Box>
            </Typography>
        );
    };

    const renderCardBodySection = () => {
        const { owner } = house;

        return (
            <CardContent className={styles.cardBodySection}>
                <Typography variant="body2">
                    <div className={styles.cardBodyItemSectionTitle}>Owner</div>
                    <span>
                        {owner.firstName} {owner.lastName}
                    </span>
                </Typography>
                {renderAddressSection()}
                {renderCardFooterSection()}
                <Typography variant="caption" className={styles.lastUpdatedText}>
                    Last updated: {formatDate(house.updatedAt, 'm-full-dy-numeric')}
                </Typography>
            </CardContent>
        );
    };

    return (
        <Card className={styles.houseCard} elevation={2}>
            <CardContent className={styles.cardHeaderSection}>
                <Link
                    className={styles.cardTitle}
                    to={`/house/${house.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {house.name}
                </Link>
            </CardContent>
            <CardContent className="center">
                <img
                    src=""
                    alt=""
                    style={{
                        height: '80px',
                        width: '80px',
                        padding: '3px',
                        border: '2px solid #158901',
                        borderRadius: '50%',
                    }}
                />
            </CardContent>
            {renderCardBodySection()}
        </Card>
    );
};

export default HouseCard;
