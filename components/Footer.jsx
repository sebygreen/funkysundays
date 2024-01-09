import dayjs from "dayjs";

export default function Footer() {
    return (
        <footer>
            <span className="constrain">
                <a
                    href="/legal"
                    className="small"
                >
                    Mentions légales
                </a>
                <p>&copy; funkysundays.com {dayjs().year()}</p>
            </span>
        </footer>
    );
}
