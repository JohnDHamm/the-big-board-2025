const calcTotalRounds = (positionSlots: Position_Slot[]): number => {
  const slotTotals: number[] = [];
  positionSlots.forEach((slot) => {
    slotTotals.push(slot.total);
  });
  return slotTotals.reduce((acc, curr) => acc + curr);
};

export default calcTotalRounds;
