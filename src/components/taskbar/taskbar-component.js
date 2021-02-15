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
import logoIMG from '../../assets/images/uni-logo.svg';

const TaskBar = () => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState();

  useEffect(() => {
    // set up a function to properly format the time
    function doDate() {
      const date = new Date();
      setDate(("0" + date.getHours()).slice(-2) + ":"
        + ("0" + date.getMinutes()).slice(-2) + ":"
        + ("0" + date.getSeconds()).slice(-2));
    }

    // call the function each second
    doDate();
    setInterval(doDate, 1000);
  }, []);

  return (
    <Fragment>
      <AppBar className="TaskBar">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <Button
              onClick={() => setOpen(!open)}
              active={open}
              style={{ fontWeight: 'bold' }}
            >
              <img
                src={logoIMG}
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

          <div style={{ position: 'relative', display: 'flex', alignItems: "center", marginLeft: 5 }}>
            <Panel variant='well' style={{ padding: '0.2rem 1rem' }}>
              {date}
            </Panel>
          </div>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}

export default TaskBar;