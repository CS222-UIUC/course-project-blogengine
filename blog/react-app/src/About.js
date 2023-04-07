import React from 'react';

export default function About() {
    return (
        <div>
            <h1>About</h1>

            <form method='post' action='/'>
                <div className="form-group">
                    <label>Name</label>
                    <input className="form-control" name="name" aria-describedby="emailHelp" placeholder="Enter your name here" />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input className="form-control" name="email" aria-describedby="nameHelp" placeholder="Please type in your email" />
                </div>
                <button className='btn btn-primary'>Sign In</button> 
            </form>
            
            {/* type="submit" class="btn btn-primary" */}
        </div>
    );
}
