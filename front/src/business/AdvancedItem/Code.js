export const Code = ({ title, code }) => {
    return (
        <div className="code">
            <h4>{title}</h4>
            <code>{code}</code>
        </div>
    );
};