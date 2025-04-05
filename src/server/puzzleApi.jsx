class PuzzleApi {
  static baseUrl =
    "https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel";

  static async getPuzzles(level = 1) {
    try {
      const response = await fetch(`${PuzzleApi.baseUrl}${level}.json`);
      const data = await response.json();
      return {
        data,
        success: response.status === 200,
        error: response.status !== 200 ? response.error : null,
      };
    } catch (error) {
      return { success: false, data: null, error: error.message };
    }
  }
}

export default PuzzleApi;
