import React from 'react';
// import Img from 'react-image'
// import styled from 'styled-components';
import styles from './ListItem.module.scss';
import PropTypes from 'prop-types';

const ListItem = ({ name, image, baseExperience }) => (
    <>
        <div className={styles.wrapper}>
            <div className={styles.image}>
                <img
                    className={styles.image__wrapper}
                    src={image}
                    alt={name}>
                </img>
            </div>
            <div className={styles.text}>
                <h2>{name}</h2>
                <h2>{baseExperience}</h2>
            </div>
        </div>
    </>
);

ListItem.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
};

ListItem.defaultProps = {
    image: null
};

export default ListItem; 