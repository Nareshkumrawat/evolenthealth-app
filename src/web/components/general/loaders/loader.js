import React from 'react';
import '../../../styles/loader.scss';
import PropTypes from 'prop-types';


function loader(props) {
    const styles = {
        container: {
            height: props.height,
            width: props.width
        }
    };
    return (
        <div className={props.loaderType} style={styles.container}></div>
    );
}

loader.propTypes = {
    loaderType: PropTypes.string,
    height: PropTypes.any,
    width: PropTypes.any
};

loader.defaultProps = {
    loaderType: 'card',
    height: '',
    width: ''
};

export default loader;