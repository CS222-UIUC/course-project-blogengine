import React from 'react';

export default function Home() {
    console.log("home");
    return (
        <div>
            {/* <div className="title" style={{ fontFamily: 'cursive', display: 'grid', gridTemplateColumns: 'auto auto', alignItems: 'center', gridGap: '5px' }}>
                <h1 style={{ margin: '0' }}>The Inkwell</h1>
                <img src="https://a.wattpad.com/useravatar/GreenForestWitch.256.758411.jpg" alt="Title Image" className="title-image" />
            </div> */}
            <div className="title" style={{ fontFamily: 'cursive' }}>
                <h1><center>The Inkwell</center></h1>
            </div>

            <div className="summary">
                <h2>Welcome to our shared blog engine server!</h2>
            </div>

            <div className="text">
                <p>Thanks for stopping by :). You can make blog posts, new friends, <br />and even comment on their posts! When you're here, the <br /> world's your oyster.</p>
            </div>

            <img src="https://mailrelay.com/wp-content/uploads/2018/03/que-es-un-blog-1.png" alt="Happy blogging!" className="img"></img>
            <img src="https://www.macmillandictionary.com/external/slideshow/full/emoji_sparkle_full.jpg" className="img2"></img>
        </div>
    );
}

//<h1><center>The Inkwell</center></h1>