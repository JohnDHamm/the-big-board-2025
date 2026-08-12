const makePick = async (pickData: DraftSelection) => {
  try {
    const response = await fetch('/api/Picks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pickData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Failed to save pick', error);
  }
}

export default makePick;
