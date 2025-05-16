function ErrorMessage({ message = "Failed to load images", error = null }) {
  return (
    <div className="error">
      <p>{message}</p>
      {error && <p className="error-details">{error.message}</p>}
    </div>
  );
}

export default ErrorMessage;