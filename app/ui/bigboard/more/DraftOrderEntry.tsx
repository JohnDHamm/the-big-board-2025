'use client';

import React, { JSX, useContext, useEffect, useState } from "react";
import { useOrganization } from "@clerk/nextjs";

import { Container, CommishTitle, TitleBlock, ContentItem } from "./CommishCommands.styles";
import { DraftOrderBlock, DraftOrderNum, RowContent } from "./DraftOrderEntry.styles";
import Button from "@/app/ui/home/Button";
import OwnerSelect from "./OwnerSelect";
import { UserContext, DraftStatusContext, DraftContext } from "@/app/contexts";
import isEmpty from "lodash.isempty";

const DraftOrderEntry: React.FC = () => {
  const { user }= useContext(UserContext);
  const { draftStatus } = useContext(DraftStatusContext);
  const { draft } = useContext(DraftContext);

  const [ draftOrder, setDraftOrder ] = useState<DraftOrderList>({});
  const [ orderReady, setOrderReady ] = useState<boolean>(false);
  const [ ownerOptions, setOwnerOptions ] = useState<OwnerSelectOption[]>([]);

  const { memberships } = useOrganization({
    memberships: { infinite: true },
  });

  type DraftOrderList = {
    [key: number]: string;
  };

  const getImgUrl = (userId: string) => {
    const matchUser = memberships?.data?.find((member) => member.publicUserData?.userId === userId);
    return matchUser?.publicUserData?.imageUrl || "";
  }

  const createOptions = () => {
    const options: OwnerSelectOption[] = [];
    draft.owners.forEach((owner) => {
      const newOption: OwnerSelectOption = {
        _id: owner._id,
        name: owner.name,
        imageUrl: getImgUrl(owner._id)
      }
      options.push(newOption);
    })
    return options;
  }

  const handleSelection = (i: number, option: string) => {
    console.log('option selected #', i, option);
    setDraftOrder({
      ...draftOrder,
      [i]: option
    })
  }

  const renderDraftOrder = (): JSX.Element[] => {
    const list = [];
    for (let i = 1; i < draft.owners.length + 1; i++) {
      list.push(
        <RowContent key={i}>
          <DraftOrderBlock>
            <DraftOrderNum>{i}</DraftOrderNum>
            <OwnerSelect 
              options={createOptions()}
              onSelect={(selectedId) => handleSelection(i, selectedId)}
            />
          </DraftOrderBlock>
        </RowContent>
      );
    }
    return list;
  };

  const saveDraftOrder = () => {
    if (draftOrder) {
      // updateDraftStatus(user.leagueId, 'open')
      // .then(() => {
        // socket.emit('StartDraft', "Good luck to all!", user.leagueId);
      // })
      // .catch((err) => console.log('err', err));
    }
  }

  useEffect(() => {
    if (Object.keys(draftOrder).length === draft.owners.length) {
      setOrderReady(true);
    }
  }, [draft.owners.length, draftOrder]);

  return (
    <Container>
      <TitleBlock>
        <CommishTitle>Draft Order</CommishTitle>
      </TitleBlock>
      {isEmpty(memberships?.data) ? (
        <p>loading the memberships</p>
      ) : (
        <ContentItem>{renderDraftOrder()}</ContentItem>
      )}
      <ContentItem>
        <Button disabled={!orderReady} onClick={() => saveDraftOrder()}>
          <p>save the draft order</p>
        </Button>
      </ContentItem>
    </Container>
  )
}

export default DraftOrderEntry;
