import MobileContentContainer from "../ui/bigboard/MobileContentContainer";
import ThreeUpLayout from "../ui/bigboard/ThreeUpLayout";
import LoadingBlock from "../ui/dashboard/LoadingBlock";


export default async function Page() {
 
  return (
    <ThreeUpLayout
      left={<div></div>}
      center={
        <MobileContentContainer>
          <LoadingBlock />
      </MobileContentContainer>
      }
      right={<div></div>}
    />
  );
}
