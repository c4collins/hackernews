// Core Modules
import React from 'react';

// Constants
import { FontAwesome } from '../../constants';

// Misc Files
import './index.css';

const Loading = () =>
    <FontAwesome
        name='spinner'
        size='2x'
        spin
        style={{ 
            textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
            color: 'blue',
        }}
    />

const withLoading = (Component) =>
    ({isLoading, ...rest}) =>
        isLoading 
        ? <Loading/> 
        : <Component {...rest} />

export default Loading;
export { withLoading };