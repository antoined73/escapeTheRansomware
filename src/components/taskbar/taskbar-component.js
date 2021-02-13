import React, { Fragment, useEffect } from 'react';
import './taskbar-component.css';
import {
  AppBar,
  Toolbar,
  TextField,
  Bar,
  Button,
  List,
  ListItem,
  Divider,
  Panel
} from 'react95';
import uniLogo from '../../assets/images/uni-logo.svg';
import PolypointsCounter from '../polypoints_counter/polypoints_counter-component';

const TaskBar = () => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState();

  useEffect(() => {
    const date = new Date();
    setDate(date.getHours()+":"+date.getMinutes());
  },[]);

  return (
    <Fragment>
      <AppBar className="TaskBar">
        <Toolbar className="Toolbar is-flex is-justify-content-space-between is-align-items-center">
          <div>
            <Button
                onClick={() => setOpen(!open)}
                active={open}
                style={{ fontWeight: 'bold' }}
            >
                <img
                src={uniLogo}
                alt='react95 logo'
                style={{ height: '20px', marginRight: 4 }}
                />
                Start
            </Button>
            {open && (
                <List
                style={{
                    position: 'absolute',
                    left: '0',
                    bottom: '100%'
                }}
                onClick={() => setOpen(false)}
                >
                <ListItem>
                    <span role='img' aria-label='👨‍💻'>
                    👨‍💻
                    </span>
                    Profile
                </ListItem>
                <ListItem>
                    <span role='img' aria-label='📁'>
                    📁
                    </span>
                    My account
                </ListItem>
                <Divider />
                <ListItem disabled>
                    <span role='img' aria-label='🔙'>
                    🔙
                    </span>
                    Logout
                </ListItem>
                </List>
            )}
          </div>

          <div className="is-flex ml-5 is-align-items-center" style={{height: '100%'}}>
            <PolypointsCounter/>
            <Bar size={35} />
            <Panel variant='well' className="ml-2 py-1 px-5">
              {date}
            </Panel>
          </div>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}

export default TaskBar;