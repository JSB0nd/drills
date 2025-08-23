export const Image = ({ title, name, folder, chapter }) => {
    return (<figure>
        <figcaption>{title}</figcaption>
        <img src={`/api/v1/svg?filename=${name}.svg&folder=${folder}&chapter=${chapter}`} title={title} alt={title} />
    </figure>);
};
