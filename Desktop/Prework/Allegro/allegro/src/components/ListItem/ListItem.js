import React from 'react';
// import Img from 'react-image'
// import styled from 'styled-components';
import styles from './ListItem.module.scss';
import PropTypes from 'prop-types';

const ListItem = ({ name, image }) => (
    <>
        <div className={styles.wrapper}>
            <img
                className={styles.image}
                src={image}
                alt={name}>
            </img>
            <h2>{name}</h2>
        </div>
    </>
);

ListItem.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
};

// ListItem.defaultProps = {
//     image: null
// };

ListItem.defaultProps = {
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    name: "bulbasaur"
};

export default ListItem; 