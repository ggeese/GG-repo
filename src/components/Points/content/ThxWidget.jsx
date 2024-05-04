import React, { useEffect } from 'react';
import { THXWidget } from '@thxnetwork/sdk';

const ThxWidget = () => {
    useEffect(() => {
        const options = {
            campaignId: '662b2cc42a3c929262302ced',
        };
        THXWidget.create(options);
    }, []);

};

export default ThxWidget;
