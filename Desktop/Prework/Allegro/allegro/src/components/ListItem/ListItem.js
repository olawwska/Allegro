import React from 'react';
// import Img from 'react-image'
// import styled from 'styled-components';
import styles from './ListItem.module.scss';
import PropTypes from 'prop-types';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

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
            <div className={styles.heart}>
                <FavoriteBorderIcon style={{ color: 'red', width: '1.5em', height: '1.5em' }} />
            </div>
        </div>
        {/* <div className={styles.frame}></div> */}

    </>
);

// ListItem.propTypes = {
//     image: PropTypes.string,
//     name: PropTypes.string.isRequired,
//     type: PropTypes.string.isRequired,
// };

ListItem.defaultProps = {
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    name: 'bulbasaur',
    type: 'poison'
};

export default ListItem; 