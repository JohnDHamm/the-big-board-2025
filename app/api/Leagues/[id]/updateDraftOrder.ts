const updateDraftOrder = async (
  leagueId: string,
  draftOrder: string[]
) => {
  try{
    const response = await fetch(`/api/Leagues/${leagueId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ draftOrder }),
    });
    const data = await response.json();
    return data.received;
  } catch (error) {
    console.log('Failed to update league draft order', error);
  }
}

export default updateDraftOrder;
