/* eslint-disable react/prop-types */

export default function Button({ onClick, text, style }) {
    return (
        <div>
            <button
                onClick={onClick}
                type="button"
                className={style? style: "btn-primary"}
            >{text}</button>
        </div>
    )
}
