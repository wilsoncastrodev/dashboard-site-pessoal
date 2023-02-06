const Snackbar = () => (
    <aside className="mdc-snackbar">
        <div
            className="mdc-snackbar__surface"
            role="status"
            aria-relevant="additions"
        >
            <div className="mdc-snackbar__label" aria-atomic="false">
            </div>
            <div className="mdc-snackbar__actions" aria-atomic="true">
                <button
                    type="button"
                    className="mdc-button mdc-snackbar__action"
                    id="mdc-button"
                >
                    <div className="mdc-button__ripple"></div>
                    <span className="mdc-button__label">Desfazer</span>
                </button>
            </div>
        </div>
    </aside>
);

export default Snackbar;
