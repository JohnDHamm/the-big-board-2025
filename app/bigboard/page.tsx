import MobileContentContainer from "../ui/bigboard/MobileContentContainer";
import ThreeUpLayout from "../ui/bigboard/ThreeUpLayout";
import LoadingBlock from "../ui/dashboard/LoadingBlock";
import { COLORS } from "../styles";

export default async function Page() {
 
  return (
    <div style={{backgroundColor: COLORS.PRIMARY_GREEN, height: "100vh"}}>
      <ThreeUpLayout
        left={<div></div>}
        center={
          <MobileContentContainer>
            <LoadingBlock />
        </MobileContentContainer>
        }
        right={<div></div>}
        />
    </div>
  );
}
