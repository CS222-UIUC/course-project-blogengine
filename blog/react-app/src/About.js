import React from 'react';

export default function About() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>About</h1>

        <form method='post' action='/' style={{ width: '50%' }}>
            <div className="form-group">
                <label>Name</label>
                <input className="form-control" name="name" aria-describedby="emailHelp" placeholder="Enter your name here" />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input className="form-control" name="email" aria-describedby="nameHelp" placeholder="Please type in your email"></input>
            </div>
            <button className='btn btn-primary'>Sign In</button> 
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="https://previews.123rf.com/images/kotokomi/kotokomi1507/kotokomi150700032/42499014-you-are-a-star-modern-calligraphy-phrase-handwritten-on-watercolor-golden-stars-background.jpg" alt="your-image-description" style={{width: '50%', height: 'auto'}} />
        </div>
    </div>
);
}
