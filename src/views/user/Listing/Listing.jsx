import React from 'react';
import { Helmet } from 'react-helmet';



export default function Listing() {

    return (
        <>
            <Helmet>
                <title>Listing</title>
            </Helmet>
            <div className="listingPages allAccountsPage">
                <div className="listingPagesHead">
                    <div className="left">
                        <h3>Listing</h3>
                    </div>
                </div>
                <div className="listingMain">

                </div>
            </div>

        </>
    );
}
