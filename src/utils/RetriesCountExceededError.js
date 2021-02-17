class RetriesCountExceededError extends Error {
  constructor(message) {
    super(message);
    this.name = "RetriesCountExceededError";
  }
}

export default RetriesCountExceededError;
