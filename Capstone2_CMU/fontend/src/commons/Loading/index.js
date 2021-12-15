import ClipLoader from "react-spinners/ClipLoader";

export const loading = (value) => {
    let html = (
        <div style={{ zIndex: "1000" }} >
            <ClipLoader color={"#faad14"} loading={value} size={150} />
        </div>
    )
    return html;
}