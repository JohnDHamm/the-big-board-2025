'use client';

import React, { JSX, useContext, useEffect, useState } from "react";
import { useOrganization } from "@clerk/nextjs";

import { Container, CommishTitle, TitleBlock, ContentItem } from "./CommishCommands.styles";
import { DraftOrderBlock, DraftOrderNum, RowContent } from "./DraftOrderEntry.styles";
import Button from "@/app/ui/home/Button";
import OwnerSelect from "./OwnerSelect";
import { UserContext, DraftContext, DraftStatusContext } from "@/app/contexts";
import isEmpty from "lodash.isempty";

import updateDraftOrder from "@/app/api/Leagues/[id]/updateDraftOrder";

const DraftOrderEntry: React.FC = () => {
  const { user }= useContext(UserContext);
  const { draft } = useContext(DraftContext);
  const { draftStatus } = useContext(DraftStatusContext);

  const [ draftOrder, setDraftOrder ] = useState<DraftOrderList>({});
  const [ orderReady, setOrderReady ] = useState<boolean>(false);
  const [ ownerOptions, setOwnerOptions ] = useState<OwnerSelectOption[]>([]);
  const [ message, setMessage ] = useState('');

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
        imageUrl: getImgUrl(owner.userId)
      }
      options.push(newOption);
    })
    return options;
  }

  const handleSelection = (i: number, option: string) => {
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
    if (draftOrder && user?.leagueId) {
      const draftOrderSave: string[] = [];
      for (let i = 1; i < draft.owners.length + 1; i++) {
        draftOrderSave.push(draftOrder[i]);
      }
      updateDraftOrder(user.leagueId, draftOrderSave)
        .then(()=> {
          setMessage('draft order saved successfully');
        }).catch((err) => {
          console.log('err', err);
          setMessage('error with saving draft order');
        })
    }
  }

  useEffect(() => {
    if (Object.keys(draftOrder).length === draft.owners.length) {
      setOrderReady(true);
    }
  }, [draft.owners.length, draftOrder]);

  useEffect(() => {
    // console.log('memberships', memberships);
  }, [memberships])

  return (
    <Container>
      <TitleBlock>
        <CommishTitle>Draft Order</CommishTitle>
      </TitleBlock>
      {(!memberships?.data?.length) ? (
        <p>loading the memberships</p>
      ) : ((draftStatus === 'not started') ? (
        <ContentItem>{renderDraftOrder()}</ContentItem>
      ) : (
        <p>draft started - cannot change the order now</p>
      ))}
      <ContentItem>
        <Button disabled={!orderReady} onClick={() => saveDraftOrder()}>
          <p>save the draft order</p>
        </Button>
        {message && (
          <p>{message}</p>
        )}
      </ContentItem>
    </Container>
  )
}

export default DraftOrderEntry;
