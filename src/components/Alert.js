import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { alertActions } from '../data/store';
import { Button } from '@nextui-org/react';

export { Alert };

function Alert() {
    const dispatch = useDispatch();
    const location = useLocation();
    const alert = useSelector(x => x.alert.value);

    useEffect(() => {
        // clear alert on location change
        dispatch(alertActions.clear());
    }, [location]);

    if (!alert) return null;

    return (
        <div className="container w-full h-fit bg-warning">
            <div className="m-3 p-3">
                <div className={`flex flex-row justify-between items-center alert alert-dismissible ${alert.type}`}>
                    <p data-testid="lblAlert" className="text-danger">{alert.message}</p>
                    <Button className="btn-close" onClick={() => dispatch(alertActions.clear())}>Close Alert</Button>
                </div>
            </div>
        </div>
    );
}
