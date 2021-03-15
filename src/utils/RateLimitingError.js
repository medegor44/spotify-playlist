class RateLimitingError extends Error {
  constructor(message) {
    super(message);
    this.name = "RateLimitingError";
  }
}

export default RateLimitingError;
