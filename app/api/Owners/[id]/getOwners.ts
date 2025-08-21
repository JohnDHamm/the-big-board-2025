const getOwners = async(leagueId: string) => { 
    const contentType = "application/json";

    try {
      const res = await fetch(`/api/Owners/${leagueId}`, {
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

  export default getOwners;
  