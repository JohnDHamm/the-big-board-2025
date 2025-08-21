const getPositionRankings = async(scoringType: ScoringType) => {
  const contentType = "application/json";

    try {
      const res = await fetch(`/api/PositionRankings/${scoringType}`, {
        method: "GET",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        cache: 'no-store',
      })
      return res.json();
    } catch (error) {
      console.log('Failed to get position rankings', error);
    }
  }

  export default getPositionRankings;
