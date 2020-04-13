import React from 'react';
import syles from './Select.module.scss'
import Select from 'react-select';

const Select = () => (
    <Select
        value={selectedOption}
        onChange={this.handleSelectChange}
        options={options}
        // styles={colourStyles}
        placeholder={'wybierz typ...'}
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

);

export default Select;