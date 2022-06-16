import { useState } from "react";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Button
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

function DrawerComponent() {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/" style={{textDecoration: 'none', color: 'black'}}>Beranda</Link>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)} style={{ marginTop: '-20px', display: 'inline-block'}}>
        <MenuIcon />
      </IconButton>
      <img
        src="/replasc.png"
        alt='Logo'
        width='40'
        style={{ marginTop: '20px' }}
      />
    </>
  );
}
export default DrawerComponent;