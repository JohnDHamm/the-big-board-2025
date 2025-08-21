const getLeaguesList = async() => { 
    const contentType = "application/json";

    try {
      const res = await fetch(`/api/Leagues`, {
        method: "GET",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        cache: 'no-store',
      })
      return res.json();
    } catch (error) {
      console.log('Failed to get leagues', error);
    }
  }

  export default getLeaguesList;
