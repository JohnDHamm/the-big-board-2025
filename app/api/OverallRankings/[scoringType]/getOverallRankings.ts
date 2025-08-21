const getOverallRankings = async(scoringType: ScoringType) => {
  const contentType = "application/json";

    try {
      const res = await fetch(`/api/OverallRankings/${scoringType}`, {
        method: "GET",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        cache: 'no-store',
      })
      return res.json();
    } catch (error) {
      console.log('Failed to get overall rankings', error);
    }
  }

  export default getOverallRankings;
