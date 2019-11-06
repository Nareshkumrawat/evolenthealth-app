import React from 'react';
import { SiteConstants } from '../../../../constants';

export default function fallBackImage() {
    return (
        <div><img className="img-fluid" src={process.env.REACT_APP_FALLBACK_IMAGE_URL} /></div>
    );
}