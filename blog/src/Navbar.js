export default function Navbar() {
    return <nav className="nav">
        <a href="/" className="site-title">The Inkwell</a>
        <ul>
            <li className="active">
                <a href='/'>Home</a>
            </li>
            <li>
                <a href='/blog'>Blog</a>
            </li>
            <li>
                <a href='/about'>About</a>
            </li>
        </ul>
    </nav>
}