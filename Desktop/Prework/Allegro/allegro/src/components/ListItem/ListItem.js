import React from 'react';
// import Img from 'react-image'
// import styled from 'styled-components';
import styles from './ListItem.module.scss'

const ListItem = ({ name, image }) => (
    <>
        <div className={styles.wrapper}>
            <h1>{name}</h1>
            <img
                className={styles.image}
                src={image}
                alt="fuck"
            ></img>
        </div>
    </>
)

export default ListItem; 