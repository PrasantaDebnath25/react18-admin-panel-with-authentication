import React from 'react';
import { Helmet } from 'react-helmet';



export default function Dashboard() {

    return (
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <div className="listingPages allAccountsPage">
                <div className="listingPagesHead">
                    <div className="left">
                        <h3>Dashboard</h3>
                    </div>
                </div>
                <div className="listingMain">

                </div>
            </div>

        </>
    );
}
