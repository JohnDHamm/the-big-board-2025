import PlayerCard from "@/app/ui/bigboard/players/PlayerCard";
import { mockPlayer1, mockPlayer2, mockTeamARI, mockTeamBUF } from "@/app/mock_data";

export default async function Page() {
 
  return (
    <main>
      <div style={{width: '400px'}}>
        <p>Players</p>
        <PlayerCard 
          player={mockPlayer1}
          rank={mockPlayer1.positionRank}
          team={mockTeamBUF}
          selectable={true}
        />
        <PlayerCard 
          player={mockPlayer2}
          rank={mockPlayer2.positionRank}
          team={mockTeamARI}
          selectable={true}
        />
      </div>
    </main>
  );
}