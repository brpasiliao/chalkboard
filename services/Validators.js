class Validators {
  constructor() {}

  validateName(name) {}

  /**
   * Fetches feedback data from the JSON file provided to the constructor
   */
  async getData() {
    const data = await readFile(this.datafile, "utf8");
    if (!data) return [];
    return JSON.parse(data);
  }
}

module.exports = FeedbackService;
