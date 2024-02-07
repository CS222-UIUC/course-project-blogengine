import React from 'react';

export default function Home() {
    console.log("home");
    return (
        <div>
            <div className="title" style={{ fontFamily: 'cursive' }}>
                <h1><center>The Inkwell</center></h1>
            </div>
 
                <div className="summary">
                    <h2>Welcome to our shared blog engine server!</h2>
                </div>
    
    
                <div className="text">
                    <p>Thanks for stopping by :). You can make blog posts, new friends, <br />and even comment on their posts! When you're here, the <br /> world's your oyster.</p>
                </div>
    
    
                <img src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/30375/ink-feather-clipart-md.png" alt="Happy blogging!" className="img"></img>
                <img src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/2000153/blogging-clipart-md.png" className="img2"></img>
            </div>
    ); 
}
