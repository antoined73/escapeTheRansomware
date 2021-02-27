import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  Divider,
  Table, TableBody, TableHead, TableDataCell, TableHeadCell, TableRow, 
  Panel,
  Cutout
} from 'react95';
import { useStoreState, useStoreActions } from 'easy-peasy';
import PolypointsCounter from '../polypoints_counter/polypoints_counter-component';
import { Screens } from '../../utils/screens/screen-utils'

import "./mailz_wc-component.css"

const MailzWC = ({id}) => {

  const polypointsLeftToPayRansom = useStoreState((state) => state.player.polypointsLeftToPayRansom);
  const canPayRansom = useStoreState((state) => state.player.canPayRansom);

  
  const { openScreen_sa } = useStoreActions(actions => ({
    openScreen_sa: actions.screens.openScreen
  }));
  const openEndScreen = () => {
    openScreen_sa({id: Screens.PAY_RANSOM_ENDING})
  }

  const displayMailList = () => {
    return (<>
    <div className="is-flex" style={{ height: '100%' }}>
    <List>
      <ListItem>Inbox</ListItem>
      <Divider />
      <ListItem>Send items</ListItem>
      <Divider />
      <ListItem>Deleted items</ListItem>
      <Divider />
    </List>
    </div>
    <div className="is-flex" style={{ width: '100%', height: '100%' }}>
    <Table style={{ width: '100%' }}>
      <TableHead>
        <TableRow head>
          <TableHeadCell style={{ textAlign: 'center' }}>✉️</TableHeadCell>
          <TableHeadCell style={{ textAlign: 'center' }}>📎</TableHeadCell>
          <TableHeadCell>From</TableHeadCell>
          <TableHeadCell>Subject</TableHeadCell>
          <TableHeadCell>Received</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableDataCell style={{ textAlign: 'center' }}>✉️</TableDataCell>
          <TableDataCell style={{ textAlign: 'center' }}>📎</TableDataCell>
          <TableDataCell>Thommas</TableDataCell>
          <TableDataCell>Hey buddy !</TableDataCell>
          <TableDataCell>{new Date().toDateString()}</TableDataCell>
        </TableRow>
      </TableBody>
    </Table>
    </div>
    </>);
  }

  const displayMailContent = () => {
    return "hello"
  }
  return (
    <div className="columns" style={{ width: '100%', height: '100%', backgroundColor: 'unset'}}>
      <div className="column is-half is-flex-direction-row m-0 p-0" style={{ height: '100%', backgroundColor: 'unset', opacity: '1', minWidth: 530, minHeight: 200}}>
        {displayMailList()}
      </div>
      <div className="column m-0 p-0" style={{ height: '100%', backgroundColor: 'unset', opacity: '1', minWidth: 200, minHeight: 200}}>
        {displayMailContent()}
      </div>
    </div>
  );
}

export default MailzWC;