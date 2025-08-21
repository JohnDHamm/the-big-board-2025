const getTeams = async () => {
  const contentType = "application/json";

  try {
    const res = await fetch(`/api/Teams`, {
      method: "GET",
      headers: {
        Accept: contentType,
        "Content-Type": contentType,
      },
      cache: 'no-store',
    })
    return res.json();
  } catch (error) {
    console.log('Failed to get teams', error);
  }
}

export default getTeams;
