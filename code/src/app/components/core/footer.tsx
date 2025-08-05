export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <span>
                © {currentYear} xyz. All rights reserved.
            </span>
        </footer>
    );
}