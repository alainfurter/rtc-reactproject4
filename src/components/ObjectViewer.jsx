const ObjectViewer = ({apiObject}) => {
    if (!apiObject) return (
        <div className="objectviewer">
            <h3>No data</h3>
        </div>
    );
    return (
        <div className="objectviewer">
            <h1>Astronomical Picture</h1>
            <h2>{apiObject.name}</h2>
            <div className="imageview">
                <img src={apiObject.image_url} alt={apiObject.title} />
            </div>
            <p>This image corresponds to the date: {apiObject.date}</p>
            <p>{apiObject.description}</p>
        </div>
    );
}

export default ObjectViewer;