const getPicks = async(leagueId: string) => { 
    const contentType = "application/json";

    try {
      const res = await fetch(`/api/Picks/${leagueId}`, {
        method: "GET",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        cache: 'no-store',
      })
      return res.json();
    } catch (error) {
      console.log('Failed to get picks', error);
    }
  }

  export default getPicks;
  