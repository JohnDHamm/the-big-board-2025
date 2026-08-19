const getOwnerId = async(userId: string) => { 
    const contentType = "application/json";

    try {
      const res = await fetch(`/api/Owners/userId/${userId}`, {
        method: "GET",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        cache: 'no-store',
      })
      return res.json();
    } catch (error) {
      console.log('Failed to get owners', error);
    }
  }

  export default getOwnerId;
  