import React from 'react';
import styles from './Header.module.scss'
// import Select from '../Select/Select';
import Select from 'react-select';

const colourStyles = {
    container: styles => ({ ...styles, padding: '2em', width: '20em', borderRadius: '10px' }),
    placeholder: styles => ({ ...styles, fontFamily: 'Montserrat' }),
    menuList: styles => ({ ...styles, fontFamily: 'Montserrat' }),
    menu: styles => ({ ...styles, padding: '1em', width: '14em' }),
    control: styles => ({ ...styles, fontFamily: 'Montserrat' }),
};

const Header = ({ clickMethod, selectedOption, options, }) => (
    <div className={styles.header}>
        <p className={styles.logo1}>Pokédex .</p>
        <Select
            value={selectedOption}
            onChange={clickMethod}
            options={options}
            styles={colourStyles}
            placeholder={'wybierz moc...'}
            theme={theme => ({
                ...theme,
                borderRadius: 0,
                colors: {
                    ...theme.colors,
                    primary25: 'hotpink',
                    primary: 'black',
                },
            })}
        >
        </Select>
    </div>
);

export default Header; 