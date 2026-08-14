const updateDraftStatus = async (
  leagueId: string,
  draftStatus: DraftStatus
) => {
  try{
    const response = await fetch(`/api/Leagues/${leagueId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ draftStatus }),
    });
    const data = await response.json();
    return data.received;
  } catch (error) {
    console.log('Failed to update league draft status', error);
  }
}

export default updateDraftStatus;
