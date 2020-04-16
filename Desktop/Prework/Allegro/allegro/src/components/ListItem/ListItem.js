import React from 'react';
import styles from './ListItem.module.scss';
import PropTypes from 'prop-types';

const ListItem = ({ name, image, type }) => (
    <>
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <img
                    className={styles.content__pokemon}
                    src={image}
                    alt={name}>
                </img>
                <div className={styles.content__text}>
                    <h2 className={styles.name}>{name}</h2>
                    <p className={styles.type}>{type}</p>
                </div>
            </div>
        </div>

    </>
);

ListItem.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default ListItem; 