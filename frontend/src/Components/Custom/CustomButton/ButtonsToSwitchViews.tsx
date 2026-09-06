/* eslint-disable indent */
import React from 'react';
import { connect } from 'react-redux';

import { Done as SelectedIcon } from '@mui/icons-material';

import ButtonSection from './ButtonSection';

import { setCurrentView } from '../../../Redux/actions/generalAction';

import { Views } from '../../../Constants/General';

import type { ButtonsToSwitchViewsPropsType } from './interfaces';
import { CurrentViewType } from '../../../Types';

import styles from './styles.module.css';

const ButtonsToSwitchViews = (props: ButtonsToSwitchViewsPropsType) => {
    const { currentView, setCurrentView } = props;

    const onSelectViews = (selectedView: CurrentViewType) => {
        setCurrentView(selectedView);
    };

    return (
        <ButtonSection className={`center ${styles.switchViewButtonContainer}`}>
            <div
                className={`center
                    ${
                        currentView === Views.TABLE
                            ? styles.switchViewSelectedButtonText
                            : styles.switchViewUnselectedButtonText
                    }
                    ${styles.switchViewButtonText}
                    ${styles.switchViewLeftButtonText}`}
                onClick={() => onSelectViews(Views.TABLE)}
            >
                {currentView === Views.TABLE && (
                    <SelectedIcon sx={{ fontSize: '15px', marginRight: '5px', color: '#fff' }} />
                )}
                Table View
            </div>
            <div
                className={`center
                    ${
                        currentView === Views.CARD
                            ? styles.switchViewSelectedButtonText
                            : styles.switchViewUnselectedButtonText
                    }
                    ${styles.switchViewButtonText}
                    ${styles.switchViewRightButtonText}`}
                onClick={() => onSelectViews(Views.CARD)}
            >
                Card View
                {currentView === Views.CARD && (
                    <SelectedIcon sx={{ fontSize: '15px', marginLeft: '5px', color: '#fff' }} />
                )}
            </div>
        </ButtonSection>
    );
};

const mapStateToProps = (state: any) => ({
    currentView: state.general.currentView,
});

const mapDispatchToProps = {
    setCurrentView,
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonsToSwitchViews);
