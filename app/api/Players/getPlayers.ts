const getPlayers = async () => {
  const contentType = "application/json";

    try {
      const res = await fetch(`/api/Players`, {
        method: "GET",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        cache: 'no-store',
      })
      return res.json();
    } catch (error) {
      console.log('Failed to get players', error);
    }
  }

  export default getPlayers;
  